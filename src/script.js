
const BASE_API_URL = "https://debuggers-games-api.duckdns.org/api/games";
let url = BASE_API_URL;
let button = document.createElement("div")
let page = 1;
let selectedGenre = '';
let inputvalue = '';
async function getdata() {
    try {
        
        const response = await fetch(url);
        const data = await response.json();
      showgener(data);
        return data
    } catch (error) {
        console.error(error.message);
    }
}

let count = 12;
getdata().then(data => {
console.log(data.results[0].genres[0].name)
    data.results.forEach((game, index) => {
        //append image
    //   console.log(game)
        if (index < 12) {
            creatgamecard(game);
            
        }





    });
   //
button.className = "h-8 w-8 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 shadow flex items-center justify-center mx-auto mt-6 cursor-pointer";button.textContent="click"
    document.body.append(button)
    //////////load more   

    button.addEventListener("click", () => {

        button.remove();
        page++;
        const params = new URLSearchParams();
        params.set('page', page);
        const trimmedSearch = inputvalue.trim();
        if (trimmedSearch.length > 1) {
            params.set('search', trimmedSearch);
        }
        if (selectedGenre) {
            params.set('genres', selectedGenre);
        }
        url = `${BASE_API_URL}?${params.toString()}`;
        getdata().then(newdata => {
            newdata.results.forEach((game, index) => {
                if (index < 12) {
                    creatgamecard(game)

                }

            })
            document.body.append(button)
        })


    })
}

)


///////////////the filter part genre

document.addEventListener('DOMContentLoaded', function() {
    const genreFilter = document.getElementById('genreFilter');
    
    // Check if element exists
    if (!genreFilter) {
        console.error("❌ genreFilter element not found!");
        return;
    }
    
    
    
    genreFilter.addEventListener('change', function() {
        console.log("🎯 Selected genre:", this.value);
        
        if (this.value === "action") {
            console.log("🎮 Action games selected!");
        } else if (this.value === "rpg") {
            console.log("⚔️ RPG games selected!");
        } else if (this.value === "") {
            console.log("❌ No genre selected");
        }
    });
    
    console.log("✅ Event listener added successfully");
});


////////////////////////////end part filter

let likedGames = JSON.parse(localStorage.getItem('likedGames')) || [];
console.log(likedGames)

function ensureLikedGameEntry(game) {
    if (!game || !game.id) return null;
    
    const normalized = {
        id: game.id,
        name: game.name || game.name_original ,
        description: game.description_raw || game.description || "",
        released: game.released || "",
        rating: typeof game.rating === "number" ? game.rating : "",
        background_image: game.background_image || ""
    };
    
    const existingIndex = likedGames.findIndex(fav => {
        if (typeof fav === "number") return fav === game.id;
        return fav && fav.id === game.id;
    });
    
    if (existingIndex !== -1) {
        likedGames[existingIndex] = normalized;
    } else {
        likedGames.push(normalized);
    }
    
    localStorage.setItem('likedGames', JSON.stringify(likedGames));
    refreshFavoritesPopup();
    return normalized;
}

function removeLikedGame(gameId) {
    likedGames = likedGames.filter(fav => {
        const favId = typeof fav === "number" ? fav : fav && fav.id;
        return String(favId) !== String(gameId);
    });
    localStorage.setItem('likedGames', JSON.stringify(likedGames));
    refreshFavoritesPopup();
    return likedGames;
}

function updateLikeButtonAppearance(gameId, isLiked) {
    const buttons = document.querySelectorAll(`.game-like-button[data-game-id="${gameId}"]`);
    buttons.forEach(btn => {
        const baseClass = btn.dataset.baseClass || "";
        const likedClass = btn.dataset.likedClass || `${baseClass} !bg-pink-500`;
        btn.className = isLiked ? likedClass : baseClass;
    });
}

