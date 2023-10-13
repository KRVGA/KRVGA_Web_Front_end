import {useEffect, useContext} from 'react';
import {useSearchParams} from 'react-router-dom';
import {requestProcessMembershipPurchase} from '../../context/actions.js';
import Login from '../../components/Login.jsx';
import Register from '../../components/Register.jsx';
import Context from '../../context/Context.jsx';

const Success = () => {
  const {dispatch, guest_purchase, isError} = useContext(Context);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const {session_id} = Object.fromEntries([...searchParams]);

    const fetchMemberShipPurchase = async () => {
      const result = await requestProcessMembershipPurchase(session_id);
      dispatch({
        type: 'GUEST_PURCHASE',
        payload: result.statusResponseObject,
      });

      if (result.success) {
        console.log(result);

        localStorage.setItem(
          'guest_token',
          JSON.stringify(result.statusResponseObject.guestToken)
        );
      }
    };
    fetchMemberShipPurchase();
  }, []);

  return (
    <div className='flex flex-col items-center membership-purchase '>
      <div className='px-4 sm:px-0 text-center'>
        <h3 className='text-base font-semibold leading-7 text-gray-900'>
          {guest_purchase.full_name
            ? `Thank you ${guest_purchase.full_name}!`
            : 'Thank you!'}
        </h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
          We have emailed you a confirmation of your purchase.
        </p>

        {guest_purchase.accountAlreadyExist ? (
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-800'>
            Please Log in to Keep up to date your Information
          </p>
        ) : (
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-800'>
            Please Register To Keep Up To Date Your Membership Information
          </p>
        )}
      </div>
      <div className='mt-6 '>
        {guest_purchase.accountAlreadyExist ? (
          <Login
            accountAlreadyExist={guest_purchase.accountAlreadyExist}
            membership_purchase_id={guest_purchase.membership_purchase_id}
          />
        ) : (
          <Register
            membership_purchase_id={guest_purchase.membership_purchase_id}
            guest_purchase={true}
          />
        )}
      </div>
    </div>
  );
};

export default Success;
