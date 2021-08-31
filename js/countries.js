const loadCountries = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}
loadCountries();

const displayCountries = countries => {
    // for(const country of countries){
    //     console.log(country);
    // }
    const countriesDiv = document.getElementById('countries');
    countries.forEach(country => {

        //console.log(country);

        const div = document.createElement('div');
        div.classList.add('country');
        div.innerHTML = `
        <h3>${country.name}</h3>
        <p>${country.capital}</p>
        <button onclick="loadCountryDetail('${country.name}')">Details</button>
       `;
        countriesDiv.appendChild(div);

    });
}
const loadCountryDetail = name => {
    const url = `https://restcountries.eu/rest/v2/name/${name}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCountryDetail(data[0]))
}

const displayCountryDetail =country=>{
    console.log(country);

   const countryDiv= document.getElementById('country-detail');
   countryDiv.innerHTML=`
   <h5>${country.name}</h5>
   <p>${country.population}</p>
   <p>${country.region}</p>
   <img width="200px" src="${country.flag}">
   `
   countryDiv.style.textAlign='center';
   //countryDiv.appendChild()
}