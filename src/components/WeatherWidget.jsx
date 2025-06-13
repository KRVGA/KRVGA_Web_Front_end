import {getCompassDirection} from '../utils/utils';

const WeatherWidget = ({weather, setShowWeather}) => {
  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
      <div className='bg-gray-900 w-[95%] sm:w-[85%] max-w-md rounded-xl p-4 max-h-[90vh] flex flex-col justify-between'>
        <button
          onClick={() => setShowWeather(false)}
          className='text-xs mb-3 underline font-semibold self-center text-[hsl(12,88%,59%)]'
          style={{color: 'hsl(12, 88%, 59%)'}}
        >
          Close Weather
        </button>
        <p className='text-[0.65rem] text-gray-400 text-center mb-3'>
          Last reading: {weather.timestampPST}
        </p>
        <div className='grid grid-cols-1 gap-2 text-white text-[0.8rem]'>
          <div className='bg-gray-800 rounded-xl p-3'>
            <h4 className='text-base font-semibold mb-1'>Outdoor</h4>
            <p className='text-3xl font-bold'>{weather.tempf}&deg;F</p>
            <p className='text-xs'>Feels Like: {weather.feelsLike}&deg;F</p>
            <p className='text-xs'>Dew Point: {weather.dewPoint}&deg;F</p>
          </div>
          <div className='bg-gray-800 rounded-xl p-3'>
            <h4 className='text-base font-semibold mb-1'>Wind</h4>
            <p className='text-3xl font-bold'>{weather.windspeedmph} mph</p>
            <p className='text-xs'>Gusts: {weather.windgustmph} mph</p>
            <p className='text-xs'>Peak: {weather.maxdailygust} mph</p>
            <p className='text-xs'>
              Direction: {getCompassDirection(weather.winddir)}
            </p>
          </div>
          <div className='bg-gray-800 rounded-xl p-3'>
            <h4 className='text-base font-semibold mb-1'>Humidity</h4>
            <p className='text-3xl font-bold'>{weather.humidity}%</p>
            <p className='text-xs text-blue-400'>↑ 5% from yesterday</p>
          </div>
          <div className='bg-gray-800 rounded-xl p-3'>
            <h4 className='text-base font-semibold mb-1'>Pressure</h4>
            <p className='text-3xl font-bold'>{weather.baromrelin} inHg</p>
            <p className='text-xs text-yellow-400'>↓ 0.02 inHg/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