function generateFavoritesListHTML() {
    if (!likedGames.length) {
        return '<div class="text-gray-500 py-8">No favorites yet</div>';
    }
    
    return likedGames.map(fav => {
        const favData = typeof fav === "object" && fav !== null ? fav : { id: fav };
        const cleanDescription = favData.description ? favData.description.replace(/<[^>]+>/g, "") : "";
        const descriptionPreview = cleanDescription ? cleanDescription.slice(0, 120) + (cleanDescription.length > 120 ? "..." : "") : "No details stored yet.";
        const ratingInfo = favData.rating !== "" ? `<p class="text-gray-600 text-sm mt-1">Rating: ${favData.rating}</p>` : "";
        const releaseInfo = favData.released ? `<p class="text-gray-600 text-sm mt-1">Released: ${favData.released}</p>` : "";
        const imageSection = favData.background_image ? `<img src="${favData.background_image}" alt="${favData.name || `Game ${favData.id}`}" class="w-full h-32 object-cover rounded-md mb-3">` : "";
        const favoriteId = favData && favData.id != null ? favData.id : "";
        
        return `
            <div class="favorite-item bg-gray-50 rounded-lg p-4 mb-3 text-left">
                ${imageSection}
                <h3 class="font-semibold text-gray-800">${favData.name || `Game ID: ${favoriteId}`}</h3>
                <p class="text-gray-600 text-sm mt-1">${descriptionPreview}</p>
                ${releaseInfo}
                ${ratingInfo}
                <button class="remove-favorite mt-3 inline-flex items-center justify-center px-3 py-1.5 text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 rounded-md transition-colors" data-game-id="${favoriteId}">
                    Remove
                </button>
            </div>
        `;
    }).join('');
}

function attachFavoriteRemoveHandlers(rootElement) {
    if (!rootElement) return;
    const removeButtons = rootElement.querySelectorAll('.remove-favorite');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            const gameId = btn.dataset.gameId;
            removeLikedGame(gameId);
            updateLikeButtonAppearance(gameId, false);
        });
    });
}

