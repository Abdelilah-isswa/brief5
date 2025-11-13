
let url = "https://debuggers-games-api.duckdns.org/api/games"
 let button = document.createElement("div")
let page = 1;
async function getdata() {
    try {
        
        const response = await fetch(url);
        const data = await response.json();
       
        return data
    } catch (error) {
        console.error(error.message);
    }
}

let count = 12;
getdata().then(data => {

    data.results.forEach((game, index) => {
        //append image
    //   console.log(game)
        if (index < 12) {
            creatgamecard(game);

        }





    });
   //
button.className = "h-8 w-8 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 shadow flex items-center justify-center";button.textContent="click"
    document.body.append(button)
    //////////load more   

    button.addEventListener("click", () => {

        button.remove();
        page++;
        url = `https://debuggers-games-api.duckdns.org/api/games?page=${page}`
        getdata().then(newdata => {
            newdata.results.forEach((game, index) => {
                if (index < 12) {
                    creatgamecard(game)

                }

            })
            document.body.append(button)
        })


        //     console.log(data.next)
        //    data.page= page
        //     console.log(data.page)
        //     getdata();
    })
}

)


///card content
function creatgamecard(game) {
    let body = document.body
    let like = document.createElement("div")
   
    like.className = "bg-pink-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors absolute top-2 right-2 z-10";
    like.textContent = "♥";

    let container = document.createElement("div")
    let name = document.createElement("h3")
    name.textContent = game.name
    name.className = "p-3 font-semibold truncate"

    // Responsive container classes
    container.className = "bg-black text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
    
    // Mobile: single column, Tablet: 2 columns, Desktop: 3 columns
    container.className += " w-full sm:w-64 md:w-72 lg:w-80 m-2"

    let imgurl = game.background_image;
    let img = document.createElement("img")
    img.src = imgurl;
    img.className = "w-full h-48 object-cover"
    
    container.append(img)
    container.append(name)
    container.append(like)
    
    // Add to appropriate container based on screen size
    addToGameGrid(container);
    
    ////////////////////////////////////////////////
    // Your existing popup code remains the same
    container.addEventListener("click", () => {
        let poplike = document.createElement("div")
        poplike.className = "bg-pink-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors";
        poplike.textContent = "♥";
        
        let popname = document.createElement("div")
        let text_datesortie = document.createElement("div")
        let rating_content = document.createElement("div")
        let rating = document.createElement("div")
        const blure = document.createElement("div");
        let imgpopup = document.createElement("img");
        let station = document.createElement("div");
        let popup = document.createElement("div");
        let about = document.createElement("div")
        let stationcontent = document.createElement("div")

        popname.textContent = game.name_original
        about.textContent = "About"
        station.textContent = "station"
        text_datesortie.textContent = "Date de sortie"
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
        imgpopup.src = game.background_image
        imgpopup.className = "w-full h-48 object-cover rounded-lg mb-4"
        
        popup.className = "bg-white p-6 rounded-lg shadow-xl h-1/2 w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-auto";
        document.body.appendChild(popup);
        
        popup.append(imgpopup);
        popup.append(popname);
        popup.append(about)
        popup.append(game.description);
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
    gamesContainer.className = "container mx-auto px-4 py-6";
    
    // Create responsive grid
    const gamesGrid = document.createElement('div');
    gamesGrid.id = 'gamesGrid';
    gamesGrid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center";
    
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


//////////////////////////end 

let inputs = document.querySelectorAll("input")
let inputvalue =''
inputs.forEach(input=>{
input.addEventListener("input",(e)=>{
     inputvalue= e.target.value
     if(inputvalue.length>1){
searching()
     }
   
})

})





   // console.log(game)


async function searching(){
    console.log(inputvalue)

try{
    let url2 =`https://debuggers-games-api.duckdns.org/api/games?search=${inputvalue}`

    const response = await fetch(url2);
        const data = await response.json();
        let y =data.results
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


let pages=1;
async function searching2() {
    
}


    button.addEventListener("click", () => {

        button.remove();
        pages++;
        console.log(pages)
        url = `https://debuggers-games-api.duckdns.org/api/games?page=${page}&search=${inputvalue}`  //api/games?search=${inputvalue}`
        searching2().then(newdata => {
            console.log("new",newdata)
            newdata.results.forEach((game, index) => {
                if (index < 12) {
                    creatgamecard(game)

                }

            })
            document.body.append(button)
        })


    })