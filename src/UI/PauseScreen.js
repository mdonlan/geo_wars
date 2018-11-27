export function togglePauseScreen(doShow) {
  let elem = document.querySelector(".pauseText");

  if(doShow) elem.style.display = 'block';
  else elem.style.display = 'none';
};