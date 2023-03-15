import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries.js';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryCardEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();

  const countryName = e.target.value.trim();

  if (countryName === '') {
    clearMarkups();
    return;
  }

  fetchCountries(countryName)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (response.length === 1) {
        countryCardMarkup(response);
      } else {
        countriesListMarkup(response);
      }
      console.log(response);
      return response;
    })
    .catch(error => console.log(error));
}

function countriesListMarkup(countries) {
  const countriesList = countries
    .map(({ name, flags }) => {
      return `<li class='country'>
        <img src="${flags.svg}" 
        alt="${name.official}" 
        width = "30" 
        height = "15" />
        <p>${name.official}</p>
    </li>`;
    })
    .join('');

  refs.countryListEl.innerHTML = countriesList;
  refs.countryCardEl.innerHTML = '';
}

function countryCardMarkup(country) {
  const countryInfo = country
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class="country__card-header">
  <img src="${flags.svg}" alt="${name.official}" width="35" height="25" />
  <h1>${name.official}</h1>
</div>
<p><b>Capital:</b> ${capital}</p>
<p><b>Population:</b> ${population}</p>
<p><b>Languages:</b> ${Object.values(languages).join(', ')}</p>`;
    })
    .join('');
  refs.countryCardEl.style.display = 'block';
  refs.countryCardEl.innerHTML = countryInfo;
  refs.countryListEl.innerHTML = '';
}

function clearMarkups() {
  refs.countryListEl.innerHTML = '';
  refs.countryCardEl.innerHTML = '';
  refs.countryCardEl.style.display = 'none';
}
