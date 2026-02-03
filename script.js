//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  document.body.setAttribute("style","background-color: #EDEDED;")
  makePageForEpisodes(allEpisodes);

  const searchInput = document.querySelector("#search");
  const searchButton = document.querySelector("#search-btn");
  let filteredMovies = [];

  searchButton.addEventListener("click", () => {
   filteredMovies = allEpisodes.filter(element => element.name == searchInput.value)
   rootElem.innerHTML = `      <label>
        <input type="text" id="search"/><button id="search-btn">search</button>
      </label>`;
   makePageForEpisodes(filteredMovies);
  })
}

function makePageForEpisodes(episodeList) {
  // First Option
  // const rootElem = document.getElementById("root");
  // const sectionofMovies = document.createElement("section");
  // rootElem.append(sectionofMovies);
  // sectionofMovies.setAttribute('style','display: flex; flex-wrap: wrap; justify-content: center')
  // let components = '';
  // const episodeListtoDisplay = episodeList.map(element => {
  //   components+=`<article style="width: 100%; max-width: 20%; margin: 10px; display: flex; flex-direction: column; background-color: #FFF;">
  //   <h3 style="padding: 40px 20px; border: 1px solid black; border-radius: 1rem; color: black; text-align:center">${element.name}- S${element.season.toString().padStart(2,"0")}S${element.number.toString().padStart(2,"0")}</h3>
  //   <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
  //   <img style="width: 80%" src="${element.image.medium }"/>
  //   ${element.summary}
  //   </div>
  //   </article>`;
  //   }
  //   );
  //   sectionofMovies.innerHTML = components;

  //   const paragraph = sectionofMovies.querySelectorAll("p");
  //   paragraph.forEach(element => {
  //       element.setAttribute("style","text-align: start; width: 81%; color: grey");
  //   });

  // // rootElem.textContent = `Got ${episodeList.length} episode(s)`;


  // Second Option with function and destructing
  // const rootElem = document.getElementById("root");
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
