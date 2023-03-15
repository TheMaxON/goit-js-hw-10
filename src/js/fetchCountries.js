export { fetchCountries };

function fetchCountries(countryName) {
  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;

  return fetch(apiUrl);
}
