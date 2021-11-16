import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

// flatpickr =======================
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const defaultDate = options.defaultDate.getTime();
    const userDate = selectedDates[0].getTime();
    if (userDate <= defaultDate) {
      window.alert('Please choose a date in the future');
    } else refs.startBtn.disabled = false;
  },
};

const flatPicker = flatpickr(refs.datePicker, options);
// ==============================================

const addLeadingZero = value => String(value).padStart(2, '0');

let timerId = null;

const deltaCounter = () => {
  const delta = flatPicker.selectedDates[0].getTime() - new Date().getTime();
  if (delta < 0) {
    clearInterval(timerId);
    refs.startBtn.disabled = true;
  }

  let { days, hours, minutes, seconds } = convertMs(delta);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);

  return delta;
};

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(deltaCounter, 1000);
});

// ====================================================
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
