import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('input[type="text"]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const currentDate = new Date();
let userDate = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < this.defaultDate) {
      refs.startBtn.disabled = true;
      window.alert('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
    userDate = selectedDates;
  },
};

const timer = {
  intervalId: null,
  start() {
    this.intervalId = setInterval(() => {
      let dateNow = new Date();
      let deltaTime = userDate[0] - dateNow;
      console.log(deltaTime);
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;

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
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', timer.start);

flatpickr(refs.input, options);
