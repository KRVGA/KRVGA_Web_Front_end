import {useState} from 'react';
import {Spinner} from 'flowbite-react';
function Calendar() {
  const [loading, setLoading] = useState(true);

  return (
    <div className='text-center'>
      {loading && <Spinner size='xl' />}
      <iframe
        className='p-4 '
        onLoad={() => setLoading((prev) => !prev)}
        src='https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&showTz=1&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showNav=1&showDate=1&mode=MONTH&src=Y2FsZW5kYXJrcnZnYUBnbWFpbC5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043'
        width='100%'
        height='600'
      ></iframe>
    </div>
  );
}

export default Calendar;
