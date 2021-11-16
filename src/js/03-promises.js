const formRef = document.querySelector('form');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

const onFormSubmit = e => {
  e.preventDefault();
  const trgt = e.target;
  for (let i = 1; i <= trgt.amount.value; i += 1) {
    let delay = +trgt.delay.value + trgt.step.value * (i - 1);

    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

formRef.addEventListener('submit', onFormSubmit);
