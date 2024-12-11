const appurl ='https://api.tvmaze.com/shows';
const showlist = document.getElementById('showlist');
const search = document.getElementById('search');

async function fetchShows(){
    const response = await fetch(appurl);
    const data = await response.json();
    return data;
}
console.log(fetchShows());


function displayShows(shows){
    showlist.innerHTML='';

    if(shows.length===0){
        showlist.innerHTML = `<h2>No shows found</h2>`;
        return;
    }

    shows.forEach(show =>{
        const showCard = document.createElement('div');
        showCard.className = 'showcard';

        showCard.innerHTML = `
        <img src="${show.image.medium }" alt="${show.name}">
        <h2>${show.name}</h2>
        <p>${show.summary.slice(0,100)}</p>
        `;
        showlist.appendChild(showCard);
    })

}

function searchShows(shows,query){
    return shows.filter(show =>show.name.toLowerCase().includes(query.toLowerCase()))
}

async function init(){
    const shows = await fetchShows();
    console.log(shows);


    if(shows){
        displayShows(shows);
    

    search.addEventListener('input',(e)=>{
       const filteredShows = searchShows(shows,e.target.value);
       displayShows(filteredShows);


    });
   }
}

init();
