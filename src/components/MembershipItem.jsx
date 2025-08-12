import {useState, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {capitalizeWord} from '../utils/utils';
import Context from '../context/Context';
import {Link} from 'react-router-dom';
import {
  getSingleMembershipInfo,
  updateMembershipInfo,
} from '../context/actions';
import {getMembershipType} from '../utils/utils';
import {dateToString} from '../utils/utils';

const MembershipItem = () => {
  const {user, dispatch, isError, message} = useContext(Context);
  const {membershipId} = useParams();
  const [showAlert, setShowAlert] = useState(false);

  const [updatedInfo, setUpdatedInfo] = useState({
    full_name: '',
    address: '',
    phone_number: '',
    city: '',
    state: '',
    zip_code: '',
    spouse_address: '',
    spouse_phone_number: '',
    spouse_city: '',
    spouse_state: '',
    spouse_zip_code: '',
    is_same_address: false,
    created_on: '',
    nra_member: false,
    spouse_nra_member: false,
    nra_member_number: '',
    spouse_nra_member_number: '',
  });

  const {
    full_name,
    address,
    phone_number,
    city,
    state,
    zip_code,
    spouse_address,
    spouse_phone_number,
    spouse_city,
    spouse_state,
    spouse_zip_code,
    is_same_address,
    created_on,
    nra_member,
    spouse_nra_member,
    nra_member_number,
    spouse_nra_member_number,
  } = updatedInfo;
  const [editInfo, setEditInfo] = useState(false);

  useEffect(() => {
    const getMembership = async () => {
      const result = await getSingleMembershipInfo(user.ut, membershipId);
      dispatch({type: 'LOADING'});
      if (result.success) {
        setUpdatedInfo(result.user.membership_info);
        dispatch({type: 'RESET_ALERTS'});
      }
      if (!result.success) {
        dispatch({
          type: 'ERROR',
          payload: result.message,
        });
        setShowAlert(true);
      }
    };
    getMembership();
  }, []);

  const onChange = (e) => {
    let inputValue = e.target.value;
    if (
      e.target.type === 'tel' &&
      (e.target.name === 'phone_number' ||
        e.target.name === 'spouse_phone_number')
    ) {
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    setUpdatedInfo((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'is_same_address' ? e.target.checked : inputValue,
    }));
  };
  const HandleOnCLick = () => {
    setEditInfo((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updatedInfo.is_same_address) {
      updatedInfo.spouse_address = address;
      updatedInfo.spouse_city = city;
      updatedInfo.spouse_state = state;
      updatedInfo.spouse_zip_code = zip_code;
    }

    if (nra_member_number.length > 0) {
      updatedInfo.nra_member = true;
    } else {
      updatedInfo.nra_member = false;
    }
    if (spouse_nra_member_number.length > 0) {
      updatedInfo.spouse_nra_member = true;
    } else {
      updatedInfo.spouse_nra_member = false;
    }
    dispatch({type: 'LOADING'});
    const result = await updateMembershipInfo(user.ut, updatedInfo);
    if (result?.success) {
      dispatch({type: 'UPDATE_SUCCESS', payload: result});
    } else {
      dispatch({
        type: 'ERROR',
        payload: result.message,
      });
      setShowAlert(true);
    }
  };
  const handleClick = () => {
    setShowAlert((prev) => !prev);
    dispatch({
      type: 'RESET_ALERTS',
    });
  };

  return (
    <div className='md:h-full'>
      <div className='flex items-center justify-around border mb-2  '>
        {isError && showAlert ? (
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
        ) : (
          <>
            <Link
              type='button'
              to='/profile'
              className='px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Go Back
            </Link>
            {message ? (
              <p className='text-2xl p-2 text-blue-600'>{message} </p>
            ) : (
              <p className='text-2xl p-2 text-gray-800 dark:text-gray-500'>
                Personal Info
              </p>
            )}
          </>
        )}
      </div>
      <div className=' p-4 border border-gray-200 rounded dark:border-gray-700'>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            value={editInfo}
            id='editInfo'
            name='editInfo'
            className='sr-only peer'
            onChange={HandleOnCLick}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Edit Info
          </span>
        </label>
        <form onSubmit={handleSubmit}>
          <p>
            {full_name ? 
              `${capitalizeWord(full_name)} - ${getMembershipType(
                updatedInfo
              )}  ` : 'N/A'}{' '}
          </p>
          <p className='mb-4'>{`Purchased on: ${dateToString(created_on)}`}</p>
          <div className='grid gap-2 mb-2 md:grid-cols-3'>
            <div className='relative z-0 w-full group'>
              <label
                htmlFor='address'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Mailing Address
              </label>
              <input
                type='text'
                name='address'
                id='address'
                value={address}
                disabled={editInfo ? false : true}
                onChange={onChange}
                autoComplete='off'
                required
                className={
                  editInfo
                    ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                }
              />
            </div>
            <div className='relative z-0 w-full group'>
              <label
                htmlFor='city'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                City
              </label>
              <input
                type='text'
                name='city'
                id='city'
                value={city}
                disabled={editInfo ? false : true}
                required
                onChange={onChange}
                autoComplete='off'
                className={
                  editInfo
                    ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                }
              />
            </div>
            <div className='relative z-0 w-full group'>
              <label
                htmlFor='state'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                State
              </label>
              <input
                type='text'
                name='state'
                id='state'
                value={state}
                disabled={editInfo ? false : true}
                required
                onChange={onChange}
                autoComplete='off'
                className={
                  editInfo
                    ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                }
              />
            </div>
          </div>
          <div className='grid gap-2 mb-2 md:grid-cols-3'>
            <div className='relative z-0 w-full  group'>
              <label
                htmlFor='zip_code'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Zip Code
              </label>
              <input
                type='text'
                name='zip_code'
                id='zip_code'
                value={zip_code}
                disabled={editInfo ? false : true}
                onChange={onChange}
                autoComplete='off'
                required
                className={
                  editInfo
                    ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                }
              />
            </div>
            <div className='relative z-0 w-full group'>
              <label
                htmlFor='phone_number'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Phone number
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 19 18'
                  >
                    <path d='M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z' />
                  </svg>
                </div>
                <input
                  type='tel'
                  name='phone_number'
                  id='phone_number'
                  value={phone_number ? phone_number : ''}
                  disabled={editInfo ? false : true}
                  onChange={onChange}
                  pattern='\(\d{3}\) \d{3}-\d{4}'
                  placeholder='Format (123) 456-7890'
                  autoComplete='off'
                  className={
                    editInfo
                      ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  }
                  required
                />
              </div>
            </div>
            <div className='relative z-0 w-full  group'>
              <label
                htmlFor='nra_member_number'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                NRA Member Number
              </label>
              <input
                type='text'
                name='nra_member_number'
                id='nra_member_number'
                value={nra_member_number}
                disabled={editInfo ? false : true}
                onChange={onChange}
                autoComplete='off'
                className={
                  editInfo
                    ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                }
              />
            </div>
          </div>
          {updatedInfo.is_membership_bundle &&
            updatedInfo.spouse_membership_qty > 0 && (
              <div className='mt-4 '>
                <p>Spouse Member Address</p>
                <div className='grid gap-2 mb-2 md:grid-cols-3'>
                  <div className='relative z-0 w-full group'>
                    <label
                      htmlFor='spouse_address'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Spouse Mailing Address
                    </label>
                    <input
                      type='text'
                      name='spouse_address'
                      id='spouse_address'
                      required
                      disabled={editInfo ? false : true}
                      value={spouse_address}
                      autoComplete='off'
                      onChange={onChange}
                      className={
                        editInfo
                          ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      }
                    />
                  </div>
                  <div className='relative z-0 w-full group'>
                    <label
                      htmlFor='spouse_city'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Spouse City
                    </label>
                    <input
                      type='text'
                      name='spouse_city'
                      id='spouse_city'
                      required
                      value={spouse_city}
                      disabled={editInfo ? false : true}
                      autoComplete='off'
                      onChange={onChange}
                      className={
                        editInfo
                          ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      }
                    />
                  </div>
                  <div className='relative z-0 w-full group'>
                    <label
                      htmlFor='spouse_state'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Spouse State
                    </label>
                    <input
                      type='text'
                      name='spouse_state'
                      id='spouse_state'
                      required
                      disabled={editInfo ? false : true}
                      value={spouse_state}
                      autoComplete='off'
                      onChange={onChange}
                      className={
                        editInfo
                          ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      }
                    />
                  </div>
                </div>
                <div className='grid gap-2 mb-2 md:grid-cols-3'>
                  <div className='relative z-0 w-full group'>
                    <label
                      htmlFor='spouse_zip_code'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Spouse Zip Code
                    </label>
                    <input
                      type='text'
                      name='spouse_zip_code'
                      required
                      id='spouse_zip_code'
                      value={spouse_zip_code}
                      disabled={editInfo ? false : true}
                      autoComplete='off'
                      onChange={onChange}
                      className={
                        editInfo
                          ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      }
                    />
                  </div>

                  <div className='relative z-0 w-full group'>
                    <label
                      htmlFor='spouse_phone_number'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Spouse Phone Number
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
                        <svg
                          className='w-4 h-4 text-gray-500 dark:text-gray-400'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 19 18'
                        >
                          <path d='M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z' />
                        </svg>
                      </div>
                      <input
                        type='tel'
                        name='spouse_phone_number'
                        id='spouse_phone_number'
                        value={spouse_phone_number ? spouse_phone_number : ''}
                        disabled={editInfo ? false : true}
                        onChange={onChange}
                        pattern='\(\d{3}\) \d{3}-\d{4}'
                        placeholder='Format (123) 456-7890'
                        autoComplete='off'
                        className={
                          editInfo
                            ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className='relative z-0 w-full  group'>
                    <label
                      htmlFor='spouse_nra_member_number'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      NRA Member Number
                    </label>
                    <input
                      type='text'
                      name='spouse_nra_member_number'
                      id='spouse_nra_member_number'
                      value={spouse_nra_member_number}
                      disabled={editInfo ? false : true}
                      onChange={onChange}
                      autoComplete='off'
                      className={
                        editInfo
                          ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          : 'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          {editInfo && (
            <button
              type='submit'
              disabled={
                !editInfo ||
                address.length < 1 ||
                city.length < 1 ||
                state.length < 1 ||
                zip_code.length < 1
              }
              className={
                address.length > 0 &&
                city.length > 0 &&
                state.length > 0 &&
                zip_code.length > 0
                  ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  : 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled'
              }
            >
              Submit Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MembershipItem;
