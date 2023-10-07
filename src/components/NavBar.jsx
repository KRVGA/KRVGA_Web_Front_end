import {Link} from 'react-router-dom';
import IMAGES from '../Images/Images';
import '../index.css';

const NavBar = ({isHamburgerOpen, setIsHamburgerOpen}) => {
  const handleClickHamburger = () => {
    setIsHamburgerOpen((prev) => !prev);
  };

  return (
    <nav className='relative container mx-auto p-6'>
      <section className='flex items-center justify-between'>
        <div className='pt-2'>
          <img
            className='h-40 w-40'
            src={IMAGES.logoAlt}
            alt='Logo'
          />
        </div>
        <section className='hidden md:flex space-x-8'>
          <Link
            className='hover:text-darkGrayishBlue hover:underline'
            to='/'
          >
            Home
          </Link>
          <Link
            className='hover:text-darkGrayishBlue hover:underline'
            to='/membership_purchase'
          >
            Memberships
          </Link>
          <a
            className='hover:text-darkGrayishBlue hover:underline'
            href='https://membership.nra.org/MultiStep/JoinToday'
            target='_blank'
            rel='noreferrer'
          >
            Join NRA
          </a>
          <Link
            className='hover:text-darkGrayishBlue hover:underline'
            to='/register'
          >
            Sing-Up
          </Link>
          <Link
            className='hover:text-darkGrayishBlue hover:underline'
            to='/login'
          >
            Login
          </Link>
        </section>

        <button
          onClick={handleClickHamburger}
          id='menu-btn'
          className={` ${
            isHamburgerOpen ? 'open' : ''
          } block hamburger md:hidden focus:outline-none`}
        >
          <span className='hamburger-top'></span>
          <span className='hamburger-middle'></span>
          <span className='hamburger-bottom'></span>
        </button>
      </section>

      <div className={` ${isHamburgerOpen ? 'mb-24' : ''} md:hidden`}>
        <div
          id='menu'
          className={
            isHamburgerOpen
              ? 'absolute flex flex-col items-center rounded self-end py-4 mt-4  space-y-3 font-bold bg-veryLightGray sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
              : 'absolute flex-col items-center self-end rounded hidden py-4 mt-4  space-y-3 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
          }
        >
          <Link
            className='hover:text-darkGrayishBlue underline'
            to='/membership_purchase'
          >
            Memberships
          </Link>
          <Link
            className='hover:text-darkGrayishBlue underline'
            to='/'
          >
            Home
          </Link>
          <Link
            className='hover:text-darkGrayishBlue underline'
            to='/membership_purchase'
          >
            Sign-up
          </Link>
          {/* <Link
            className='hover:text-darkGrayishBlue underline'
            to='/membership_purchase'
          >
            Login
          </Link> */}
          <a
            className='hover:text-darkGrayishBlue underline'
            href='https://membership.nra.org/MultiStep/JoinToday'
            target='_blank'
            rel='noreferrer'
          >
            Join NRA
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
