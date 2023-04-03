const API_KEY = '1687700c97736df449802f97b395bcab';

const iconURL = (iconId)=> `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getAllWeatherData = async (city , units ='metric')=>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
    .then((res)=>res.json())
    .then ((data)=>data);
    

   const {
    weather,
    main:{temp, feels_like, temp_max, temp_min,humidity,pressure},
    wind:{speed}, 
    sys:{ country },
    name,} = data
   
   const {description ,icon} = weather[0]

   return{
        description,
        iconURL: iconURL(icon),
        weather,
        temp,
        feels_like,
        temp_max,
        temp_min,
        humidity,
        pressure,
        speed,
        country,
        name,
   }
}
   

export {getAllWeatherData};