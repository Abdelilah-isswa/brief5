
let url ="https://debuggers-games-api.duckdns.org/api/games"

let page=1;
async function getdata(){
    try{console.log("1") 
        const response= await fetch(url);
        const data = await response.json();
       return data
    }catch(error){
        console.error(error.message);
    }
}

let count = 12;
getdata().then(data=>{
    
 data.results.forEach((game) => {
    //append image

 creatgamecard(game);
  

 
   
    
  });
  let button = document.createElement("button")
  button.style.height="20px"
  button.style.width="50px"
    button.style.backgroundColor="blue"
    document.body.append(button)
  //////////
button.addEventListener("click",()=>{
    page++;
    url=`https://debuggers-games-api.duckdns.org/api/games?page=${page}`
     getdata().then(newdata =>{
        newdata.results.forEach((game) => {
            creatgamecard(game)
     })
    })
//     console.log(data.next)
//    data.page= page
//     console.log(data.page)
//     getdata();
})

})
function creatgamecard(game){
let body =document.body

    let container =document.createElement("div")
container.style.backgroundColor="red"
container.style.height="200px"
container.style.margin="10px"



 let imgurl = game.background_image;

let img= document.createElement("img")
img.src=imgurl;
/// append name
 container.append(img)
  body.append(container)
}