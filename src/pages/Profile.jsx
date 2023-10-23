import {useContext, useEffect} from 'react';
import Context from '../context/Context';
import {getUserProfileInfo} from '../context/actions';
const Profile = () => {
  const {user, dispatch} = useContext(Context);
  useEffect(() => {
    const getUserInfo = async () => {
      dispatch({type: 'LOADING'});
      const result = await getUserProfileInfo(user.ut);
    };
    getUserInfo();
  }, []);
  return <div>Profile</div>;
};

export default Profile;

//Test same user buying two memberships
