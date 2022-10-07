const watchlist = JSON.parse(localStorage.getItem("watchlistData")) 
const render = document.getElementById("render")

console.log(watchlist)

movieHtml =  watchlist.map((dataM)=>{   
      return `
      <div class="movieDetails-container">
				<img src="${dataM.poster}" />
				<div class="movieDetails">
					<div class="top-movie">
						<h3 class="title-movie">${dataM.title}</h3>
						<i class="fa-solid fa-star rating"></i>
						<span>${dataM.imdbRating}</span>
					</div>
                    <div class="middle-movie">
                        <p class="middle-part">${dataM.Runtime}</p>
                        <p class="middle-part">${dataM.Genre}</p>
                        <button  class="middle-part addWatchlist" onclick="addWatchlist(event)" 
                        name=${dataM.imdbID}>
                            <i class="fa-solid fa-circle-plus"></i>
                            Watchlist
                        </button>
                    </div>
                    <p class="description-movie">
                        ${dataM.Plot}
                    </p>
                    
				</div>
			</div>
      ` 
    })
    
    render.innerHTML = movieHtml