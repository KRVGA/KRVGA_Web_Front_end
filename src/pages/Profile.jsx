import {useContext, useEffect, useState} from 'react';
import Context from '../context/Context';
import {getUserProfileInfo} from '../context/actions';
import {Spinner} from 'flowbite-react';
const Profile = () => {
  const {user, dispatch, isLoading, isError, message} = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      dispatch({type: 'LOADING'});
      const result = await getUserProfileInfo(user.ut);
      if (result.success) {
        dispatch({type: 'USER_PROFILE', payload: result.user});
      }
      if (!result.success) {
        dispatch({
          type: 'ERROR',
          payload: result.message,
        });
        setShowAlert(true);
      }
    };
    getUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-height  membership-purchase'>
        <Spinner
          size='xl'
          color='failure'
        />
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-height  membership-purchase'>
      <div className='flex flex-col my-6 space-y-4 md:space-y-0 md:space-x-6 md:flex-row md:my-0'>
        {isError && showAlert ? (
          <div
            className=' bg-red-100 justify-center border border-red-400 text-red-700 px-6 py-3 rounded relative'
            role='alert'
          >
            <p className='block sm:inline'>{`${message}`}</p>
            <div className='absolute top-0 bottom-0 right-0  ml-4 py-3'>
              <svg
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
        ) : (
          <div
            className='flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3'
            role='alert'
          >
            <svg
              className='fill-current w-4 h-4 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z' />
            </svg>
            <p>{`Welcome ${
              user?.email ? user.email : ''
            } this section is under construction.`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
