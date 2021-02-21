'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//country details

// const getCountry = function(country){

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();
// request.addEventListener('load', function(){
//     const [data] = JSON.parse(this.responseText);
// //    console.log(data);
//     const html = `
//     <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}, ${data.languages[1] === undefined ? '': data.languages[1].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>
//     `
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
// });
// };

// getCountry('bharat');
// getCountry('pakistan');
// getCountry('usa');


//----------- country and neghbour country------------

const renderCountry = function(data, className =''){
    const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}, ${data.languages[1] === undefined ? '': data.languages[1].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
    `
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
}

// const getCountryAndNeighbour = function(country){

//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();
//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//      //   console.log(data);

//         //render country
//     renderCountry(data);

//     //request for neighour country
//     const [neighbour] = data.borders;
//     if(!neighbour) return;
//    // console.log(neighbour);
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function(){
//         const data = JSON.parse(this.responseText);
//         //console.log(data);
//         renderCountry(data, 'neighbour');
//     });

// });
// };
// getCountryAndNeighbour('bharat');

// ----------- use promise in fetch api-----------

// const getCountry = function(country){
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//       .then(function(response){
//         console.log(response);
//         return response.json();
//     }).then(function(data){
//         console.log(data[0]);
//         renderCountry(data[0]);
//     })
// }

// ----------simplyfy fetch---------
// const getCountry = function(country){
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]))
// }
// getCountry('usa');

//------------ add neighbour country from fetch ---------

const renderError = function(msg){
countriesContainer.insertAdjacentText('beforeend', msg);
countriesContainer.style.opacity = 1;
}

const getJSON = function(url){
  return fetch(url)
    .then(response => {
      if(!response.ok){
        throw new Error('country not found');
      }
      return response.json()
    })
}

const getCountry = function(country){
    getJSON(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(data => {
        renderCountry(data[0])
        const neighbour = data[0].borders[0];
        if(!neighbour) {throw new Error('No neighbour country is present');}
        return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
    })
    .then(data => {
        renderCountry(data, 'neighbour');
    })
    .catch(err => {
      renderError(`Somthing went wrong :: ${err.message} :: Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}
btn.addEventListener('click', function(){
  getCountry('bharat');
});
//getCountry('usa');