import {useEffect, useState} from 'react';

const MemberPurchase = () => {
  const [membershipTypes, setMebershipTyes] = useState([]);

  useEffect(() => {
    const fetchMembershipTypes = async () => {
      const response = await fetch(
        'https://krvga-7efc9d7c87af.herokuapp.com/api/membership-purchase/types'
      );
      const result = await response.json();
      setMebershipTyes(result.result);
    };
    fetchMembershipTypes();
  }, []);

  return (
    <div>
      {membershipTypes.map((item) => (
        <p key={item.membership_id}>{item.name}</p>
      ))}
    </div>
  );
};

export default MemberPurchase;
