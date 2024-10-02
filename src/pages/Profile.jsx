import {useContext, useEffect, useState, useCallback} from 'react';
import Context from '../context/Context';
import {getUserProfileInfo} from '../context/actions';
import {Spinner} from 'flowbite-react';
import {dateToString, capitalizeWord, getMembershipType} from '../utils/utils';
import {Link} from 'react-router-dom';
import LifeMemberUpdate from '../components/LifeMemberUpdate';
import TermsModal from '../components/TermsModal';
import {requestPurchaseMembership} from '../context/actions';

const Profile = () => {
  const {user, dispatch, isLoading, isError, message} = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [membership_type, setMembershipType] = useState({name: ''});
  const [userMembershps, setUserMemberships] = useState({});

  const currentDate = new Date();
  const lastDayOfSeptember = new Date(currentDate.getFullYear(), 8, 30);
  const lastDayOfDecember = new Date(currentDate.getFullYear(), 12);

  const renewalDue =
    new Date(user?.membership_info?.expiration_date).getTime() >
    lastDayOfDecember.getTime();

  const earlyRenew = currentDate.getTime() > lastDayOfSeptember.getTime();

  useEffect(() => {
    const getUserInfo = async () => {
      dispatch({type: 'LOADING'});
      const result = await getUserProfileInfo(user.ut);
      setUserMemberships({
        annual_membership_qty:
          result.user.membership_info.annual_membership_qty,
        life_membership_qty: result.user.membership_info.life_membership_qty,
      });
      if (result.success) {
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

  const handleClick = () => {
    setShowAlert((prev) => !prev);
    dispatch({
      type: 'RESET_ALERTS',
    });
  };

  const showTermsConfirm = useCallback(
    (membership) => {
      if (membership.is_membership_bundle) {
        setMembershipType({name: 'bundle'});
      }

      setOpenModal({
        async action(purchaseData) {
          if (
            purchaseData.is_membership_bundle &&
            purchaseData.is_same_address
          ) {
            purchaseData.spouse_mail_address = purchaseData.mail_address;
            purchaseData.spouse_city = purchaseData.city;
            purchaseData.spouse_state = purchaseData.state;
            purchaseData.spouse_zip_code = purchaseData.zip_code;
          }
          dispatch({type: 'LOADING'});
          const result = await requestPurchaseMembership(purchaseData);

          if (result?.success) {
            setOpenModal(null);
            dispatch({type: 'RESET'});
            setShowAlert(false);

            window.location.replace(`${result.url}`);
          } else {
            dispatch({
              type: 'ERROR',
              payload: 'Something Went Wrong, Try Again.',
            });
            setShowAlert(true);
          }
        },
        onClose() {
          setOpenModal(null);
          dispatch({type: 'RESET_ALERTS'});
        },
      });
    },
    [setOpenModal, dispatch]
  );

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
                </>
              )}
            </div>
          </div>
          <div>
            {
              /* Users with no membership  */
              userMembershps?.annual_membership_qty < 1 &&
              userMembershps?.life_membership_qty < 1 &&
              !user.life_member_update ? (
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
                  <table className='w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th
                          scope='col'
                          className='px-1 py-3 '
                        >
                          Type
                        </th>
                        <th
                          scope='col'
                          className='px-1 py-3 '
                        >
                          Expiration
                        </th>
                        <th
                          scope='col'
                          className='px-1 py-3 '
                        >
                          <span className='sr-only'>Details </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td
                          scope='row'
                          className='flex flex-col px-2 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white '
                        >
                          {user?.membership_info &&
                            getMembershipType(user.membership_info)}
                        </td>
                        <td
                          scope='row'
                          className=' text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white '
                        >
                          {user?.membership_info &&
                            dateToString(user.membership_info.expiration_date)}
                        </td>
                        <td>
                          {(earlyRenew && !renewalDue) ||
                          (!earlyRenew && renewalDue) ? (
                            <button
                              onClick={() => {
                                if (
                                  user.membership_info.life_membership_qty === 1
                                ) {
                                  dispatch({
                                    type: 'RENEW_LIFE_MEMBERSHIP',
                                    payload: true,
                                  });
                                } else {
                                  showTermsConfirm(user.membership_info);
                                }
                              }}
                              className='px-2 py-2 text-xs text-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg '
                            >
                              {currentDate > lastDayOfSeptember
                                ? 'Early Renew'
                                : 'Renew'}
                            </button>
                          ) : (
                            <Link
                              to={
                                (earlyRenew && !renewalDue) ||
                                (!earlyRenew && renewalDue)
                                  ? '#'
                                  : `/details/${user.membership_info.membership_purchase_id}`
                              }
                              className={
                                (earlyRenew && !renewalDue) ||
                                (!earlyRenew && renewalDue)
                                  ? ' text-xs disabled cursor-not-allowed'
                                  : ' text-xs font-medium text-blue-600 dark:text-blue-500 hover:underline'
                              }
                            >
                              Edit + Details
                            </Link>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
        </>
      </div>
      {openModal && (
        <TermsModal
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          action={openModal.action}
          onClose={openModal.onClose}
          membership_type={membership_type}
        />
      )}
    </div>
  );
};

export default Profile;
