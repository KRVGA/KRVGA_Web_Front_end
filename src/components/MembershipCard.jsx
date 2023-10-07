import {useState, useCallback} from 'react';
import TermsModal from '../components/TermsModal.jsx';

const MembershipCard = ({membership_type, setMembershipSelected}) => {
  const [openModal, setOpenModal] = useState(null);

  const handleCLick = (membership_selected) => {
    setMembershipSelected(membership_selected);
    showTermsConfirm();
  };

  const showTermsConfirm = useCallback(() => {
    setOpenModal({
      async action(purchaseData) {
        const isSuccess = await purchaseMembership(purchaseData);
      },
      onClose() {
        setOpenModal(null);
      },
    });
  }, [setOpenModal, membership_type]);

  const purchaseMembership = async (purchaseData) => {};

  return (
    <div className=' texte-center '>
      {`${membership_type.name} membership`.toUpperCase()}

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
          action={openModal.action}
          onClose={openModal.onClose}
          membership_type={membership_type}
        />
      )}
    </div>
  );
};

export default MembershipCard;
