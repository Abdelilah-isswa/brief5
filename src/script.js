
let url ="https://debuggers-games-api.duckdns.org/api/games"


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
 
  
  console.log(data)
 
   
    
  });
  //////////


})