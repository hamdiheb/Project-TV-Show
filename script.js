    function renderAll(allEpisodes){
            allEpisodes.map(element => {
            document.querySelector(".episodes-display").append(episodeComponent(element));
            })
    };
        
    function render(allEpisodes) {
        
        console.log(allEpisodes)
        renderAll(allEpisodes);

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
            selectedOption!='All Episodes' ? filterEpisodes(allEpisodes,selectedOption) : renderAll(allEpisodes);
        });
    }

    function episodeComponent(element){
        const {name, season, number, summary,rating,runtime} = element;
        const {medium} = element.image;
        const componentCloned = document.querySelector("template").cloneNode(true);
        componentCloned.content.querySelector("h5").innerText = `S${season.toString().padStart(2,'0')}E${number.toString().padStart(2,'0')}`;
        componentCloned.content.querySelector("img").src = medium;
        componentCloned.content.querySelector("h3").innerText = `${name}`;
        componentCloned.content.querySelector(".episode-summary").innerHTML = `${summary}`;
        const durationRateContainer = componentCloned.content.querySelector(".episode-duration-rate");
        const time = durationRateContainer.querySelector("#runTime");
        const rank = durationRateContainer.querySelector("#rating");
        time.innerText = `Duration: ${runtime} min`;
        rank.innerText = `Rating: ${rating.average.toFixed(1)}`;
        
        const newArticle = document.createElement("div");
        newArticle.classList.add("episode-component");
        newArticle.append(componentCloned.content);
        return newArticle;
    }

    function filterEpisodes(allEpisodes,input){
        document.querySelector(".episodes-display").innerHTML = `
                        <template class="episode-component">
                        <h5 class="episode-nb-sn"></h5>
                        <img class="episode-img"/>
                        <h3 class="episode-title margin"></h3>
                        <p class="episode-summary"></p>
                        <div class="episode-duration-rate">
                            <p id="runTime"></p>
                            <p id="rating"></p>
                        </div>
                    </template>
        `;
        let count = 0;
        allEpisodes.filter(element => {
            if((element.name.toUpperCase().includes(input.toUpperCase())) || (element.summary.toUpperCase().includes(input.toUpperCase()))){
                const newComponent = episodeComponent(element);
                document.querySelector(".episodes-display").append(newComponent);
                count++;
                document.querySelector(".episode-numbers") .innerText = `Displaying ${count}/73`;
            }
        });
    }

    async function apiFetch(){
        const render = document.querySelector(".rendering");
        const res = await fetch("https://api.tvmaze.com/shows/22/episodes");
        if(res.ok){
            const data = await res.json();
            render.remove()
            return data;
        }else{
            alert("API data couldn't be rendered Error");
            render.innerText = `API data couldn't be rendered Error ${res.status}`;
        }
    }

    async function main(){
        const allEpisodes=await apiFetch();
        render(allEpisodes);
    }

    main();