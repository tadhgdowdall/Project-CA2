
const baseSearchURL = 'https://streaming-availability.p.rapidapi.com/shows/search/title';
const baseURL = `https://streaming-availability.p.rapidapi.com/shows/`;
// tt0068646


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





const btn = document.getElementById('sumbmitBTN');


btn.addEventListener("click", getID);



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
        
            


            
        // loops through streaming options

        for (let i = 0; i < streamingOptions.length; i++) {
            let streamingOptionName = streamingOptions[i].service.name;//gets the name of the streaming service
            streamingOptionsHtml += `<p>Streaming option ${i + 1}: ${streamingOptionName}</p>`;
            console.log(`Streaming option ${i}: ${streamingOptionName}`);
            outputStreamingOptions.innerHTML =  `<p>Streaming option ${i + 1}: ${streamingOptionName}</p>`;
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
        console.log(data);

        if (data.result && data.result.length > 0) {
            displaySearchResults(data.result); // Display the search results
        } else {
            const output = document.getElementById("outputData");
            output.innerHTML = `<p>Could not find results for "${title}"</p>`;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}



const titleBtn = document.getElementById('sumbmitBtnTitle');

titleBtn.addEventListener("click", getTitle)



function getTitle(){

    const title = document.getElementById('userInputTitle').value.trim();


 
    searchShow(title);
  
}



// Incomplete, data doesnt display to html yet. it does display to console.
function displayDataForTitle(title){



}