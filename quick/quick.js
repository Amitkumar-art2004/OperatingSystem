const overlay = document.querySelector("#brightness-overlay");
const slider = document.querySelector("#brightness-slider");
const nightLight = document.querySelector("#night-light");
const night = document.querySelector("#night");
const status_pill = document.querySelector(".status-pill");
const quick_settings = document.querySelector(".quick-settings");

status_pill.addEventListener("click", function () {
  quick_settings.classList.toggle("active");
});
slider.addEventListener("input", () => {
  const value = slider.value;
  // console.log(slider.value)
  overlay.style.opacity = (100 - value) / 100;
});
night.addEventListener("click", function () {
  night.classList.toggle("active");
  enabled = !enabled;
  nightLight.style.opacity = enabled ? 0.75 : 0;
});