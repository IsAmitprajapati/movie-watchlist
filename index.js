const QueryEl = document.getElementById("searchQuery")
const searchBtnEl =document.getElementById("searchBtn")
const render = document.getElementById("render")

let listMovie = []
let movieHtml = ""


let count = 0;
searchBtnEl.addEventListener("click",async()=>{
    const res = await fetch(`https://www.omdbapi.com/?t=${QueryEl.value}&apikey=7d824711`)
    const data = await res.json();
    
    const obj = {
        title : data.Title,
        poster : data.Poster,
        imdbRating : data.imdbRating,
        Runtime : data.Runtime,
        Genre : data.Genre,
        watchlistBtn :data.Title,
        Plot : data.Plot,
        imdbID : data.imdbID 
    }
    listMovie.unshift(obj)
    
    
    movieHtml = await listMovie.map((dataM)=>{   
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
    
    
}) 

let watchlistData = []  //intialization


function addWatchlist(e){
    let id = e.target.name 
    let obj = listMovie.filter(preve => preve.imdbID == id)
    // console.log(obj[0])
    
    
    if(localStorage.getItem("watchlistData")){  //checking the data is availabe or not
        //avaialbe data get this data
        let arr = JSON.parse(localStorage.getItem("watchlistData")) 
        watchlistData = arr;
       
       //get data from specific object
        let checkid = watchlistData.filter(preve => preve.imdbID === obj[0].imdbID)
        console.log(checkid[0].imdbID)
        
        //check the data already added 
        if(checkid[0].imdbID == obj[0].imdbID){
            alert("Already add watchlist")
        }
        else{ // not added in this section
           watchlistData.unshift(obj[0])
           localStorage.setItem("watchlistData",JSON.stringify(watchlistData))
           alert("Added Successfully")
        }
       
    }
    else{ //not available data than run
        watchlistData.unshift(obj[0])
        localStorage.setItem("watchlistData",JSON.stringify(watchlistData))
        console.log("not have data")
    }
}