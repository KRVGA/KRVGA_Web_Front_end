import {Link} from 'react-router-dom';
import IMAGES from '../Images/Images';
const Hero = () => {
  return (
    <section id='hero'>
      <div className='max-w-6xl mx-auto text-center mb-40 px-10 pt-16'>
        <h3 className='text-brightRed'>
          SITE UNDER CONSTRUCTION NOVEMBER, 2023
        </h3>
        <img
          className='rounded overflow-hidden shadow-xl dark:shadow-gray-300  mx-auto mb-2 mt-2 '
          src={IMAGES.frontHero}
          alt='Logo'
        />
        <h3 className='mb-8 text-4xl font-bold text-darkGrayishBlueII md:text-5xl'>
          Latest Updates From KRVGA
        </h3>

        <div className='flex flex-col justify-center mt-2 md:flex-row md:space-x-6 gap-y-6'>
          <div className='flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3'>
            <h5 className='text-lg font-bold'>Comming Soon</h5>
            <p className='max-w-3xl mx-auto mb-10 text-2xl text-darkGrayishBlueII'>
              receiving membersip applications.
              <Link
                className='text-darkBlue underline'
                to='/'
              >
                Memberships
              </Link>
            </p>
          </div>
          <div className='flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3'>
            <h5 className='text-lg font-bold'>Comming Soon</h5>
            <p className='max-w-3xl mx-auto mb-10 text-2xl text-darkGrayishBlueII'>
              <Link
                className='text-darkBlue underline'
                to='/'
              >
                Register
              </Link>{' '}
              as user to update your info
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
