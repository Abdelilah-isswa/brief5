
let url ="https://debuggers-games-api.duckdns.org/api/games"

let page=1;
async function getdata(){
    try{console.log("1") 
        const response= await fetch(url);
        const data = await response.json();
        console.log(data)
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
   
            button.remove();
    page++;
    url=`https://debuggers-games-api.duckdns.org/api/games?page=${page}`
     getdata().then(newdata =>{
        newdata.results.forEach((game,index) => {
            if (index<12) {
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
function creatgamecard(game){
let body =document.body
    let like = document.createElement("div")
   like.textContent = "♥";






like.className="border-2  border-blue-500 bg-black-500 rounded h-5 w-1 text-white-500 "


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
img.className =" "


 container.append(img)
 container.append(name)
 container.append(like)
  body.append(container)
}