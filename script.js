const wrapper = document.querySelector(".wrapper");  
inputPart = wrapper.querySelector(".input-part");
infoTxt = inputPart.querySelector(".info-txt");
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");
wIcon = document.querySelector("img");
arrowBack = wrapper.querySelector("header i");
searchIcon = document.querySelector(".searchIcon");

let api;

inputField.onkeydown = function(e){
    if(e.keyCode == 13 &&  inputField.value != ""){
        requestApi(inputField.value);  
    }
};

searchIcon.addEventListener("click", e => {
    if (inputField.value === "" || inputField.value === " "){
        alert("Please enter data in this field")
    } else {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=af04322fbeb3b554325eff4c4329af95`;
fetchData();
};

function onSuccess(position){
const {latitude, longitude} = position.coords; 
api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=af04322fbeb3b554325eff4c4329af95`;
fetchData();
};

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
};

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
};

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else {
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wIcon.src="assets/clear.svg"
        } else if (id >= 200 && id <=232){
            wIcon.src="assets/strom.svg"
        } else if (id >= 600 && id <= 622){
            wIcon.src="assets/snowy.svg"
        } else if (id >= 701 && id <=781){
            wIcon.src="assets/haze.svg"
        } else if (id >= 801 && id <=804){
            wIcon.src="assets/cloudy.svg"
        }  else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src="assets/rainy.svg"
        } 

   wrapper.querySelector(".temp .numb").innerText =  Math.floor(temp);
   wrapper.querySelector(".weather").innerText = description.toUpperCase();
   wrapper.querySelector(".location span").innerText =` ${city},${country}`;
   wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
   wrapper.querySelector(".humidity span").innerText=`${humidity}%`;
        
        infoTxt.classList.remove("pending", "error"); 
        infoTxt.innerText = "";
        inputField.value ="";
        wrapper.classList.add("active");
    }
};

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});