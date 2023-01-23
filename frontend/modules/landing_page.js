import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities)
  // Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

// Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let data = await fetch(`${config.backendEndpoint}/cities`);
    return data.json();
  } catch(e) {
    return null;
  }
}

// Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let datadiv = document.querySelector("#data");
  let carddiv = document.createElement("div")
  carddiv.classList.add("col-lg-3")
  carddiv.classList.add("col-md-6")
  let myhtml = `
  
//       <a href="./pages/adventures/?city=${city}" id="${id}">
//         <div class="tile">
//           <h3 class="tile-text position-absolute card-heading">${city}</h3>
//           <p class="tile-text card-subheading">${description}</p>
//           <img class="img-fluid" src="${image}">
//         </div>
//       </a>
    
  `
  carddiv.innerHTML = myhtml
  datadiv.appendChild(carddiv)
  


}

export { init, fetchCities, addCityToDOM };
