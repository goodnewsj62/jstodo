let getweatherApi = new Promise(function(resolve,reject){
    let request = new XMLHttpRequest()
    let apiKey ="";
    let city = "umuahia";

    request.open("GET","http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apiKey);
    request.onload = function (){
        if(request.status == 200){
            resolve(request.response)
        }else{
            resolve("a problem occurred while gettting data")
        }
    }
    request.send();
});

export async function getweather (){
    let weatherApi = await getweatherApi;
    return weatherApi;
}


