const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.stopBtn.disabled = true;

const INTERVAL_TIME = 1000;
let intervalId = null;
let isActive = false;

refs.startBtn.addEventListener('click', () => {
  if (isActive) {
    return;
  }
  isActive = true;
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_TIME);
});

refs.stopBtn.addEventListener('click', () => {
  isActive = false;
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
  clearInterval(intervalId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
