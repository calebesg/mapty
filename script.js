'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

const renderMap = function (coords) {
  map = L.map('map').setView(coords, 16);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on('click', event => {
    mapEvent = event;
    form.classList.remove('hidden');
    inputDistance.focus();
  });
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      renderMap([latitude, longitude]);
    },
    () => alert('Could not get your position.')
  );
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const { lat, lng } = mapEvent.latlng;

  const popup = {
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
  };

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(L.popup(popup))
    .setPopupContent('Working')
    .openPopup();

  form.classList.add('hidden');
  inputDistance.value = inputCadence.value = inputDuration.value = '';
});

inputType.addEventListener('change', e => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
