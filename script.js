import { getEpisodes, getShows } from "./api.js"

const showSelect = document.querySelector("#search-show");
const episodeSelect = document.querySelector("#select-season");
const inputSearch = document.querySelector("#search-input");

main();

async function main() {
  const allShows = await getShows();
  allShows.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: 'base' }));

  allShows.forEach(show => {
    const option = document.createElement("option");
    option.value = show.id;
    option.innerText = show.name;
    showSelect.append(option);
  });

  showSelect.addEventListener("change", async (e) => {
    const showId = e.target.value;
    if (showId === "All shows") {
      render(allShows);
    } else {
      const episodes = await getEpisodes(showId);
      render(episodes);
    }
  });
  render(allShows);
}

function renderAll(allElements) {
  const display = document.querySelector(".episodes-display");
  const template = display.querySelector("template");
  display.innerHTML = "";
  display.appendChild(template);

  allElements.forEach(element => {
    display.append(episodeComponent(element));
  });
}

function render(allElements) {
  renderAll(allElements);

  inputSearch.onkeyup = () => {
    filterEpisodes(allElements, inputSearch.value);
  };

  episodeSelect.innerHTML = '<option>All Episodes</option>';
    allElements.forEach(item => {
      const option = document.createElement("option");
      option.value = item.name;
      option.innerText = item.name;  
      episodeSelect.append(option);
    });
  episodeSelect.onchange = (event) => {
    const selectedOption = event.target.value;
    selectedOption !== 'All Episodes' ? filterEpisodes(allElements, selectedOption) : renderAll(allElements);
  };
}

function episodeComponent(element) {
  const { name, season, number, summary, rating, runtime, genres, image } = element;
  const medium = image.medium;

  const template = document.querySelector("template");
  const clone = template.content.cloneNode(true);

  const header = clone.querySelector(".episode-nb-sn");
  const title = clone.querySelector(".episode-title");
  const time = clone.querySelector("#runTime");
  const rank = clone.querySelector("#rating");

  if (season !== undefined && number !== undefined) {
    header.innerText = `S${season.toString().padStart(2, '0')}E${number.toString().padStart(2, '0')}`;
    rank.innerText = `Rating: ${rating.average}`;
  } else {
    header.innerText = `Rating: ${rating.average}`;
    rank.innerText = `Genres: ${genres.join(", ")}`;
  }
  time.innerText = `${runtime} min `
  clone.querySelector("img").src = medium;
  title.innerText = name;
  clone.querySelector(".episode-summary").innerHTML = summary;

  const newArticle = document.createElement("div");
  newArticle.classList.add("episode-component");
  newArticle.append(clone);
  return newArticle;
}

function filterEpisodes(allElements, input) {
  const display = document.querySelector(".episodes-display");
  const template = display.querySelector("template");
  display.innerHTML = "";
  display.appendChild(template);

  let count = 0;
  allElements.filter(element => {
    if ((element.name.toUpperCase().includes(input.toUpperCase())) || (element.summary.toUpperCase().includes(input.toUpperCase()))) {
      const newComponent = episodeComponent(element);
      document.querySelector(".episodes-display").append(newComponent);
      count++;
      document.querySelector(".episode-numbers") .innerText = `Displaying ${count}/${allElements.length}`;
    }
  });
}
