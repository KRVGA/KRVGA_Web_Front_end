import {useEffect, useContext, useState} from 'react';
import {fetchMembershipTypes} from '../../context/actions.js';
import MembershipCard from '../../components/MembershipCard';
import Context from '../../context/Context';

const MemberPurchase = () => {
  const {dispatch, membership_types, isError, message} = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [membershipSelected, setMembershipSelected] = useState({
    membership_id: 0,
    name: '',
    price: 0,
  });

  useEffect(() => {
    const setMembershipTypes = async () => {
      const result = await fetchMembershipTypes();

      if (result?.success) {
        dispatch({type: 'GET_MEMB_TYPES', payload: result.membership_types});
        setShowAlert(false);
      } else {
        dispatch({type: 'ERROR', payload: 'Something Went Wrong.'});
        setShowAlert(true);
      }
    };
    setMembershipTypes();
  }, [dispatch]);

  const handleClick = () => {
    setShowAlert((prev) => !prev);
  };

  return (
    <div className=' text-center mb-40 px-10 pt-16 membership-purchase'>
      {isError && showAlert ? (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          <span className='block sm:inline'>{`${message}`}</span>

          <span className='absolute top-0 bottom-0 right-0  px-4 py-3'>
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
          </span>
        </div>
      ) : (
        <div className='flex flex-col '>
          <h3 className='block  text-lg font-semibold leading-snug tracking-normal text-inherit antialiased mb-6'>
            You must be legally entitled to possess and use a firearm and at
            least 18 years of age on the date you apply.
          </h3>
          <div className='flex items-center justify-center min-h-height'>
            <div className='flex flex-col my-6 space-y-6 md:space-y-0 md:space-x-6 md:flex-row md:my-0'>
              {membership_types.map((item) => (
                <div
                  key={item.membership_id}
                  className={`${
                    membershipSelected.membership_id === item.membership_id
                      ? 'bg-brightRedLight rounded-xl text-white'
                      : 'bg-slate-700 rounded-xl text-white'
                  } `}
                >
                  <div className='p-8 mx-3 my-3 rounded-xl bg-veryDarkBlue'>
                    <MembershipCard
                      membership_type={item}
                      setMembershipSelected={setMembershipSelected}
                      membershipSelected={membershipSelected}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPurchase;
