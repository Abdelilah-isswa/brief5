
let url = "https://debuggers-games-api.duckdns.org/api/games"

let page = 1;
async function getdata() {
    try {
        console.log("1")
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error(error.message);
    }
}

let count = 12;
getdata().then(data => {

    data.results.forEach((game, index) => {
        //append image
        console.log(index)
        if (index < 12) {
            creatgamecard(game);

        }





    });
    let button = document.createElement("button")
    button.style.height = "20px"
    button.style.width = "50px"
    button.style.backgroundColor = "blue"
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
   
    like.className = "bg-pink-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors";
like.textContent = "♥";

    let container = document.createElement("div")
    let name = document.createElement("h3")
    name.textContent = game.name

        container.className="bg-black  text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
    console.log(game)
   
container.className += " m-4"


    let imgurl = game.background_image;

    let img = document.createElement("img")
    img.src = imgurl;
    img.className = " "
    console.log("1")
    console.log(game.name)

    container.append(img)
    container.append(name)
    container.append(like)
    body.append(container)
    ////////////////////////////////////////////////

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


        popname.textContent=game.name_original
        about.textContent="About"
   // rating_content.
        station.textContent = "station"
        text_datesortie.textContent = "Date de sortie"
        rating.textContent = "rating"
        ///appending the api content

        //let editure = document.createElement("div")
        //

        console.log("2")
        ////paltformes
        game.platforms.forEach(x => {
            let platform1 = document.createElement("span");
            platform1.textContent = x.platform.name
            console.log(x.platform.name)
             stationcontent.appendChild(platform1)
        })
        console.log(game.platforms[0].platform.name)
        //editure.textContent ="Éditeur / Studio"
        //editure.className="font-bold"
        text_datesortie.className = "font-bold"
        //blure
        popname.className="font-bold"
        blure.className = "fixed inset-0 backdrop-blur-md bg-black bg-opacity-30 z-40";
        document.body.appendChild(blure);

        // Create popup
        
        about.className="font-bold"
        station.className = "font-bold"
       rating.className = "font-bold"
        imgpopup.src = game.background_image
        
        popup.className = "bg-white p-6 rounded-lg shadow-xl h-1/2 w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-auto";
        document.body.appendChild(popup);
        name.className = "font-bold"
        popup.append(imgpopup);
        popup.append(popname);
        popup.append(about)
        popup.append(game.description);
        popup.append(station)
       popup.append(stationcontent)
        popup.append(rating)
        
        popup.append(game.rating)
        popup.append(poplike)

        // Close functionality
        function closeModal() {
            document.body.removeChild(blure);
            document.body.removeChild(popup);

        }

        blure.addEventListener("click", closeModal);


        console.log(game)

    });
}
