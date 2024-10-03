import {useState, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Spinner} from 'flowbite-react';
import Context from '../context/Context';
import {updatePassword} from '../context/actions';
const ChangePwd = () => {
  const {tokenString} = useParams();
  const navigate = useNavigate();
  const {isError, message, isLoading, dispatch} = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [userData, setUserData] = useState({
    new_password: '',
    repeat_new_pwd: '',
  });

  const {new_password, repeat_new_pwd} = userData;
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: 'LOADING'});
    const userDataObject = {
      new_password,
      repeat_new_pwd,
      tokenString,
    };
    try {
      if (new_password !== repeat_new_pwd) {
        dispatch({
          type: 'ERROR',
          payload: `New passwords don't match.`,
        });
        setShowAlert(true);
        return;
      }
      const result = await updatePassword(userDataObject);
      if (!result.success) {
        dispatch({
          type: 'ERROR',
          payload: result.message,
        });
        setShowAlert(true);
      }
      if (result.success) {
        dispatch({
          type: 'UPDATE_SUCCESS',
          payload: result.message,
        });
        setTimeout(() => {
          dispatch({type: 'RESET'});
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    setShowAlert((prev) => !prev);
    dispatch({
      type: 'RESET',
    });
  };
  return (
    <div className='flex flex-col justify-center items-center membership-purchase '>
      <section className=' rounded overflow-hidden bg-veryLightGray shadow-2xl '>
        <h2 className='text-base text-center mt-4 font-semibold leading-7 text-gray-900'>
          Password Change
        </h2>
        <form
          onSubmit={onSubmit}
          className='flex flex-col items-center mx-8 my-4 rounded-xl'
        >
          <div className='mb-6'>
            <input
              type='password'
              id='new_password'
              name='new_password'
              value={new_password}
              onChange={onChange}
              placeholder='New Password'
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-6'>
            <input
              type='password'
              id='repeat_new_pwd'
              name='repeat_new_pwd'
              value={repeat_new_pwd}
              onChange={onChange}
              placeholder='Repeat New Password'
              className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
          <div className='flex flex-col gap-2 items-center mb-2'>
            <button
              type='submit'
              disabled={isError && showAlert}
              className={
                isError
                  ? 'inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg opacity-25 cursor-not-allowed'
                  : 'inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg hover:bg-brightRed hover:border-brightRed duration-200'
              }
            >
              {isLoading ? (
                <>
                  <Spinner
                    aria-label='Loading...'
                    size='sm'
                  />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                <span> Submit </span>
              )}
            </button>
            {!isError && message && (
              <p className='block sm:inline p-2 text-red-500'>{message} </p>
            )}
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
                    <title>Close</title>
                    <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default ChangePwd;
