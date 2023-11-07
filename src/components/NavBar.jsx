import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IMAGES from '../Images/Images';
import Context from '../context/Context';
import {logoutUser} from '../context/actions.js';
import '../index.css';

const NavBar = ({isHamburgerOpen, setIsHamburgerOpen}) => {
  const {user, dispatch} = useContext(Context);
  const navigate = useNavigate();

  const handleClickHamburger = () => {
    setIsHamburgerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logoutUser();
    dispatch({
      type: 'RESET',
    });
    navigate('/');
  };

  return (
    <nav className='relative container mx-auto p-6'>
      <section className='flex items-center justify-between'>
        <div className='pt-2'>
          <img
            className='h-14 w-14'
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

          {user ? (
            <>
              <Link
                className='hover:text-darkGrayishBlue hover:underline'
                to='/profile'
              >
                Profile
              </Link>
              <button
                className='hover:text-darkGrayishBlue hover:underline'
                onClick={handleLogout}
              >
                Log-out
              </button>
            </>
          ) : (
            <>
              <Link
                className='hover:text-darkGrayishBlue hover:underline'
                to='/login'
              >
                Login
              </Link>
            </>
          )}
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

      <div className={` ${isHamburgerOpen ? 'mb-36' : ''} md:hidden`}>
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
          {user ? (
            <>
              <Link
                className='hover:text-darkGrayishBlue underline'
                to='/profile'
              >
                Profile
              </Link>
              <button
                className='hover:text-darkGrayishBlue underline'
                onClick={handleLogout}
              >
                Log-out
              </button>
            </>
          ) : (
            <>
              <Link
                className='hover:text-darkGrayishBlue underline'
                to='/login'
              >
                Login
              </Link>
            </>
          )}
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
