
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
getdata().then(data=>{
 console.log("2")
 
  console.log(data)
  //////////


})