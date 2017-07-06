export const getWindowAspectRatio = () =>
  window.innerWidth / window.innerHeight;
  
export const getWindowInnerWidth = () =>
  window.innerWidth;

export const getWindowInnerHeight = () =>
  window.innerHeight;

export const documentAppend = element =>
  document.body.appendChild(element);

export const getElementById = id =>
  document.getElementById(id);

export const getCodeById = id =>
  document.getElementById(id).innerHTML;

export const getTicks = () =>
  performance.now();

export const setOnMouseMove = f =>
  document.onmousemove = f;

export const setOnKey = f => {
  const isDown = true;
  document.onkeydown = e => f(e, isDown);
  document.onkeyup   = e => f(e, !isDown);
};
