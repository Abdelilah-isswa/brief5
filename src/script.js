
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
   
 data.results.forEach((game,index) => {
    //append image
console.log(index)
if(index<12){
 creatgamecard(game);

}
  

 
   
    
  });
  let button = document.createElement("button")
  button.style.height="20px"
  button.style.width="50px"
    button.style.backgroundColor="blue"
    document.body.append(button)
  //////////load more   
button.addEventListener("click",()=>{
    page++;
    url=`https://debuggers-games-api.duckdns.org/api/games?page=${page}`
     getdata().then(newdata =>{
        newdata.results.forEach((game,index) => {
            if (index<12) {
                creatgamecard(game)
                
            }
     })
    })
//     console.log(data.next)
//    data.page= page
//     console.log(data.page)
//     getdata();
})

})


///card content
function creatgamecard(game){
let body =document.body
    let like = document.createElement("div")
   like.textContent = "♥";
like.style.color = "red";
like.style.backgroundColor = "white";
like.style.border = "none";
like.style.borderRadius = "50%";
like.style.width = "40px";
like.style.height = "40px";
like.style.fontSize = "20px";


    let container =document.createElement("div")
    let name = document.createElement("h3")
    name=game.name
    console.log(name)
container.style.backgroundColor="red"
container.style.height="300px"
container.style.margin="10px"



 let imgurl = game.background_image;

let img= document.createElement("img")
img.src=imgurl;


 container.append(img)
 container.append(name)
 container.append(like)
  body.append(container)
}