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

  createPromise(delay, step, amount);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        // delay += step;
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
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

// function createPromises(amount, delay, step) {
//   let delayTime = delay;
//   for (let i = 1; i <= amount; i++) {
//     createPromise(i, delayTime)
//       .then(() => {
//         delayTime += step;
//       })
//       .catch(err => {
//         console.error(`Promise ${i} rejected: ${err}`);
//       });
//   }
// }
