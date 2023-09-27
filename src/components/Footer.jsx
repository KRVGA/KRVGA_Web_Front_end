import IMAGES from '../Images/Images';
const Footer = () => {
  return (
    <footer className='bg-veryDarkBlue'>
      {/* container flex */}
      <div className='container flex flex-col justify-between items-center px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0 '>
        {/* social links */}
        <div className='flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start'>
          {/* social links */}
          <div className=' flex justify-center space-x-4'>
            <a
              href='https://www.facebook.com/krvga/'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src={IMAGES.iconFacebook}
                alt='facebook'
                className='h-8'
              />
            </a>
          </div>
        </div>
        {/* list-container */}
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col space-y-3 text-white'>
            <div className=' flex flex-col items-center'>
              <a
                href='https://maps.app.goo.gl/AuF527HJTAqnP19k9'
                target='_blank'
                rel='noreferrer'
                className='text-brightRed'
              >
                Cyrus Canyon Rd, Kernville, CA 93238
              </a>
              <p>(760) 223-5083</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
