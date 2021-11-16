const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let timerId = 0;

refs.btnStart.addEventListener('click', e => {
  timerId = setInterval(changeBackgroundColor, 1000);
  e.target.disabled = true;
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
});

const changeBackgroundColor = () => {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
};

// =======================
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
