//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  document.body.setAttribute("style","background-color: #EDEDED;")
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const sectionofMovies = document.createElement("section");
  rootElem.append(sectionofMovies);
  sectionofMovies.setAttribute('style','display: flex; flex-wrap: wrap; justify-content: center')
  let components = '';
  const episodeListtoDisplay = episodeList.map(element => {
    components+=`<article style="width: 100%; max-width: 20%; margin: 10px; display: flex; flex-direction: column; background-color: #FFF;">
    <h3 style="padding: 40px 20px; border: 1px solid black; border-radius: 1rem; color: black; text-align:center">${element.name}- S${element.season.toString().padStart(2,"0")}S${element.number.toString().padStart(2,"0")}</h3>
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
    <img style="width: 80%" src="${element.image.medium }"/>
    ${element.summary}
    </div>
    </article>`;
    }
    );
    sectionofMovies.innerHTML = components;

    const paragraph = sectionofMovies.querySelectorAll("p");
    paragraph.forEach(element => {
        element.setAttribute("style","text-align: start; width: 81%; color: grey");
    });

  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
