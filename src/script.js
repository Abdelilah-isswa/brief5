// let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let url ="https://simplonline-v3-prod.s3.eu-west-3.amazonaws.com/media/file/txt/filteredgames-690b33c424e7a033393285.txt"
// let finelurl = proxyUrl + url
async function getdata(){
    try{ const response= await fetch(url);
        const data = await response.text();
        console.log( data)
    }catch(error){
        console.error(error.message);
    }
}
getdata();