import  {useEffect, useState} from 'react'

import unplash1 from './projectimage/unplash1.jpg';
import cold from './projectimage/cold.jpg';
import Weatherdetails from '../src/components/Weatherdetails';

import { getAllWeatherData } from './weatherAction';


function App() {
  const [city , setCity] = useState("Netherlands")
  const [weather,setWeather] = useState(null)
  const [unit,setUnit] = useState("metric")
  const [background,setBackground] = useState(unplash1)

  useEffect(() => {
    const fetchWeatherData = async()=>{
      const data = await getAllWeatherData(city,unit);
      setWeather(data)

      //background condition
      const hotCold = unit === 'metric'? 20 : 60
      if(data.temp<=hotCold) setBackground(cold)
      else setBackground(unplash1)
    };
    fetchWeatherData();
    
  }, [unit,city])
  
  const handleUnitClick=(e)=>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnit(isCelsius? 'metric' : 'imperial')

  }
   
    const enterKeyPressed =(e)=>{
      if(e.keyCode===13){
        setCity(e.currentTarget.value);
      e.currentTarget.blur()
      }

    }

  return (
    <div className='app' style={{backgroundImage:`url(${background})`}}>
      <div className='over-lay'>
        {weather && (
          <div className='container'>
          <div className='section section__inputs'>
            <input 
             onKeyDown={enterKeyPressed}
             type='text' 
             name='city' 
             placeholder='Enter City ...'/>
            <button onClick={(e)=>{handleUnitClick(e)}}>°{unit === 'metric' ? 'F' : 'C'}</button>
          </div>
          <div className='section section__temparature'>
            <div className='icon'>
              <h2>{`${weather.name},${weather.country}`}</h2>
              <img src={weather.iconURL} alt='weather img'/>
              <h2>{weather.description}</h2>
            </div>
            <div className='temparature'>
              <h2>{`${weather.temp.toFixed()} °${unit==='metric'? 'C' : 'F'}`}</h2>
            </div>
          </div>
          {/* bottom description */}
          <Weatherdetails weather={weather} unit={unit}/>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