function renderFavoritesList(rootElement) {
    if (!rootElement) return;
    const listContainer = rootElement.querySelector('.favorites-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = generateFavoritesListHTML();
    attachFavoriteRemoveHandlers(rootElement);
}

function refreshFavoritesPopup() {
    const popupContent = document.querySelector('.favorites-content');
    if (!popupContent) return;
    renderFavoritesList(popupContent);
}

function getShortDescription(game, maxLength = 280) {
    if (!game) return "";
    const rawDescription = game.description_raw || game.description || "";
    const cleanDescription = rawDescription.replace(/<[^>]+>/g, "").trim();
    if (cleanDescription.length <= maxLength) {
        return cleanDescription;
    }
    return `${cleanDescription.slice(0, maxLength).trim()}...`;
}

function creatgamecard(game) {
    let body = document.body
    let like = document.createElement("div")
    const baseLikeClass = "game-like-button bg-gradient-to-r from-[#D9D9D9] to-[#D9D9D9] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors absolute top-2 right-2 z-10";
    const likedLikeClass = `${baseLikeClass} !bg-pink-500`;
    like.className = baseLikeClass;
    like.textContent = "♥";
    like.dataset.gameId = String(game.id);
    like.dataset.baseClass = baseLikeClass;
    like.dataset.likedClass = likedLikeClass;
     let container = document.createElement("div")
    let name = document.createElement("h3")

 ////////////////////////////////////////////////////////////////////////
         
    like.addEventListener('click', function(e) {

             e.stopPropagation();
        
        
        const likedIndex = likedGames.findIndex(fav => {
            if (typeof fav === "number") return fav === game.id;
            return fav && fav.id === game.id;
        });
        
        if (likedIndex !== -1) {
            // Remove if already liked
            removeLikedGame(game.id);
            updateLikeButtonAppearance(game.id, false);
        } else {
            // Add if not liked
            ensureLikedGameEntry(game);
            updateLikeButtonAppearance(game.id, true);
        }
        
        console.log('Liked games:', likedGames);
    });




    
      ////////////////////////////
     

  
        ///////////////////////////////////////////////////////////////////////////////////


   
    name.textContent = game.name
    name.className = "p-3 font-semibold truncate"

    // Responsive container classes
    container.className = "bg-black text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
    
    // Mobile: single column, Tablet: 2 columns, Desktop: 3 columns
    container.className += " w-full sm:w-64 md:w-72 lg:w-80  my-4 "

    let imgurl = game.background_image;
    let img = document.createElement("img")
    img.src = imgurl;
    img.className = "w-full h-48 object-cover"
    const likedIndex = likedGames.findIndex(fav => {
        if (typeof fav === "number") return fav === game.id;
        return fav && fav.id === game.id;
    });
    if (likedIndex !== -1) {
        if (typeof likedGames[likedIndex] === "number") {
            ensureLikedGameEntry(game);
        }
        updateLikeButtonAppearance(game.id, true);
    }
    
    container.append(img)
    container.append(name)
    container.append(like)
    
    // Add to appropriate container based on screen size
    addToGameGrid(container);
    
    ////////////////////////////////////////////////
   
    container.addEventListener("click", () => {
        let poplike = document.createElement("div")
        poplike.className = "bg-pink-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors";
        poplike.textContent = "♥";
        
        let popname = document.createElement("div")
        let text_datesortie = document.createElement("div")
        let releaseDateValue = document.createElement("div")
        let rating_content = document.createElement("div")
        let rating = document.createElement("div")
        const blure = document.createElement("div");
        let imgpopup = document.createElement("img");
        let station = document.createElement("div");
        let popup = document.createElement("div");
        let about = document.createElement("div")
        let stationcontent = document.createElement("div")
        let descriptionContent = document.createElement("p");

        popname.textContent = game.name_original
        about.textContent = "About"
        station.textContent = "station"
        text_datesortie.textContent = "Release Date"
        rating.textContent = "rating"

        // Platforms
        game.platforms.forEach(x => {
            let platform1 = document.createElement("span");
            platform1.textContent = x.platform.name
            stationcontent.appendChild(platform1)
        })

        text_datesortie.className = "font-bold"
        popname.className = "font-bold"
        blure.className = "fixed inset-0 backdrop-blur-md bg-black bg-opacity-30 z-40";
        document.body.appendChild(blure);

        about.className = "font-bold"
        station.className = "font-bold"
        rating.className = "font-bold"
        releaseDateValue.className = "text-gray-700 text-sm mb-4"
        releaseDateValue.textContent = game.released ? game.released : "No release date available"
        imgpopup.src = game.background_image
        imgpopup.className = "w-full h-48 object-cover rounded-lg mb-4"
        descriptionContent.className = "text-gray-700 text-sm leading-relaxed mb-4";
        descriptionContent.textContent = getShortDescription(game);
        
        popup.className = "bg-white p-6 rounded-lg shadow-xl h-1/2 w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-auto";
        document.body.appendChild(popup);
        
        popup.append(imgpopup);
        popup.append(popname);
        popup.append(about)
        popup.append(descriptionContent);
        popup.append(text_datesortie)
        popup.append(releaseDateValue)
        popup.append(station)
        popup.append(stationcontent)
        popup.append(rating)
        popup.append(game.rating)
        popup.append(poplike)

        function closeModal() {
            document.body.removeChild(blure);
            document.body.removeChild(popup);
        }

        blure.addEventListener("click", closeModal);
    });
}

// Function to create and manage responsive game grid
function initializeGameGrid() {
    // Remove existing game containers if any
    const existingContainer = document.getElementById('gamesGridContainer');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Create main games container
    const gamesContainer = document.createElement('div');
    gamesContainer.id = 'gamesGridContainer';
    gamesContainer.className = "container mx-auto px-6  py-6";
    
    // Create responsive grid
    const gamesGrid = document.createElement('div');
    gamesGrid.id = 'gamesGrid';
    gamesGrid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3  gap-[30px] md:gap-[40px] lg:gap-[50px] justify-items-center";
    
    gamesContainer.appendChild(gamesGrid);
    document.body.appendChild(gamesContainer);
    
    return gamesGrid;
}

// Function to add game card to the appropriate grid
function addToGameGrid(gameCard) {
    let gamesGrid = document.getElementById('gamesGrid');
    
    // If grid doesn't exist, create it
    if (!gamesGrid) {
        gamesGrid = initializeGameGrid();
    }
    
    gamesGrid.appendChild(gameCard);
}

// Function to clear the game grid
function clearGameGrid() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (gamesGrid) {
        gamesGrid.innerHTML = '';
    }
}

// Initialize grid when page loads
document.addEventListener('DOMContentLoaded', function() {
    
 
    initializeGameGrid();
});
/////////////////////////////////filter

//////////////////////////end 

let inputs = document.querySelectorAll("input")
inputs.forEach(input=>{
input.addEventListener("input",(e)=>{
     inputvalue= e.target.value
     if(inputvalue.length>1){
 searching()
     }
   
 })
 
 })
 

const genreFilter = document.getElementById("genreFilter");
const applyFiltersBtn = document.getElementById("applyFiltersBtn");

