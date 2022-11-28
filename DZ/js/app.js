function buildStorage() {
  let countries = [];

  return {
    setCountries: newCountries => countries = newCountries,
    getCountries: () => countries
  };
}
const storage = buildStorage();

function filteredCountries(valueSearch){
    const searchCountry = storage.getCountries();
    const result = searchCountry.filter(country => country.name.toLowerCase().indexOf(valueSearch) >=0);
    document.querySelector('.search-btn').onclick = () =>{  
      renderCountries(result);
    };
    document.querySelector('.clear-btn').onclick = () => {
      document.querySelector('.search').value = '';
      renderCountries();
    }
}

function renderCountries(countries) {
  let countriesElement = document.createElement('table');
  countriesElement.className = 'table table-bordered table-striped';
  let htmlStr = countries.reduce((acc, country) => {
        return acc + `<tr>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.area}</td>
            <td>${country.region}</td>
            <td>${country.population}</td>
            <td class="text-center"><img class="w-25" src="${country.flags.png}" alt="flag"></td>
        </tr>` 
    }, '');
  countriesElement.innerHTML = `<thead><tr>
      <th data-sort="name">Name</th>
      <th data-sort="capital">Capital</th>
      <th data-sort="area">Area</th>
      <th data-sort="region">Region</th>
      <th data-sort="population">Population</th>
      <th class="text-center">Flag</th>
      </tr></thead>
      <tbody>${htmlStr}</tbody>`;
  document.querySelector('.mainContent').append(countriesElement);
}

document.querySelector('.search').value = '';
document.querySelector('.search').onkeyup = e =>{
  const valueSearch = e.currentTarget.value.trim().toLowerCase();
  filteredCountries(valueSearch);
}

fetch('https://restcountries.com/v2/all')
  .then(response => response.json())
  .then(data => {
    const countriesFilter = data.map((country) => {
      return {
        name: country.name,
        capital: country.capital,
        area: country.area,
        region: country.region,
        population: country.population
      }
    });
    storage.setCountries(countriesFilter);
    renderCountries(data);
  })


  
  
