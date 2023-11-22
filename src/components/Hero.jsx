import {Link} from 'react-router-dom';
import IMAGES from '../Images/Images';
const Hero = () => {
  return (
    <section className=' md:h-full'>
      <div className='max-w-6xl mx-auto text-center px-10 pt-8'>
        <img
          className='rounded overflow-hidden shadow-xl dark:shadow-gray-300 mx-auto mb-2 mt-2 h-48 w-96 '
          src={IMAGES.frontHero}
          alt='Logo'
        />
        <section className='bg-white dark:bg-gray-900'>
          <div className='py-4 px-4 mx-auto max-w-screen-xl text-center '>
            <h5 className='mb-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 '>
              {` Members' Trap Shoot`}
            </h5>
            <p className='mb-2 text-lg font-normal text-gray-500 dark:text-gray-400'>
              First Saturday of the Month, Starting January 6th, From 9:00am
            </p>
          </div>
        </section>

        <div className='flex flex-col justify-center mb-4 md:flex-row md:space-x-6 gap-y-6'>
          <div className='flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3 shadow-lg'>
            <div className='font-bold text-xl'>Your Account</div>
            <p className='max-w-3xl mx-auto mb-10 text-2xl text-darkGrayishBlueII text-base'>
              <Link
                className='text-darkBlue underline'
                to='/register'
              >
                Register
              </Link>{' '}
              as user to update your info.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