if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
        selectedGenre = genreFilter ? genreFilter.value : '';
        page = 1;

        const params = new URLSearchParams();
        params.set('page', page);
        const trimmedSearch = inputvalue.trim();
        if (trimmedSearch.length > 1) {
            params.set('search', trimmedSearch);
        }
        if (selectedGenre) {
            params.set('genres', selectedGenre);
        }

        url = `${BASE_API_URL}?${params.toString()}`;

        button.remove();
        getdata().then(data => {
            const results = data && data.results ? data.results : [];
            cleargamecontainer()
            results.forEach((game, index) => {
                if (index < 12) {
                    creatgamecard(game);
                }
            });
            document.body.append(button)
        }).catch(error => {
            console.error(error.message);
            document.body.append(button)
        });
    });
}

 
 
 
 
    // console.log(game)


async function searching(){
    console.log(inputvalue)

try{
    page = 1;
    const params = new URLSearchParams();
    const trimmedSearch = inputvalue.trim();
    params.set('page', page);
    params.set('search', trimmedSearch);
    if (selectedGenre) {
        params.set('genres', selectedGenre);
    }

    url = `${BASE_API_URL}?${params.toString()}`;

    const response = await fetch(url);
        const data = await response.json();
        let y = data && data.results ? data.results : []
        cleargamecontainer()
        removeLoadMoreButton()
        y.forEach((x,i)=>{
            console.log(i)
            if(i<12){
                console.log(x)
                  creatgamecard(x);
            }
           document.body.append(button)
        })
        
     //  creatgamecard(data);
        
}catch(error){
  console.error(error.message);
}


}


function cleargamecontainer(){

    const gameCards = document.querySelectorAll('[class*="bg-black"][class*="rounded-xl"]');
    gameCards.forEach(card => {
          if (!card.querySelector('input') && !card.closest('header')) {
            card.remove();
        }
    });


}
    
function removeLoadMoreButton() {
    // Remove by specific class and text content
    const buttons = document.querySelectorAll('button, div');
    buttons.forEach(btn => {
        if (btn.className.includes('h-8') && 
            btn.className.includes('w-8') && 
            btn.className.includes('bg-black') &&
            btn.textContent === "click") {
            btn.remove();
        }
    });
    
}


    ///////////////////////////////////////add games to favorit


      //  document.addEventListener('DOMContentLoaded', function() {

      //select all burgers to click 
         
             let burgers = document.querySelectorAll(".fa");
        
             burgers.forEach((burger, index) => {



                //what happen when click the burger

                 burger.addEventListener("click", function(event) {
                    event.stopPropagation(); 
                
                 
                  
               
                  

                     // Create popup
                     let favpop = document.createElement("div");
                  
                    favpop.className = "favorites-popup fixed inset-0 flex items-center justify-center p-4 z-50";
                  
                  
                  
                     // Create popup content

                      const popupContent = document.createElement("div");
                     popupContent.className = "favorites-content bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center flex flex-col max-h-[80vh] overflow-hidden";
                      
                  
                     ///////////////////////////////////added
                        popupContent.innerHTML = `
         <div class="flex justify-between items-center mb-6">
             <h2 class="text-2xl font-bold text-gray-800">Your Favorites</h2>
             <button class="close-popup text-gray-500 hover:text-gray-700 transition-colors">
                 <i class="fa-solid fa-times text-xl"></i>
             </button>
         </div>
      
        <div class="flex-1 overflow-y-auto favorites-list pr-2">
         </div>
     `;
                     /////////////////////////////////
                     // Append elements
                     favpop.appendChild(popupContent);
                     document.body.appendChild(favpop);
                     renderFavoritesList(popupContent);
                     popupContent.addEventListener('click', function(event) {
                        event.stopPropagation();
                     });
                  
                     // Add close functionality
                     const closeBtn = popupContent.querySelector('.close-popup');
                     closeBtn.addEventListener('click', function() {
                         favpop.remove();
                     });
                  
                     // Close when clicking backdrop
                     // backdrop.addEventListener('click', function() {
                     //     favpop.remove();
                     // });
                 });
             });
          
             // Close popup when clicking anywhere on the page
             document.addEventListener('click', function() {
                 const existingPopup = document.querySelector('.favorites-popup');
                 if (existingPopup) {
                     existingPopup.remove();
                 }
             });
      //   })

let x=1;
     function showgener(data){
        let y =data.results
       let z= y.map((x)=>{
          return x.genres 
        })
       let c=  z.map((x)=>{
           return  x
        })
        let allname=[];
            for(let i=0;i<c.length;i++){
                for(let j=0;j<c[i].length;j++){
                 
                   
                   allname.push(c[i][j].name)
                }
            }

return allname[2]
  
     }