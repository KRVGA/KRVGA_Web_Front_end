import {useEffect, useContext, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {
  logIn,
  register,
  requestProcessMembershipPurchase,
} from '../../context/actions.js';
import Context from '../../context/Context.jsx';
import {capitalizeWord} from '../../utils/utils.js';

const Success = () => {
  const {dispatch, isError, message} = useContext(Context);

  const [searchParams] = useSearchParams();
  const [showAlert, setShowAlert] = useState(false);
  const [userData, setUserData] = useState({
    guestPurchaseToken: null,
    email: '',
    password: '',
    membership_purchase_id: '',
    full_name: '',
    accountAlreadyExist: null,
  });

  const {
    email,
    password,
    guestPurchaseToken,
    membership_purchase_id,
    full_name,
    accountAlreadyExist,
  } = userData;
  useEffect(() => {
    const {session_id} = Object.fromEntries([...searchParams]);

    const fetchMemberShipPurchase = async () => {
      const result = await requestProcessMembershipPurchase(session_id);

      setUserData((prevState) => ({
        ...prevState,
        guestPurchaseToken: result.statusResponseObject.guestToken,
        membership_purchase_id:
          result.statusResponseObject.membership_purchase_id,
        full_name: result.statusResponseObject.full_name,
        accountAlreadyExist: result.statusResponseObject.accountAlreadyExist,
      }));
    };
    fetchMemberShipPurchase();
  }, []);

  const handleClick = () => {
    setShowAlert((prev) => !prev);
    dispatch({
      type: 'RESET',
    });
  };

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userDataObject = {
      email,
      password,
      guestPurchaseToken,
      membership_purchase_id,
      accountAlreadyExist,
    };

    try {
      let result;
      if (guestPurchaseToken && accountAlreadyExist) {
        result = await logIn(userDataObject);
      } else if (guestPurchaseToken && !accountAlreadyExist) {
        result = await register(userDataObject);
      }

      if (!result.success) {
        dispatch({
          type: 'ERROR',
          payload: result.message,
        });
        setShowAlert(true);
      }
      if (result.login_success) {
        dispatch({
          type: 'USER_LOGIN',
          payload: result,
        });

        setTimeout(() => dispatch({type: 'REMOVE_ALERT'}), 2000);
      }
      if (result.register_success) {
        dispatch({
          type: 'USER_REGISTER',
          payload: result,
        });

        setTimeout(() => dispatch({type: 'REMOVE_ALERT'}), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center membership-purchase '>
      <div className='px-4 sm:px-0 text-center'>
        <h3 className='text-base font-semibold leading-7 text-gray-900'>
          {full_name ? `Thank you ${capitalizeWord(full_name)}!` : 'Thank you!'}
        </h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
          We have emailed you a confirmation of your purchase.
        </p>

        {accountAlreadyExist ? (
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-800'>
            Please Log into Your Account To Keep Up To Date Your Membership
            Information
          </p>
        ) : (
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-800'>
            Please Register To Keep Up To Date Your Membership Information
          </p>
        )}
      </div>
      <div className='flex flex-col justify-center items-center  '>
        <form
          onSubmit={onSubmit}
          className='flex flex-col items-center mx-3 my-3  rounded-xl'
        >
          <div className='mb-6 '>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              className='w-[12rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Email'
              required
            />
          </div>
          <div className='mb-6'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Password'
              className=' w-[12rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
          <div className='flex flex-col gap-2 items-center mb-2'>
            <button
              type='submit'
              className={
                isError
                  ? 'inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg opacity-25 cursor-not-allowed'
                  : 'inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg hover:bg-brightRed hover:border-brightRed duration-200'
              }
            >
              Submit
            </button>
            {isError && showAlert && (
              <div
                className=' bg-red-100 justify-center border border-red-400 text-red-700 px-6 py-3 rounded relative'
                role='alert'
              >
                <p className='block sm:inline'>{`${message}`}</p>
                <div className='absolute top-0 bottom-0 right-0  ml-4 py-3'>
                  <svg
                    onClick={handleClick}
                    className='fill-current h-6 w-6 text-red-500'
                    role='button'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <title>Register</title>
                    <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Success;
