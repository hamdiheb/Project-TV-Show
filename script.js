function render(allEpisodes){
    function renderAll(){
        allEpisodes.map(element => {
        document.querySelector(".episodes-display").append(episodeComponent(element));
    })};
    
    renderAll();

    const inputSearch = document.querySelector("#search-input");
    inputSearch.addEventListener("keyup", () =>{
        filterEpisodes(allEpisodes,inputSearch.value);
    }); 

    const select = document.querySelector("select");
    const episodesList = allEpisodes.map(element => {
        const optionClone = document.querySelector(".season-select-option").cloneNode(true);
        optionClone.innerText = `${element.name}`;
        select.append(optionClone);
    });

    select.addEventListener("change", (event) => {
        const selectedOption = event.target.value;
        selectedOption!='All Seasons' ? filterEpisodes(allEpisodes,selectedOption) : renderAll();
    });
}

function episodeComponent(element){
    const {name, season, number, summary} = element;
    const {medium} = element.image;
    const componentCloned = document.querySelector("template").cloneNode(true);
    componentCloned.content.querySelector("h5").innerText = `S${season.toString().padStart(2,'0')}E${number.toString().padStart(2,'0')}`;
    componentCloned.content.querySelector("img").src = medium;
    componentCloned.content.querySelector("h3").innerText = `${name}`;
    componentCloned.content.querySelector("p").innerHtml = summary;
    const newArticle = document.createElement("div");
    newArticle.classList.add("episode-component");
    newArticle.append(componentCloned.content);
    return newArticle;
}

function filterEpisodes(allEpisodes,input){
    document.querySelector(".episodes-display").innerHTML = `
                    <template class="episode-component">
                    <h5 class="episode-nb-sn">S01E01</h5>
                    <img class="episode-img" src="http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg" alt="episode-image"/>
                    <h3 class="episode-title margin">Winter is Coming</h3>
                    <p class="episode-summary margin">Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King Robert Baratheon, to serve as the King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's bastard son Jon Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to reclaim his father's throne, usurped by Robert, by selling his sister in marriage.</p>
                    <div class="episode-duration-rate">
                        <p>62 min</p>
                        <p>8.91</p>
                    </div>
                </template>
    `;
    let count =0;
    allEpisodes.filter(element => {
        if((element.name.toUpperCase().includes(input.toUpperCase())) || (element.summary.toUpperCase().includes(input.toUpperCase()))){
            const newcomponent = episodeComponent(element);
            document.querySelector(".episodes-display").append(newcomponent);
            count++;
            document.querySelector(".episode-numbers") .innerText = `Displaying ${count}/73`;
        }
    });
}

async function fetchData(){
    const res = await fetch("https://api.tvmaze.com/shows/82/episodes")
    const data = await res.json();
    return data;
}

async function main(){
    const allEpisodes=await fetchData();
    render(allEpisodes);
}

main();