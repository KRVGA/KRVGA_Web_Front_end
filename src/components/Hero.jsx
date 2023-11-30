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
          <div className='py-4 mx-auto max-w-screen-xl text-center '>
            <h5 className='mb-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 '>
              About the Kern River Valley Gun Association
            </h5>
            <p className='text-base mb-2 text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
              The Kern River Valley Gun Association (KRVGA) operates on a non-
              discriminatory basis and under special use permit (SUP) from the
              Sequoia National Forest. Our 37-acre shooting range offers our
              members and visitors a place to enjoy rifle, pistol, trap and
              archery shooting.
            </p>

            <p className='text-base  mb-2 text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
              Our pistol range (pistol and pistol caliber rifles only) consists
              of 13 shooting bays with two wheelchair accessible bays. The
              pistol range has an assortment of fixed targets out to 50 yards
              and the ability to place paper targets at any distance up to 100
              yards.
            </p>
            <p className='text-base  mb-2 text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
              Our rifle range consist of 7 shooting benches and offers an
              assortment of steel targets out to 750 yards. Paper targets can be
              placed at 25, 50, 100, 150, 200, 300, 400, 500, and 600 yards.
            </p>
            <p className='text-base mb-2 text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
              We have 1 amateur trap field available on the Sundays we are open
              to the public (See the Calendar for most current Public Shooting
              Days). Cost is only $5.00 per round. The Archery range has various
              3D and bag targets out to 80 yards.
            </p>
            <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
              Annual Memberships are $45 per calendar year. A Spouse Membership
              may be purchased for an additional $20. Members may bring up to 3
              guests at a time for free. We DO NOT have guns for rent.
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
