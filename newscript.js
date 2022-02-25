const currentdescription = document.getElementById('description');
const currenticon = document.getElementById('cicon');
const currentDate = document.getElementById('date');
const currentHumidity = document.getElementById('humidity');
const currentWeather = document.getElementById('current-weather');
const currentWin = document.getElementById('win-speed');
const currentdayhour = document.getElementById('cdayhours');
// const country = document.getElementById('country');
const currentTemp = document.getElementById('current-temp');
const daymaxtemp=document.getElementById('max')
const daysunrise=document.getElementById('sunrise')
const daymintemp=document.getElementById('min')
const daysunset=document.getElementById('sunset')
const daycol=document.getElementById('privousdayscard')
const privousdaysel=document.getElementById('privousdays');



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const gettime = new Date();
setInterval (() => {
    
    const month = gettime.getMonth();
    const date = gettime.getDate();
    const day = gettime.getDay();
    currentDate.innerHTML = days[day] + ',' + date + ' ' + months[month]
},
1000);
const key = 'b899b544da9e4282018ab1335edf0f94';
const latitude=33.5138;
const longitude=36.2765;
async function weatherdate() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&appid=${key}`);
    const data= await response.json();
        console.log(data);
        drawWeather(data);
}
weatherdate()

function drawWeather(data) {
    const {temp} = data.current;
    let {description , icon} = data.current.weather[0]
    currentdescription.innerHTML = description;
    currentTemp.innerHTML = temp + '&deg;' ;
    currenticon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
    currentHumidity.innerHTML=data.daily[0].humidity+"%";
    currentWin.innerHTML=data.daily[0].wind_speed+"mph";
    daymaxtemp.innerHTML = data.daily[0].temp.max + '&deg;' ;
    daymintemp.innerHTML = data.daily[0].temp.min + '&deg;' ;
    daysunrise.innerHTML = window.moment(data.daily[0].sunrise * 1000).format('hh:mm a');
    daysunset.innerHTML = window.moment(data.daily[0].sunset * 1000).format('hh:mm a');

    let dayhour = ' ';
    for(let i=1 ; i <= 24 ; i++){
        dayhour += `
        <div class="swiper-slide card justify-content-around text-center">
        <div class="weather-by-hour__item" >
            <div class="weather-by-hour__hour">${window.moment(data.hourly[i-1].dt * 1000).format('hh:mm a')}</div>
            <img src="http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png">
            <div>${data.hourly[i].temp+"&deg"}</div>
          </div></div>
          `
    }
    currentdayhour.innerHTML=dayhour;


    console.log(window.moment(data.daily[4].dt*1000).format('M'));

    let five5day='';
    for(let i=1;i<=5;i++){        
        five5day+=
        `<div class="row text-center next-5-days__row mb-1 align-items-center">
        <div class="col next-5-days__date ">${window.moment(data.daily[i].dt*1000).format('dddd')}
          <div class="next-5-days__label">${window.moment(data.daily[i].dt*1000).format('D/M')}</div>
        </div>
        <div class="col next-5-days__icon">
        <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">
        </div><div class="col next-5-days__low">${data.daily[i].temp.min+"&deg"}
            <div class="next-5-days__label">Low</div>
        </div> <div class="col next-5-days__high">${data.daily[i].temp.max+"&deg"}
            <div class="next-5-days__label">High</div>
        </div><div class="col next-5-days__wind">${data.daily[i].wind_speed +"mph"}
            <div class="next-5-days__label">Wind</div>
        </div><div class="col next-5-days__rain">${data.daily[i].humidity+"%"}
            <div class="next-5-days__label">Humidity</div>
        </div>
    </div>`
    }
    privousdaysel.innerHTML=five5day;

    let dailycon='';

    for(let i=1;i<=5;i++){
        dailycon+=`
        <div class="swiper mySwiper d-flex d-sm-none">
        <div class="swiper-wrapper">
            <div class="weather-by-hour__item next-5-days__date" >${window.moment(data.daily[i].dt*1000).format('dddd')}
            <p class="next-5-days__icon"></p>
            <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">
            <p class="next-5-days__low">${data.daily[i].temp.min+"&deg"+"-"+data.daily[i].temp.max+"&deg"}</p>
        </div>
        </div>
        </div>
        `;
        
    }
   daycol.innerHTML=dailycon;


}
