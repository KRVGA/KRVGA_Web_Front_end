import {useState} from 'react';
import {Modal} from 'flowbite-react';

const TermsModal = (props) => {
  const [purchaseData, setPurchaseData] = useState({
    customer_email: '',
    full_name: '',
    mail_address: '',
    city: '',
    state: '',
    zip: '',
    has_signed_release: false,
    has_signed_pledge: false,
    disabled_veteran: false,
    veteran: false,
    decline: false,
    crpa_member: false,
    nra_member: false,
    nra_member_number: '',
    items: [{id: props.membership_type.membership_id, quantity: 1}],
  });

  const {
    customer_email,
    full_name,
    has_signed_release,
    has_signed_pledge,
    mail_address,
    city,
    state,
    zip,
    veteran,
    disabled_veteran,
    decline,
    crpa_member,
    nra_member,
    nra_member_number,
  } = purchaseData;

  const onChange = (e) => {
    setPurchaseData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'has_signed_release' ||
        e.target.name === 'has_signed_pledge' ||
        e.target.name === 'disabled_veteran' ||
        e.target.name === 'veteran' ||
        e.target.name === 'decline' ||
        e.target.name === 'crpa_member' ||
        e.target.name === 'nra_member'
          ? e.target.checked
          : e.target.value,
    }));
  };

  return (
    <Modal
      show={true}
      size='xl'
      onClose={props.onClose}
    >
      <Modal.Header>Please Read and Agree</Modal.Header>
      <Modal.Body>
        <div className='text-xs flex flex-col '>
          <span className='italic text-center'>
            Operating on a non-discriminatory basis with a special use permit
            from the U.S. Forest Service. Revised – 10/01/2022
          </span>
          <h3 className=' text-center mb-4 mt-4 text-xl font-medium text-gray-900 dark:text-white'>
            RELEASE AND INDEMNIFICATION AGREEMENT
          </h3>
        </div>
        <div className='space-y-6 p-6'>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            IN CONSIDERATION of my being given permission to observe and/or
            participate in the shooting, sporting and outdoor activities at the
            Kern River Valley Gun Association, I agree to sign and enter into
            this release and indemnification agreement.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I am entering into this agreement freely, voluntarily, and
            specifically state that:
          </p>
          <ol className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            <li>
              1. I am not dazed, suffering from shock or under the influence of
              drugs or alcohol;
            </li>
            <li>
              2. I understand that this is a full and complete release and
              indemnification agreement; and
            </li>
            <li>
              3. There has been no fraud or other conduct used in obtaining my
              signature and agreement to this document.
            </li>
          </ol>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I will comply with all rules and regulations. If I have questions or
            observe any unusual or unnecessary hazard during my participation, I
            will immediately bring such to the attention of the nearest
            official, and I have read all range rules and will comply with
            completely.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I understand that the observation and/or participation in the
            shooting, sporting and outdoor activities will expose me to certain
            risks inherent to the use of firearms and related activities. These
            include, but are not limited to, personal or bodily injury, death
            and/or property damage.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I understand the range is under audio and visual surveillance and
            agree to be recorded while at the range.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I agree to assume and accept the dangers inherent in the observation
            and/or participation of the shooting, sporting and outdoor
            activities.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I represent that I have no drug, health or mental problem that could
            or will interfere with my observation and/or participation of the
            shooting, sporting and outdoor activities.
          </p>
          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I agree that I am responsible for my own safety and the safety of
            any guest or child that I may bring to the premises of the Kern
            River Valley Gun Association.
          </p>

          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I agree that the Kern River Valley Gun Association, its members,
            officers, directors, employees, agents, representatives, affiliates,
            subsidiaries, successors or assignees and all participating groups
            and persons officially connected with the activities, including but
            not limited to the Kern River Valley Gun Association, will not be
            liable if I, my guest or child suffer any personal or bodily injury,
            death or property damage as a result of ordinary negligence.
          </p>

          <p className='text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400'>
            I further agree that in the event that the Kern River Valley Gun
            Association, its members, officers, directors, employees, agents,
            representatives, affiliates, subsidiaries, successors or assignees
            and all participating groups and persons officially connected with
            the activities, including but not limited to the Kern River Valley
            Gun Association, and become liable by way of contribution,
            indemnification, judgment, verdict, award or otherwise, to any other
            party as a result of my actions, negligence or injury, I agree to
            indemnify and hold harmless the Kern River Valley Gun Association,
            its members, officers, directors, employees, agents,
            representatives, affiliates, subsidiaries, successors or assignees
            and all participating groups and persons officially connected with
            the activities, including but not limited to the Kern River Valley
            Gun Association, from any and all claims, demands, actual legal
            costs or other costs or expenses arising out of said actions,
            negligence, or injury, no matter who might bring said claim, if any
            be brought.
          </p>

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
              className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              <p className='text-xs text-justify leading-relaxed text-gray-800 dark:text-gray-400'>
                I HAVE READ THE FORGOING RELEASE AND INDEMNIFICATION AGREEMENT,
                AND BY SIGNING. REPRESENT AND WARRANT THAT I FULLY UNDERSTAND
                IT. CAUTION! READ BEFORE SIGNING.
              </p>
            </label>
          </div>
          <form>
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
                Full name
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
                Email
              </label>
            </div>

            <div className='grid md:grid-cols-2 md:gap-6'>
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
                  Mail Address
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
                  type='number'
                  name='zip'
                  id='zip'
                  value={zip}
                  onChange={onChange}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  required
                />
                <label
                  htmlFor='zip'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Zip
                </label>
              </div>
            </div>

            <div className='grid md:grid-cols-3 md:gap-2'>
              {!veteran && !decline && (
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    name='disabled_veteran'
                    id='disabled_veteran'
                    disabled={veteran || decline}
                    defaultChecked={disabled_veteran}
                    onChange={onChange}
                    type='checkbox'
                    className={
                      veteran || decline
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
              {!disabled_veteran && !decline && (
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    name='veteran'
                    id='veteran'
                    disabled={disabled_veteran || decline}
                    defaultChecked={veteran}
                    onChange={onChange}
                    type='checkbox'
                    className={
                      disabled_veteran || decline
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
            </div>
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
                    className='block mb-2 text-sm font-medium  dark:text-white  text-gray-600 dark:text-gray-300'
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
            <div className=''>
              <span className='italic text-justify'>
                To help defend our 2nd amendment rights, the KRVGA encourages
                its members to join the NRA and CRPA.
              </span>

              <p className='text-base text-justify mt-4 leading-relaxed text-gray-500 dark:text-gray-400'>
                <span className='text-gray-900'>Pledge:</span> I certify that I
                am legally entitled to own and use a firearm in compliance with
                the laws of the United States of America and the State of
                California; that I am not a member of any organization which has
                any part of its program that attempts to overthrow the
                government by force or violence; that I have never been
                convicted of, or have an outstanding warrant for, a felony under
                the laws of the United States, the State of California, or any
                other state, government, or country; that I have never been
                convicted of an offense, including certain Prohibiting
                Misdemeanors, or have an outstanding warrant for, as listed in
                the California Penal Code that prohibit owning and/or possessing
                firearms; that I am not an alcoholic or illicit drug user; and
                that, if I am admitted to membership, will fulfill the
                obligation of good sportsmanship and good citizenship, and obey
                all club rules.
              </p>
            </div>
            <div className='flex flex-col items-center my-4'>
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
                className='ml-2 text-sm font-medium text-center text-gray-900 dark:text-gray-300'
              >
                By checking this box you e-sign the pledge above
              </label>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          disabled={
            !has_signed_release ||
            !full_name ||
            !customer_email ||
            !mail_address ||
            !city ||
            !state ||
            !zip ||
            !has_signed_pledge ||
            (nra_member && !nra_member_number)
          }
          className={
            !has_signed_release ||
            !full_name ||
            !customer_email ||
            !mail_address ||
            !city ||
            !state ||
            !zip ||
            !has_signed_pledge ||
            (nra_member && !nra_member_number)
              ? 'inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg opacity-25 cursor-not-allowed'
              : 'inline-block px-5 py-2 my-1 text-center border border-brightRedLight rounded-lg hover:bg-brightRed hover:border-brightRed duration-200'
          }
          onClick={() => {
            props.action(purchaseData);
            props.onClose();
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
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal;
