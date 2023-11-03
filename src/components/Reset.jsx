import {useState, useContext} from 'react';
import Context from '../context/Context';
import {Spinner} from 'flowbite-react';
import {resetPwd} from '../context/actions';

const Reset = () => {
  const {isError, message, dispatch, isLoading} = useContext(Context);
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: 'LOADING'});
    try {
      const result = await resetPwd(email);

      if (!result.success) {
        dispatch({
          type: 'ERROR',
          payload: result.message,
        });
        setShowAlert(true);
      }
      if (result.success) {
        setEmail('');
        dispatch({
          type: 'RESET',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    setShowAlert((prev) => !prev);
    dispatch({
      type: 'RESET',
    });
  };
  return (
    <div className='flex flex-col justify-center items-center membership-purchase '>
      <section className='max-w-sm rounded overflow-hidden bg-veryLightGray shadow-2xl '>
        <section className='flex flex-col'>
          <h2 className='text-base text-center mt-4 font-semibold leading-7 text-gray-900'>
            Reset Password
          </h2>
          <span className='mt-1 mx-4 text-center text-sm leading-6 text-gray-600'>
            Enter your email address and we will send you a reset link.
          </span>
        </section>
        <form
          onSubmit={onSubmit}
          className='flex flex-col items-center mx-3 my-4  rounded-xl'
        >
          <div className='mb-6 '>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              className='w-[12rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Email'
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
                <span> Reset Password </span>
              )}
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

export default Reset;
