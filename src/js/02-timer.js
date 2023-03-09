import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('input[type="text"]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userDate = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
    userDate = selectedDates[0];
  },
};

const timer = {
  intervalId: null,
  start() {
    this.intervalId = setInterval(() => {
      const dateNow = new Date();
      const deltaTime = userDate - dateNow;
      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        window.alert('Time is up!');
        return;
      }
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      refs.days.textContent = addLeadingZero(days);
      refs.hours.textContent = addLeadingZero(hours);
      refs.minutes.textContent = addLeadingZero(minutes);
      refs.seconds.textContent = addLeadingZero(seconds);
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', timer.start);

flatpickr(refs.input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
