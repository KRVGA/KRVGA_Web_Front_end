import {useEffect, useContext, useState} from 'react';
import {fetchMembershipTypes} from '../../context/actions.js';
import MembershipCard from '../../components/MembershipCard';
import Context from '../../context/Context';
import {Spinner} from 'flowbite-react';

const MemberPurchase = () => {
  const {dispatch, membership_types, isError, message, isLoading} =
    useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [membershipSelected, setMembershipSelected] = useState({
    membership_id: 0,
    name: '',
    price: 0,
  });

  useEffect(() => {
    const setMembershipTypes = async () => {
      dispatch({type: 'LOADING'});
      const result = await fetchMembershipTypes();

      if (result?.success) {
        dispatch({type: 'GET_MEMB_TYPES', payload: result.membership_types});
        setShowAlert(false);
      } else {
        dispatch({
          type: 'ERROR',
          payload: 'Something Went Wrong, Come Back Later.',
        });
        setShowAlert(true);
      }
    };
    setMembershipTypes();
  }, [dispatch]);

  return (
    <div className=' text-center mb-40 px-10 pt-16 membership-purchase'>
      {isError && showAlert ? (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          <span className='block sm:inline'>{`${message}`}</span>
        </div>
      ) : (
        <div className='flex flex-col'>
          <h3 className='block  text-lg font-semibold leading-snug tracking-normal text-inherit antialiased mb-6'>
            You must be legally entitled to possess and use a firearm and at
            least 18 years of age on the date you apply.
          </h3>
          {isLoading ? (
            <Spinner
              size='xl'
              color='failure'
            />
          ) : (
            <div className='flex items-center justify-center min-h-height'>
              <div className='flex flex-col my-6 space-y-4 md:space-y-0 md:space-x-6 md:flex-row md:my-0'>
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
                <div
                  className={`${
                    membershipSelected.name === 'paper'
                      ? 'bg-brightRedLight rounded-xl text-white'
                      : 'bg-slate-700 rounded-xl text-white'
                  } `}
                >
                  <div className='p-8 mx-3 my-3 rounded-xl bg-veryDarkBlue'>
                    <div className=' texte-center '>
                      PAPER APPLICATION
                      <h3 className='mt-2 text-center'>Regular / Spouse</h3>
                      <div className='flex justify-center'>
                        <a
                          href='https://krvga-7efc9d7c87af.herokuapp.com/api/download/2023Application.docx.pdf'
                          rel='noopener noreferrer'
                          target='_blank'
                          className='inline-block px-10 py-3 my-6 text-center border border-brightRedLight rounded-lg hover:bg-brightRed hover:border-brightRed duration-200'
                        >
                          Download{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberPurchase;
