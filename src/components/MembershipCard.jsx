const MembershipCard = ({membership_type, setMembershipSelected}) => {
  const handleCLick = (membership_selected) => {
    setMembershipSelected(membership_selected);
  };
  return (
    <div className=' texte-center '>
      {`${membership_type.name} membership`.toUpperCase()}

      <h3 className='mt-2 text-center'>
        {`$${(membership_type.price / 100).toFixed(2)} / Year`}
      </h3>
      <div className='flex justify-center'>
        <a
          href='#'
          className='inline-block px-10 py-3 my-6 text-center border border-brightRedLight rounded-lg hover:bg-brightRed hover:border-brightRed duration-200'
          onClick={() => {
            handleCLick(membership_type);
          }}
        >
          Purchase{' '}
        </a>
      </div>
    </div>
  );
};

export default MembershipCard;
