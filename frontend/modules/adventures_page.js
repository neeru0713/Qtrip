
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  console.log(search)
  
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let ans = search.split("=")
  return ans[1].replace(/%20/g, " ").toLowerCase();

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
 
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let data = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    console.log(data)
    return data.json();
     } catch(e) {
    return null;
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
    let parentdiv = document.querySelector("#data")
    for( let i=0;i<adventures.length;i++){
      let mydiv = document.createElement("div")
      mydiv.classList.add("col-lg-3", "col-sm-6", "col-xs-6", "col-md-4")
      let result =  `
      <a href="./detail/?adventure=${adventures[i].id}" id="${adventures[i].id}">
      <div class="adventure-card activity-card">
         <span class="category-banner">${adventures[i].category}</span>
         <img class="" src="${adventures[i].image}">
         <div class="card-content d-flex flex-column w-100">
             <div class="d-flex justify-content-between px-2">
                 <h6>${adventures[i].name}</h6> 
                 <p> ${adventures[i].currency} ${adventures[i].costPerHead}</p>
             </div>
             <div class="d-flex justify-content-between px-2">
                 <h6>Duration</h6>
                 <p>${adventures[i].duration}</p>
             </div>
         </div>
     </div>
 </a>
  
`
  mydiv.innerHTML = result

parentdiv.appendChild(mydiv)
 }

}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list = list.filter(function (ele){
    return ele.duration >= low && ele.duration <= high
  })
  return list;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  list = list.filter(function (ele){
    return categoryList.includes(ele.category) 
  })
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. filter by duration only
// 2. filter by category only
// 3. filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  if(filters.duration !== ""){
    list = filterByDuration(list, filters.duration.split("-")[0], filters.duration.split("-")[1])
  }
  if(filters.category.length !== 0){
    list = filterByCategory(list, filters.category)
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM



function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryParent = document.querySelector("#category-list")
  // catregories ko dom pe addend karwana hai categoryParent ke children mein dalna hai
  for(let i=0; i<filters.category.length; i++){
    let newCategory = document.createElement("div")
    let myhtml = `
    <span> ${filters.category[i]} </span>
    <button onclick="removeCategory(event)" value="${filters.category[i]}"> x </button>
    `
    newCategory.innerHTML = myhtml;
    // border , border-color, padding
    newCategory.style.border = "1px solid  #ffad33"
    newCategory.style.borderRadius = "25px"
    newCategory.style.padding = "5px"
    newCategory.style.marginRight = "5px"

    categoryParent.appendChild(newCategory)
  }

}



export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM
};
