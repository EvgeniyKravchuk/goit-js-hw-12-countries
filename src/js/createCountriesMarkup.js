import fetchCountries from './fetchCountries';
import countriesMarkupTpl from '../templates/countriesMarkup.hbs';
import oneCountryMarkupTpl from '../templates/oneCountryMarkup.hbs';
import { debounce } from 'debounce';
import { errorNotification } from './notifications.js';

const countryInputRef = document.querySelector('.country-input');
const countryListRef = document.querySelector('.finded-country-list');
const debounceTakeInputValue = debounce(takeInputValue, 500);

let inputValue = '';

countryInputRef.addEventListener('input', debounceTakeInputValue);

function takeInputValue(e) {
  inputValue = e.target.value.trim();
  createMarkup();
}

function createMarkup() {
  const cleanMarkup = (countryListRef.innerHTML = '');

  if (inputValue !== '') {
    fetchCountries(inputValue).then(data => {
      if (data === undefined) {
        cleanMarkup;
        return errorNotification('Incorrect data entered. Please, try again');
      } else if (data.length >= 10) {
        cleanMarkup;
        return errorNotification('Too many matches found. Please enter a more specific query!');
      } else if (data.length === 1) {
        cleanMarkup;
        return countryListRef.insertAdjacentHTML('afterbegin', oneCountryMarkupTpl(data));
      }
      cleanMarkup;
      countryListRef.insertAdjacentHTML('afterbegin', countriesMarkupTpl(data));
    });
  }
  cleanMarkup;
}
