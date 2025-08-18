import {useState, useCallback, useContext} from 'react';
import TermsModal from '../components/TermsModal.jsx';
import {requestPurchaseMembership} from '../context/actions.js';
import Context from '../context/Context.jsx';

const MembershipCard = ({membership_type, setMembershipSelected}) => {
  const {dispatch} = useContext(Context);
  const [openModal, setOpenModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleCLick = (membership_selected) => {
    setMembershipSelected(membership_selected);
    showTermsConfirm();
  };

  const showTermsConfirm = useCallback(() => {
    setOpenModal({
      async action(purchaseData) {
        try {
          if (
            purchaseData.is_membership_bundle &&
            purchaseData.is_same_address
          ) {
            purchaseData.spouse_mail_address = purchaseData.mail_address;
            purchaseData.spouse_city = purchaseData.city;
            purchaseData.spouse_state = purchaseData.state;
            purchaseData.spouse_zip_code = purchaseData.zip_code;
          }
          dispatch({type: "LOADING"});
          const result = await requestPurchaseMembership(purchaseData);

          if (result?.success) {
            setOpenModal(null);
            dispatch({type: "RESET"});
            setShowAlert(false);

            window.location.replace(`${result.url}`);
          } 
            dispatch({
              type: "ERROR",
              payload:
                result?.message ||
                result?.error ||
                "Something Went Wrong, Try Again.",
            });
            setShowAlert(true);
          
        } catch (err) {
          // Network or thrown errors from the action
          const serverMsg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Something went wrong. Please try again.";
          dispatch({type: "ERROR", payload: serverMsg});
          setShowAlert(true); // modal stays open
        }
      },
      onClose() {
        setOpenModal(null);
        dispatch({type: 'RESET_ALERTS'});
      },
    });
  }, [setOpenModal, dispatch]);

  return (
    <div className=' texte-center '>
      {membership_type.name === 'bundle'
        ? `${membership_type.name.toUpperCase()} ME & SPOUSE`
        : `ONE PERSON ${membership_type.name.toUpperCase()}`}
      <h3 className='mt-2 text-center'>
        {`$${(membership_type.price / 100).toFixed(2)} / Year`}
      </h3>

      <div className='flex justify-center'>
        <button
          className='inline-block px-10 py-3 my-6 text-center border border-brightRedLight rounded-lg hover:bg-brightRed hover:border-brightRed duration-200'
          onClick={() => {
            handleCLick(membership_type);
          }}
        >
          Purchase{' '}
        </button>
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

export default MembershipCard;
