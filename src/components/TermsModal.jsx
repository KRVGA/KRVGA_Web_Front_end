import {useState, useContext} from 'react';
import {Modal, Spinner} from 'flowbite-react';
import Context from '../context/Context';

const TermsModal = (props) => {
  const {isError, message, isLoading, user} = useContext(Context);
  const [purchaseData, setPurchaseData] = useState({
    user_id: user?.id ? user.id : null,
    customer_email: user?.email ? user?.email : '',
    full_name: '',
    mail_address: '',
    phone_number: '',
    city: '',
    state: '',
    zip_code: '',
    spouse_email: '',
    spouse_full_name: '',
    spouse_mail_address: '',
    spouse_city: '',
    spouse_state: '',
    spouse_zip_code: '',
    is_same_address: props.membership_type.name === 'bundle' ? true : false,
    has_signed_release: false,
    has_signed_pledge: false,
    disabled_veteran: false,
    veteran: false,
    decline: false,
    spouse_disabled_veteran: false,
    spouse_veteran: false,
    spouse_decline: false,
    crpa_member: false,
    nra_member: false,
    nra_member_number: '',
    spouse_crpa_member: false,
    spouse_nra_member: false,
    spouse_nra_member_number: '',
    life_membership_qty: 0,
    is_membership_bundle:
      props.membership_type.name === 'bundle' ? true : false,
    items:
      props.membership_type.name === 'bundle'
        ? [
            {id: 1, quantity: 1},
            {id: 2, quantity: 1},
          ]
        : [{id: 1, quantity: 1}],
  });
  const pronoun = props.membership_type.name === 'bundle' ? 'We' : 'I';

  const handleClick = () => {
    props.setShowAlert((prev) => !prev);
  };

  const {
    user_id,
    customer_email,
    full_name,
    mail_address,
    phone_number,
    city,
    state,
    zip_code,
    spouse_email,
    spouse_full_name,
    spouse_mail_address,
    spouse_city,
    spouse_state,
    spouse_zip_code,
    is_same_address,
    has_signed_release,
    has_signed_pledge,
    veteran,
    disabled_veteran,
    decline,
    spouse_disabled_veteran,
    spouse_veteran,
    spouse_decline,
    crpa_member,
    nra_member,
    nra_member_number,
    spouse_crpa_member,
    spouse_nra_member,
    spouse_nra_member_number,
    is_membership_bundle,
  } = purchaseData;

  const onChange = (e) => {
    let inputValue = e.target.value;
    if (e.target.type === 'tel' && e.target.name === 'phone_number') {
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    setPurchaseData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'has_signed_release' ||
        e.target.name === 'has_signed_pledge' ||
        e.target.name === 'disabled_veteran' ||
        e.target.name === 'veteran' ||
        e.target.name === 'decline' ||
        e.target.name === 'spouse_disabled_veteran' ||
        e.target.name === 'spouse_veteran' ||
        e.target.name === 'spouse_decline' ||
        e.target.name === 'crpa_member' ||
        e.target.name === 'nra_member' ||
        e.target.name === 'is_same_address' ||
        e.target.name === 'spouse_crpa_member' ||
        e.target.name === 'spouse_nra_member'
          ? e.target.checked
          : inputValue,
    }));
  };

  return (
    <Modal
      show={true}
      onClose={props.onClose}
    >
      <Modal.Header>Please Read and Agree</Modal.Header>
      <Modal.Body className='modal-body'>
        <div className='text-xs flex flex-col '>
          <span className='italic text-center'>
            Operating on a non-discriminatory basis with a special use permit
            from the U.S. Forest Service. Revised – 10/01/2022
          </span>
          <h3 className=' text-center mb-4 mt-4 text-xl font-medium text-gray-900 dark:text-white'>
            RELEASE AND INDEMNIFICATION AGREEMENT
          </h3>
        </div>
        <div className='space-y-4 p-2'>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            IN CONSIDERATION of {pronoun} being given permission to observe
            and/or participate in the shooting, sporting and outdoor activities
            at the Kern River Valley Gun Association, {pronoun} agree to sign
            and enter into this release and indemnification agreement.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} {pronoun === 'We' ? 'are' : 'am'} entering into this
            agreement freely, voluntarily, and specifically state that:
          </p>
          <ol className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            <li>
              1. {pronoun} {pronoun === 'We' ? 'are' : 'am'} not dazed,
              suffering from shock or under the influence of drugs or alcohol;
            </li>
            <li>
              2. {pronoun} understand that this is a full and complete release
              and indemnification agreement; and
            </li>
            <li>
              3. There has been no fraud or other conduct used in obtaining my
              signature and agreement to this document.
            </li>
          </ol>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} will comply with all rules and regulations. If {pronoun}
            have questions or observe any unusual or unnecessary hazard during
            my participation, {pronoun} will immediately bring such to the
            attention of the nearest official, and {pronoun} have read all range
            rules and will comply with completely.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} understand that the observation and/or participation in
            the shooting, sporting and outdoor activities will expose me to
            certain risks inherent to the use of firearms and related
            activities. These include, but are not limited to, personal or
            bodily injury, death and/or property damage.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} understand the range is under audio and visual
            surveillance and agree to be recorded while at the range.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} agree to assume and accept the dangers inherent in the
            observation and/or participation of the shooting, sporting and
            outdoor activities.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} represent that {pronoun} have no drug, health or mental
            problem that could or will interfere with observations and/or
            participation of the shooting, sporting and outdoor activities.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} agree that {pronoun} {pronoun === 'We' ? 'are' : 'am'}{' '}
            responsible for my own safety and the safety of any guest or child
            that {pronoun} may bring to the premises of the Kern River Valley
            Gun Association.
          </p>

          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} agree that the Kern River Valley Gun Association, its
            members, officers, directors, employees, agents, representatives,
            affiliates, subsidiaries, successors or assignees and all
            participating groups and persons officially connected with the
            activities, including but not limited to the Kern River Valley Gun
            Association, will not be liable if {pronoun}, my guest or child
            suffer any personal or bodily injury, death or property damage as a
            result of ordinary negligence.
          </p>

          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            {pronoun} further agree that in the event that the Kern River Valley
            Gun Association, its members, officers, directors, employees,
            agents, representatives, affiliates, subsidiaries, successors or
            assignees and all participating groups and persons officially
            connected with the activities, including but not limited to the Kern
            River Valley Gun Association, and become liable by way of
            contribution, indemnification, judgment, verdict, award or
            otherwise, to any other party as a result of my actions, negligence
            or injury, {pronoun} agree to indemnify and hold harmless the Kern
            River Valley Gun Association, its members, officers, directors,
            employees, agents, representatives, affiliates, subsidiaries,
            successors or assignees and all participating groups and persons
            officially connected with the activities, including but not limited
            to the Kern River Valley Gun Association, from any and all claims,
            demands, actual legal costs or other costs or expenses arising out
            of said actions, negligence, or injury, no matter who might bring
            said claim, if any be brought.
          </p>

          <form>
            <div className='flex flex-col justify-center px-4 pt-4 mb-2 border border-gray-200 rounded dark:border-gray-700'>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    type='text'
                    name='full_name'
                    id='full_name'
                    value={full_name}
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={onChange}
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='full_name'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Member Full Name
                  </label>
                </div>
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    type='email'
                    name='customer_email'
                    id='customer_email'
                    value={customer_email}
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={onChange}
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='customer_email'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Member Email
                  </label>
                </div>
              </div>
              <div className='grid md:grid-cols-3 md:gap-6'>
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    type='text'
                    name='mail_address'
                    id='mail_address'
                    value={mail_address}
                    onChange={onChange}
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='mail_address'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Mailing Address
                  </label>
                </div>
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    value={city}
                    onChange={onChange}
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='city'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    City
                  </label>
                </div>
                <div className='relative z-0 w-full mb-6 group'>
                  <span className='absolute start-0 bottom-3 text-gray-500 dark:text-gray-400'>
                    <svg
                      className='w-4 h-4 rtl:rotate-[270deg]'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 19 18'
                    >
                      <path d='M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z' />
                    </svg>
                  </span>
                  <input
                    type='tel'
                    name='phone_number'
                    id='phone_number'
                    value={phone_number ? phone_number : ''}
                    onChange={onChange}
                    className='block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    pattern='\(\d{3}\) \d{3}-\d{4}'
                    autoComplete='off'
                  />
                  <label
                    htmlFor='phone_number'
                    className='absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    type='text'
                    name='state'
                    id='state'
                    value={state}
                    onChange={onChange}
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='state'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    State
                  </label>
                </div>
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    type='text'
                    name='zip_code'
                    id='zip_code'
                    value={zip_code}
                    onChange={onChange}
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='zip_code'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Zip Code
                  </label>
                </div>
              </div>
              {props.membership_type.name === 'bundle' && (
                <>
                  <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-6 group'>
                      <input
                        type='text'
                        name='spouse_full_name'
                        id='spouse_full_name'
                        value={spouse_full_name}
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        onChange={onChange}
                        placeholder=' '
                        required
                      />
                      <label
                        htmlFor='full_name'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      >
                        Spouse Full Name
                      </label>
                    </div>
                    <div className='relative z-0 w-full mb-6 group'>
                      <input
                        type='email'
                        name='spouse_email'
                        id='spouse_email'
                        value={spouse_email}
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        onChange={onChange}
                        placeholder=' '
                        required
                      />
                      <label
                        htmlFor='customer_email'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      >
                        Spouse Email
                      </label>
                    </div>
                  </div>
                  <div className='relative z-0 w-full mb-6 group'>
                    <input
                      name='is_same_address'
                      id='is_same_address'
                      defaultChecked={is_same_address}
                      onChange={onChange}
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                    />
                    <label
                      htmlFor='is_same_address'
                      className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                    >
                      Same Address for Both Mebers
                    </label>
                  </div>

                  {!is_same_address && (
                    <>
                      <div className='grid md:grid-cols-2 md:gap-6'>
                        <div className='relative z-0 w-full mb-6 group'>
                          <input
                            type='text'
                            name='spouse_mail_address'
                            id='spouse_mail_address'
                            value={spouse_mail_address}
                            onChange={onChange}
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            required
                          />

                          <label
                            htmlFor='spouse_mail_address'
                            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Spouse Mailing Address
                          </label>
                        </div>
                        <div className='relative z-0 w-full mb-6 group'>
                          <input
                            type='text'
                            name='spouse_city'
                            id='spouse_city'
                            value={spouse_city}
                            onChange={onChange}
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            required
                          />
                          <label
                            htmlFor='spouse_city'
                            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Spouse City
                          </label>
                        </div>
                      </div>

                      <div className='grid md:grid-cols-2 md:gap-6'>
                        <div className='relative z-0 w-full mb-6 group'>
                          <input
                            type='text'
                            name='spouse_state'
                            id='spouse_state'
                            value={spouse_state}
                            onChange={onChange}
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            required
                          />

                          <label
                            htmlFor='spouse_state'
                            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Spouse State
                          </label>
                        </div>
                        <div className='relative z-0 w-full mb-6 group'>
                          <input
                            type='text'
                            name='spouse_zip_code'
                            id='spouse_zip_code'
                            value={spouse_zip_code}
                            onChange={onChange}
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            required
                          />
                          <label
                            htmlFor='spouse_zip_code'
                            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Spouse Zip Code
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className='flex flex-col justify-center pl-4 pt-4 mb-2 border border-gray-200 rounded dark:border-gray-700'>
              {props.membership_type.name === 'bundle' && (
                <h3 className='text-center'>Main Annual Member</h3>
              )}
              {
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    name='veteran'
                    id='veteran'
                    disabled={decline}
                    defaultChecked={veteran}
                    onChange={onChange}
                    type='checkbox'
                    className={
                      decline
                        ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  cursor-not-allowed'
                        : 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                    }
                  />
                  <label
                    htmlFor='veteran'
                    className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                  >
                    Veteran
                  </label>
                </div>
              }
              {veteran && (
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    name='disabled_veteran'
                    id='disabled_veteran'
                    disabled={decline}
                    defaultChecked={disabled_veteran}
                    onChange={onChange}
                    type='checkbox'
                    className={
                      decline
                        ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  cursor-not-allowed'
                        : 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                    }
                  />
                  <label
                    htmlFor='disabled_veteran'
                    className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                  >
                    Disabled Veteran
                  </label>
                </div>
              )}

              {!veteran && !disabled_veteran && (
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    name='decline'
                    id='decline'
                    disabled={veteran || disabled_veteran}
                    defaultChecked={decline}
                    onChange={onChange}
                    type='checkbox'
                    className={
                      veteran || disabled_veteran
                        ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  cursor-not-allowed'
                        : 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                    }
                  />
                  <label
                    htmlFor='decline'
                    className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                  >
                    Decline to state
                  </label>
                </div>
              )}

              <div className='relative z-0 w-full mb-6 group'>
                <input
                  name='crpa_member'
                  id='crpa_member'
                  defaultChecked={crpa_member}
                  onChange={onChange}
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                />
                <label
                  htmlFor='crpa_member'
                  className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                >
                  California Rifle and Pistol Association (CRPA) Member
                </label>
              </div>
              <div className='relative z-0 w-full mb-6 group'>
                <input
                  name='nra_member'
                  id='nra_member'
                  defaultChecked={nra_member}
                  onChange={onChange}
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                />
                <label
                  htmlFor='nra_member'
                  className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                >
                  The National Riffle Association (NRA) Member
                </label>
                {nra_member && (
                  <div>
                    <label
                      htmlFor='nra_member_number'
                      className='block mb-2 text-sm font-medium  dark:text-white  text-gray-600'
                    >
                      NRA Membership #
                    </label>
                    <input
                      type='text'
                      id='nra_member_number'
                      name='nra_member_number'
                      value={nra_member_number}
                      onChange={onChange}
                      className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                  </div>
                )}
              </div>
            </div>
            {props.membership_type.name === 'bundle' && (
              <div className='flex flex-col justify-center pl-4 pt-4 border border-gray-200 rounded dark:border-gray-700'>
                <h3 className='text-center'>Spouse Member</h3>
                {
                  <div className='relative z-0 w-full mb-6 group'>
                    <input
                      name='spouse_veteran'
                      id='spouse_veteran'
                      disabled={spouse_decline}
                      defaultChecked={spouse_veteran}
                      onChange={onChange}
                      type='checkbox'
                      className={
                        spouse_decline
                          ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  cursor-not-allowed'
                          : 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                      }
                    />
                    <label
                      htmlFor='spouse_veteran'
                      className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                    >
                      Spouse Veteran
                    </label>
                  </div>
                }
                {spouse_veteran && (
                  <div className='relative z-0 w-full mb-6 group'>
                    <input
                      name='spouse_disabled_veteran'
                      id='spouse_disabled_veteran'
                      disabled={spouse_decline}
                      defaultChecked={spouse_disabled_veteran}
                      onChange={onChange}
                      type='checkbox'
                      className={
                        spouse_decline
                          ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  cursor-not-allowed'
                          : 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                      }
                    />
                    <label
                      htmlFor='spouse_disabled_veteran'
                      className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                    >
                      Disabled Veteran
                    </label>
                  </div>
                )}

                {!spouse_veteran && !spouse_disabled_veteran && (
                  <div className='relative z-0 w-full mb-6 group'>
                    <input
                      name='spouse_decline'
                      id='spouse_decline'
                      disabled={spouse_veteran || spouse_disabled_veteran}
                      defaultChecked={spouse_decline}
                      onChange={onChange}
                      type='checkbox'
                      className={
                        spouse_veteran || spouse_disabled_veteran
                          ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  cursor-not-allowed'
                          : 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                      }
                    />
                    <label
                      htmlFor='spouse_decline'
                      className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                    >
                      Decline to state
                    </label>
                  </div>
                )}
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    name='spouse_crpa_member'
                    id='spouse_crpa_member'
                    defaultChecked={spouse_crpa_member}
                    onChange={onChange}
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                  />
                  <label
                    htmlFor='spouse_crpa_member'
                    className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                  >
                    California Rifle and Pistol Association (CRPA) Member
                  </label>
                </div>
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    name='spouse_nra_member'
                    id='spouse_nra_member'
                    defaultChecked={spouse_nra_member}
                    onChange={onChange}
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  '
                  />
                  <label
                    htmlFor='spouse_nra_member'
                    className='ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 '
                  >
                    The National Riffle Association (NRA) Member
                  </label>
                  {spouse_nra_member && (
                    <div>
                      <label
                        htmlFor='spouse_nra_member_number'
                        className='block mb-2 text-sm font-medium  dark:text-white  text-gray-600 '
                      >
                        NRA Membership #
                      </label>
                      <input
                        type='text'
                        id='spouse_nra_member_number'
                        name='spouse_nra_member_number'
                        value={spouse_nra_member_number}
                        onChange={onChange}
                        className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className=''>
              <p className='text-base text-justify mt-4 leading-relaxed text-gray-500 dark:text-gray-400'>
                <span className='text-gray-900'>Pledge:</span> {pronoun} certify
                that {pronoun} {pronoun === 'We' ? 'are' : 'am'} legally
                entitled to own and use a firearm in compliance with the laws of
                the United States of America and the State of California; that{' '}
                {pronoun}
                am not a member of any organization which has any part of its
                program that attempts to overthrow the government by force or
                violence; that {pronoun} have never been convicted of, or have
                an outstanding warrant for, a felony under the laws of the
                United States, the State of California, or any other state,
                government, or country; that {pronoun} have never been convicted
                of an offense, including certain Prohibiting Misdemeanors, or
                have an outstanding warrant for, as listed in the California
                Penal Code that prohibit owning and/or possessing firearms; that{' '}
                {pronoun} {pronoun === 'We' ? 'are' : 'am'} not an alcoholic or
                illicit drug user; and that, if I am admitted to membership,
                will fulfill the obligation of good sportsmanship and good
                citizenship, and obey all club rules.
              </p>
            </div>
            <div className='flex  items-center my-4'>
              <input
                name='has_signed_pledge'
                id='has_signed_pledge'
                defaultChecked={has_signed_pledge}
                onChange={onChange}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='has_signed_pledge'
                className='ml-2 text-sm font-medium text-justify text-gray-900 dark:text-gray-300'
              >
                BY CHECKING THIS BOX YOU E-SIGN THE PLEDGE ABOVE
              </label>
            </div>
            <div className='flex items-center mb-4'>
              <input
                name='has_signed_release'
                id='has_signed_release'
                defaultChecked={has_signed_release}
                onChange={onChange}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              ></input>
              <label
                htmlFor='has_signed_release'
                className='ml-2 text-sm font-medium text-justify text-gray-900 dark:text-gray-300'
              >
                {pronoun.toUpperCase()} HAVE READ THE FORGOING RELEASE AND
                INDEMNIFICATION AGREEMENT, AND BY CHECKING THE BOX. REPRESENT
                AND WARRANT THAT {pronoun.toUpperCase()} FULLY UNDERSTAND IT.{' '}
                <b>CAUTION! READ BEFORE SIGNING.</b>
              </label>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-center'>
        {isError && props.showAlert ? (
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
        ) : (
          <div className=' flex gap-6'>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <button
                  disabled={
                    !has_signed_release ||
                    !full_name ||
                    !customer_email ||
                    !mail_address ||
                    !city ||
                    !state ||
                    !zip_code ||
                    !has_signed_pledge ||
                    (nra_member && !nra_member_number) ||
                    (is_membership_bundle &&
                      (!spouse_full_name || !spouse_email))
                  }
                  className={
                    !has_signed_release ||
                    !full_name ||
                    !customer_email ||
                    !mail_address ||
                    !city ||
                    !state ||
                    !zip_code ||
                    !has_signed_pledge ||
                    (nra_member && !nra_member_number) ||
                    (is_membership_bundle &&
                      (!spouse_full_name || !spouse_email))
                      ? 'inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg opacity-25 cursor-not-allowed'
                      : 'inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg hover:bg-brightRed hover:border-brightRed duration-200'
                  }
                  onClick={() => {
                    props.action(purchaseData);
                  }}
                >
                  Proceed
                </button>
                <button
                  className='inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg hover:bg-brightRed hover:border-brightRed duration-200'
                  onClick={props.onClose}
                >
                  Back
                </button>
              </>
            )}
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal;
