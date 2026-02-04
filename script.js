//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  document.body.setAttribute("style","background-color: #EDEDED;")
  makePageForEpisodes(allEpisodes);

  const searchInput = document.querySelector("#search");
  const searchButton = document.querySelector("#search-btn");
  const moviespanCounter = document.querySelector("#movie-counter");
  let filteredMovies = [];
  let movieCounter =0;
  searchButton.addEventListener("click", () => {
   rootElem.innerHTML = `<div id="root"></div>`
   filteredMovies = allEpisodes.filter(element => {
    if(element.name.toUpperCase().includes(searchInput.value.toUpperCase()) || element.summary.toUpperCase().includes(searchInput.value.toUpperCase())){
      movieCounter++;
      return element
    }
  })
  moviespanCounter.innerText = `Displaying ${movieCounter}/${allEpisodes.length} episodes`;
  makePageForEpisodes(filteredMovies);
  movieCounter=0;
  })
}

function makePageForEpisodes(episodeList) {
  const sectionMovies = document.createElement("section");
  rootElem.append(sectionMovies);
  const component = displayMovies(episodeList,sectionMovies);
  for(const element in component){
    sectionMovies.append(component[element]);
  }
  sectionStyle(sectionMovies);
}

function displayMovies(allEpisodes){
  return allEpisodes.map(element => {
    const {name, season, number, summary}=element;
    const {medium} = element.image
    return movieComponent(name,season,number,summary, medium);
  })
}

function movieComponent(name,season,number,summary, medium){
  const movie = document.createElement("article");
  const title = document.createElement("h3");
  const movieSummary = document.createElement("p");
  const movieImage = document.createElement("img");
  
  title.innerText = `${name} - S${season.toString().padStart(2,'0')}E${number.toString().padStart(2,'0')}`;
  movieSummary.innerHTML = summary;
  movieImage.src = medium;
  movie.append(titleStyle(title),imageStyle(movieImage),summaryStyle(movieSummary));
  return componentStyle(movie);
}


function sectionStyle(section){
  section.setAttribute("style","display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;")
  return section;
}

function componentStyle(movie){
  movie.setAttribute("style","width: 100%; max-width: 25%; color: black; background-color: #FFF; margin: 10px 20px;border-radius: 20px;")
  return movie;
}

function titleStyle(title){
  title.setAttribute("style","border: 1px solid black; padding: 20px 10px;margin-top: -3px;border-top-left-radius: 20px;border-top-right-radius: 20px;")
  return title;
}

function imageStyle(image){
  image.setAttribute("style","width: 100%");
  return image;
}

function summaryStyle(summary){
  summary.setAttribute("style","width: 100; text-align: left; padding: 0 10px");
  return summary;
}

const rootElem = document.getElementById("root");
window.onload = setup;
