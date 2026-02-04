//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  bodyStyle(document.body);
  makePageForEpisodes(allEpisodes);
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
  
  title.innerText = `${name} - S${padTo2Digits(season)}E${padTo2Digits(number)}`;
  movieSummary.innerHTML = summary;
  movieImage.src = medium;
  movie.append(titleStyle(title),imageStyle(movieImage),summaryStyle(movieSummary));
  return componentStyle(movie);
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function bodyStyle(body) {
  body.setAttribute("style", "background-color: #EDEDED;")
  return body;
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
