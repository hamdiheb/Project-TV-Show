//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  bodyStyle(document.body);
  makePageForEpisodes(allEpisodes);
  setupSearch(allEpisodes);
  setupSelectListener(allEpisodes);
}
function setupSelect(episodeName, season, number) {
  const sel = document.querySelector("#episode-selector");
  const opt = document.createElement("option");
  opt.value = episodeName;
  opt.innerText = `${episodeName} - S${padTo2Digits(season)}E${padTo2Digits(number)}`;
  sel.append(opt);
}
function setupSelectListener(allEpisodes) {
  const select = document.getElementById("episode-selector");
  select.addEventListener('change', (event) => {
    const selectedEpisode = event.target.value;
    displayCleaning();
    if (selectedEpisode === "all-episodes") {
      makePageForEpisodes(allEpisodes);
      return;
    }
    const filteredEpisodes = filterEpisodes(allEpisodes, selectedEpisode);
    const component = displayMovies(filteredEpisodes, rootElem);
      rootElem.append(component[0]);
  });
}


function setupSearch(allEpisodes) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener('keyup', (event) => {
    const filteredEpisodes = filterEpisodes(allEpisodes, event.target.value);
    displayCleaning();
    const component = displayMovies(filteredEpisodes, rootElem);
    for (const element of component) {
      rootElem.append(element);
    }
    const resultCount = document.getElementById("result-count");
    if (resultCount) {
      resultCount.innerText = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;

    }
  });
}
function filterEpisodes(allEpisodes, searchText) {
  return allEpisodes.filter(episode => {
    const { name, summary } = episode;
    const episodeName = name.toLowerCase();
    const episodeSummary = summary.toLowerCase();
    const searchTextLower = searchText.toLowerCase()
    return episodeName.includes(searchTextLower) || episodeSummary.includes(searchTextLower);
  })
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const component = displayMovies(episodeList,rootElem);
  for(const element of component){
    rootElem.append(element);
  }
  sectionStyle(rootElem);
}

function displayMovies(Episodes){
  return Episodes.map(element => {
    const { name, season, number, summary } = element;
    const { medium } = element.image;
    setupSelect(name, season, number);
    return movieComponent(name,season,number,summary, medium);
  })
}
function displayCleaning() {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
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
