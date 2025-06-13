import {useState, useEffect} from 'react';
import {fetchWeather} from '../context/actions';
import IMAGES from '../Images/Images';
import WeatherWidget from './WeatherWidget';

const Hero = () => {
  const [showWeather, setShowWeather] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather().then((data) => {
      if (!data.error) {
        setWeather(data);
      }
    });
  }, []);

  return (
    <section className='mb-4'>
      <div className='max-w-6xl mx-auto text-center px-10 pt-8'>
        <img
          className='rounded overflow-hidden shadow-xl dark:shadow-gray-300 mx-auto mb-2 mt-2 h-48 w-96 '
          src={IMAGES.frontHero}
          alt='Logo'
        />

        {weather && (
          <div
            onClick={() => setShowWeather(true)}
            className='mt-4 inline-flex items-center justify-between px-4 py-2 bg-gray-900 text-white rounded-full text-sm shadow cursor-pointer'
          >
            <span>{weather.tempf}&deg;F</span>
            <span className='ml-2 text-xs text-blue-300'>
              (tap for details)
            </span>
          </div>
        )}

        {/* Weather Overlay Drawer */}
        {showWeather && (
          <WeatherWidget
            weather={weather}
            setShowWeather={setShowWeather}
          />
        )}
        <section>
          <div className='py-4 mb-2 mx-auto max-w-screen-xl text-center '>
            <h5 className='mb-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 '>
              About the Kern River Valley Gun Association
            </h5>
            <p className='text-base mb-2 text-justify '>
              The Kern River Valley Gun Association (KRVGA) operates on a non-
              discriminatory basis and under special use permit (SUP) from the
              Sequoia National Forest. Our 37-acre shooting range offers our
              members and visitors a place to enjoy rifle, pistol, trap and
              archery shooting.
            </p>

            <p className='text-base  mb-2 text-justify '>
              Our pistol range (pistol and pistol caliber rifles only) consists
              of 13 shooting bays with two wheelchair accessible bays. The
              pistol range has an assortment of fixed targets out to 50 yards
              and the ability to place paper targets at any distance up to 100
              yards.
            </p>
            <p className='text-base  mb-2 text-justify '>
              Our rifle range consist of 7 shooting benches and offers an
              assortment of steel targets out to 750 yards. Paper targets can be
              placed at 25, 50, 100, 150, 200, 300, 400, 500, and 600 yards.
            </p>
            <p className='text-base mb-2 text-justify'>
              We have 1 amateur trap field available on the Sundays we are open
              to the public (See the Calendar for most current Public Shooting
              Days). Cost is only $5.00 per round. The Archery range has various
              3D and bag targets out to 80 yards.
            </p>
            <p className='text-base text-justify '>
              Annual Memberships are $45 per calendar year. A Spouse Membership
              may be purchased for an additional $20. Members may bring up to 3
              guests at a time for free. We DO NOT have guns for rent.
            </p>
          </div>
          <h3 className='mb-4 font-extrabold tracking-tight leading-none text-gray-900'>
            OFFICERS
          </h3>

          <div className='grid grid-cols-2 md:grid-cols-3  gap-4 text-sm'>
            <div className='flex flex-col'>
              <span className='text-base'>Jeff </span>
              <span className='text-base'>Evans</span>

              <span className='font-light'>President</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-base'>Rich </span>
              <span className='text-base'>McDonald</span>
              <span className='font-light'>Vice President</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-base'>Kee </span>
              <span className='text-base'>Johnson</span>
              <span className='font-light'>Secretary</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-base'>Bob </span>
              <span className='text-base'>Johnson</span>
              <span className='font-light'>Treasurer</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-base'>Doug </span>
              <span className='text-base'>Rudolph</span>
              <span className='font-light'>Range Executive Officer</span>
            </div>
            <div className='flex flex-col '>
              <span className='text-base'>Gabe </span>
              <span className='text-base'>Szalay</span>
              <span className='font-light'>Range Maintenance Officer</span>
            </div>
            <div className='flex flex-col col-span-2 md:col-span-3'>
              <span className='text-base'>Danielle </span>
              <span className='text-base'>Cockburn</span>
              <span className='font-light'>Competition Director</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Hero;
