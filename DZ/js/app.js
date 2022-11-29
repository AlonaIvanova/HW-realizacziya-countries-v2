function buildStorage() {
  let countries = [];
  return {
    setCountries: newCountries => countries = newCountries,
    getCountries: () => countries
  };
}
const storage = buildStorage();

const buildCountryTable = document.createElement("table");
buildCountryTable.id = "table";
buildCountryTable.className = "table table-bordered table-striped";
buildCountryTable.innerHTML = `<thead><tr>
   <th>Name</th>
   <th>Capital</th>
   <th>Region</th>
   <th>Population</th>
   <th>Area</th>
   </tr></thead><tbody></tbody>`;
document.querySelector(".mainContent").append(buildCountryTable);

function renderCountries(allCountries) {
    htmlStr = allCountries.reduce((acc, country) => acc + `<tr>
        <td>${country.name}</td>
        <td>${country.capital}</td>
        <td>${country.region}</td>
        <td>${country.population}</td>
        <td>${country.area}</td>
    </tr>`, '');
    document.querySelector("tbody").innerHTML = htmlStr; 
}

function getCountries() {
    fetch('https://restcountries.com/v2/all')
    .then(res => res.json())
    .then(data => {
        const filteredData = data.map((country) => {
          return {
            name: country.name,
            capital: country.capital,
            region: country.region,
            population: country.population,
            area: country.area,
        }
    });
    renderCountries(filteredData);
    storage.setCountries(filteredData);
})
}

function getCountryByName(countryName) {
    fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then(res => res.json())
    .then(data => {
        const filteredData = data.map((country) => {
        return {
          name: country.name,
          capital: country.capital,
          area: country.area,
          region: country.region,
          population: country.population
      }
    });
        renderCountries(filteredData);
        storage.setCountries(filteredData);
    })
    .catch((error) => {
        console.error("Error:", error);
        notFound();
    });
}

function getCountryByCapital(CapitalName) {
    fetch(`https://restcountries.com/v2/name/${CapitalName}`)
    .then(res => res.json())
    .then(data => {
        const filteredData = data.map((capital) => {
        return {
          capital: capital.name
        }
      });
        renderCountries(filteredData);
        storage.setCountries(filteredData);
    })
    .catch((error) => {
        console.error("Error:", error);
        notFound();
    });
}

function notFound() {
    let htmlStr = "";
    htmlStr += `<tr><td colspan='5' class="text-center"> Not found </td></tr>`;
    document.querySelector("tbody").innerHTML = htmlStr;
}

function enterTheCountry() {
    const searchField = document.querySelector(".search");
    searchField.onkeyup = e => {
        const searchCountry = e.currentTarget.value.trim().toLowerCase();
        searchButton(searchCountry);
    }   
}
    document.querySelector(".search").addEventListener("change", enterTheCountry());

function searchButton(searchCountry) {
    const searchBtn = document.querySelector(".search-btn");
    searchBtn.onclick = () => {
        getCountryByName(searchCountry);
    }  
}

function clearSearch() {
    const clearBtn = document.querySelector(".clear-btn")
    clearBtn.onclick = () => {
        const searchField = document.querySelector(".search")
        searchField.value = "";
        getCountries();
    }  
}
    document.querySelector(".clear-btn").addEventListener("click", clearSearch());

getCountries();