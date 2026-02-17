// https://api.tvmaze.com/shows
// https://api.tvmaze.com/shows/22/episodes
const cache = {
  shows: null,
  episodes: {}
};

export async function getEpisodes(showId) {
  const render = document.querySelector(".rendering");
  render.innerText = "Loading episodes...";
  if (cache.episodes[showId]) {
      render.classList.add("hidden"); 
      return cache.episodes[showId];
  }
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
  if (res.ok) {
    const data = await res.json();
    cache.episodes[showId] = data;
    render.remove()
    return data;
  }else{
    alert("API data couldn't be rendered Error");
    render.innerText = `API data couldn't be rendered Error ${res.status}`;
  }
}
    