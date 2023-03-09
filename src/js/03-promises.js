import Notiflix from 'notiflix';

const refs = {
  submitBtn: document.querySelector('form>button'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(refs.form.delay.value);
  const step = Number(refs.form.step.value);
  const amount = Number(refs.form.amount.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
