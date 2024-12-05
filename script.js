
const baseSearchURL = 'https://streaming-availability.p.rapidapi.com/shows/search/title';
const baseURL = `https://streaming-availability.p.rapidapi.com/shows/`;
// tt0068646 example imdb id 


const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '4f0c197b21mshdf077300ef190aep12b76djsn6d594e9e9bdd',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
}; 

async function fetchShow(imbdId) {
    try {
        // this puts the imbd ID in the url to search specific data
        const url = baseURL + imbdId + "?series_granularity=episode&output_language=en";

        const response = await fetch(url, options);

        if (!response.ok) {
           
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        displayDataImdb(data); // calls the function to display the data
    } catch (error) {
        console.error('Could not fetch the data ', error);
    }
}





const btn = document.getElementById('submitBTN');
btn.addEventListener("click", getID); // on btn click it gets imdbId from input field 



function getID(){
    
    const imdbId = document.getElementById('userInput').value.trim();   
    fetchShow(imdbId);
 
}

// function to display data from api 
function displayDataImdb(data){

    const output = document.getElementById("outputData")

    const outputStreamingOptions = document.getElementById("streamingOptions")

        let streamingOptions = data.streamingOptions.ie;

        for (let i = 0; i < streamingOptions.length; i++) {
            output.innerHTML = `
            <h2>${data.title}</h2>
            <p>Year ${data.releaseYear}</p>
            <p>Description: ${data.overview}</p> `;
        }
                    
        let streamingOptionsHtml = "";
            
        // loops through streaming options

        for (let i = 0; i < streamingOptions.length; i++) {
            let streamingOptionName = streamingOptions[i].service.name;//gets the name of the streaming service
            let streamingOptionType = streamingOptions[i].type;
            streamingOptionsHtml += `<p>Streaming option ${i + 1}: ${streamingOptionName + ", " + streamingOptionType}</p>`;
            console.log(`Streaming option ${i}: ${streamingOptionName + streamingOptionType}`);
        }

        outputStreamingOptions.innerHTML = streamingOptionsHtml;
}



function getTitle() {
    const title = document.getElementById('userInputTitle').value.trim();

    // Log the title to check
    console.log('Title entered:', title);

    if (title) {
        searchShow(title);
    } else {
        console.log('No title entered');
    }
}


// following code is to get show id and title and overview by searching its title 

async function searchShow(title) {
    try {
        const url = `${baseSearchURL}?country=ie&title=${title}&series_granularity=show&show_type=movie&output_language=en`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if results are returned. logging them to console
        console.log('API Response:', data);

        if (data && data.length > 0) {
            // get the first item in the array
            const firstItem = data[0];
            displayDataForTitle(firstItem);  // Pass the first item to the display function-=
        }
         else {
            const output = document.getElementById("outputTitleData");
            output.innerHTML = `<p>Could not find results for "${title}"</p>`;
        }

    } catch (error) {
        console.error('Error :', error);
    }
}




const titleBtn = document.getElementById('submitBtnTitle');

titleBtn.addEventListener("click", getTitle)



// Incomplete, data doesnt display to html yet. it does display to console.
function displayDataForTitle(item) {
    const outputTitle = document.getElementById("outputTitleData");

    // Safely access properties and display them
    outputTitle.innerHTML = `
        <h2>${item.title}</h2>
        <p>Year: ${item.releaseYear}</p>
        <p>Description: ${item.overview}</p>
        <p >IMDB ID:<strong> ${item.imdbId} </strong></p>
        <p> Main Actor: ${item.cast[0]}</p>
    `;
}
