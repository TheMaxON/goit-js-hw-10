const refs = {
  submitBtn: document.querySelector('form>button'),
  form: document.querySelector('form'),
  delay: Number(form.delay.value),
  step: Number(form.step.value),
  amount: Number(form.amount.value),
};

form.addEventListener('submit', event => {
  event.preventDefault();
  createPromises(delay, step, amount);
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

for (let i = 0; i <= amount; i += 1) {
  createPromise(i, Number(delay.value) + Number(step.value) * i)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function createPromises(amount, delay, step) {
  let delayTime = delay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delayTime)
      .then(() => {
        delayTime += step;
      })
      .catch(err => {
        console.error(`Promise ${i} rejected: ${err}`);
      });
  }
}
