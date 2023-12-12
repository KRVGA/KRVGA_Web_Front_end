import {useContext, useEffect, useState} from 'react';
import Context from '../context/Context';
import {getCsvReport, getUserProfileInfo} from '../context/actions';
import {exportToCSV} from '../utils/utils';
import {Spinner} from 'flowbite-react';
import {dateToString, capitalizeWord, getMembershipType} from '../utils/utils';
import {Link} from 'react-router-dom';
import LifeMemberUpdate from '../components/LifeMemberUpdate';

const Profile = () => {
  const {user, dispatch, isLoading, isError, message} = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [userMembershps, setUserMemberships] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      dispatch({type: 'LOADING'});
      const result = await getUserProfileInfo(user.ut);

      if (result.success) {
        setUserMemberships(result.user.membership_info);
        dispatch({type: 'USER_PROFILE', payload: result.user});
      }
      if (!result.success) {
        dispatch({
          type: 'ERROR',
          payload:
            result.message === undefined ||
            result.message === null ||
            !result.message
              ? 'Something went wrong.'
              : 'Something went wrong.',
        });
        setShowAlert(true);
      }
    };
    getUserInfo();
  }, [user.ut, dispatch]);

  useEffect(() => {
    if (user.life_member_update === false) {
      setUserMemberships(user.membership_info);
    }
  }, [user.life_member_update, user.membership_info]);

  const handleClick = () => {
    setShowAlert((prev) => !prev);
    dispatch({
      type: 'RESET_ALERTS',
    });
  };

  const handleRenew = (item) => {
    console.log('clicked', item);
  };

  const handleReportCLick = async () => {
    const response = await getCsvReport(user.ut);
    if (!response.success) {
      dispatch({
        type: 'ERROR',
        payload: response.message ? response.message : 'Something Went Wrong.',
      });
      setShowAlert(true);
    } else {
      exportToCSV(response.report, 'mebership report');
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-height  membership-purchase h-full'>
        <Spinner
          size='xl'
          color='failure'
        />
      </div>
    );
  }

  if (isError && showAlert) {
    return (
      <div className='p-2 h-full'>
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
      </div>
    );
  }

  if (user?.life_member_update && !isError) {
    return (
      <>
        <div className='p-2 h-full'>
          <div className='p-2 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700'>
            <div className='grid grid-cols-1 mb-4'>
              <div className='flex items-center justify-center  rounded dark:bg-gray-800'>
                <div className='flex flex-col gap-2 sm:flex-row'>
                  <span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                    {user?.email && capitalizeWord(user.email)}
                  </span>
                  {(user?.admn || user?.superadmn) && (
                    <>
                      <span className='bg-blue-100 text-blue-800 text-center text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        Administrator
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <LifeMemberUpdate
            setShowAlert={setShowAlert}
            showAlert={showAlert}
            handleClick={handleClick}
          />
        </div>
      </>
    );
  }

  return (
    <div className='p-2 h-full'>
      <div className='p-2 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700'>
        <>
          <div className='grid grid-cols-1 mb-4'>
            <div className='flex items-center justify-center  rounded dark:bg-gray-800'>
              <div className='flex flex-col gap-2 sm:flex-row'>
                <span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                  {user?.email && capitalizeWord(user.email)}
                </span>
              </div>
              {(user?.admn || user?.superadmn) && (
                <>
                  <span className='bg-blue-100 text-blue-800 text-center text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                    Administrator
                  </span>
                  <button
                    type='button'
                    onClick={handleReportCLick}
                    className='px-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
                      <span> Get Report </span>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
          <div>
            {
              /* Users with no membership  */
              !userMembershps[0]?.annual_membership_qty &&
              !userMembershps[0]?.life_membership_qty &&
              !user?.life_member_update ? (
                <div className='flex flex-col'>
                  <p className='text-center'>
                    If you have a life membership please come back later to
                    finish your membership application.
                  </p>
                  <p className='text-2xl text-center p-2 text-gray-800 dark:text-gray-500'>
                    Otherwise purchase a new{' '}
                    <Link
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      to='/membership_purchase'
                    >
                      Membersip
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                  <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th
                          scope='col'
                          className=' px-6 py-3'
                        >
                          Membership Type
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 '
                        >
                          Renewal Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 '
                        >
                          <span className='sr-only'>Details</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.membership_info?.map((item) => {
                        return (
                          <tr
                            key={item.membership_purchase_id}
                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                          >
                            <th
                              scope='row'
                              className='px-4 py-4 text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white '
                            >
                              {getMembershipType(item)}
                            </th>
                            <td className='px-4 py-4 '>
                              {new Date(item.renewal_date).getTime() >
                              Date.now() ? (
                                <button
                                  onClick={() => handleRenew(item)}
                                  className='px-3 py-2 text-xs text-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg '
                                >
                                  Renew
                                </button>
                              ) : (
                                dateToString(item.renewal_date)
                              )}
                            </td>
                            <td className='px-4 py-4 '>
                              <Link
                                to={`/details/${item.membership_purchase_id}`}
                                className=' text-xs font-medium text-blue-600 dark:text-blue-500 hover:underline'
                              >
                                Edit + Details
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
        </>
      </div>
    </div>
  );
};

export default Profile;
