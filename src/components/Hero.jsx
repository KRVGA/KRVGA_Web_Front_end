import {Link} from 'react-router-dom';
import IMAGES from '../Images/Images';
const Hero = () => {
  return (
    <section id='hero'>
      <div className='max-w-6xl mx-auto text-center mb-40 px-10 pt-16'>
        <img
          className='rounded overflow-hidden shadow-xl dark:shadow-gray-300 mx-auto mb-2 mt-2 h-48 w-96 '
          src={IMAGES.frontHero}
          alt='Logo'
        />
        <h5 className='mb-4 text-2xl font-bold text-darkGrayishBlueII md:text-5xl'>
          Latest Updates From KRVGA
        </h5>

        <div className='flex flex-col justify-center mt-2 md:flex-row md:space-x-6 gap-y-6'>
          <div className='flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3 shadow-lg'>
            <div className='font-bold text-xl '>Accepting Now</div>
            <p className='max-w-3xl mx-auto mb-10 text-2xl text-darkGrayishBlueII text-base'>
              <Link
                className='text-darkBlue underline'
                to='/membership_purchase'
              >
                Membersip
              </Link>{' '}
              applications.
            </p>
          </div>
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
