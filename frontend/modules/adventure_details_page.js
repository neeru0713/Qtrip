
import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return search.split("=")[1]

  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let ans = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId} `)
    
    return ans.text().then(function(text) {
      return text ? JSON.parse(text) : {}
    })
    
    
  } catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let photoParent = document.querySelector("#photo-gallery")
  for(let i=0; i<adventure.images.length; i++){
    let imgdiv = document.createElement("div")
    // imgdiv.classList.add("activity-card-image")
    imgdiv.innerHTML = `<img class="activity-card-image" src="${adventure.images[i]}">`
    photoParent.appendChild(imgdiv)
  }

  let adventureContent = document.querySelector("#adventure-content")
  adventureContent.innerHTML = `<p>${adventure.content}</p>`
  document.querySelector("#adventure-name").innerHTML = adventure.name
  document.querySelector("#adventure-subtitle").innerHTML = adventure.subtitle
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  
  let photos = document.querySelector("#photo-gallery")
  photos.textContent = ""
  
  let carousel = document.createElement("div")
  carousel.setAttribute("id", "carouselBasicExample")
  carousel.classList.add("carousel", "slide", "carousel-fade")
  carousel.setAttribute("data-mdb-ride", "Carousel")


  let carouselIndicators = document.createElement("div") 
  carouselIndicators.classList.add("carousel-indicators")
  carouselIndicators.innerHTML = 
  `
  <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="0"
      class="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="2"
      aria-label="Slide 3"
    ></button>
  `

  let carouselInner = document.createElement("div")
  carouselInner.classList.add("carousel-inner")
  for(let i=0; i<images.length; i++){
    let ci = document.createElement("div")
    ci.classList.add("carousel-item")
    if(i===0) {
      ci.classList.add("active")
    }
    ci.innerHTML = `
    <img
      src="${images[i]}"
      class="d-block w-100"
      alt="Sunset Over the City"
    />
  `
  carouselInner.appendChild(ci)
  }

  let button1 = document.createElement("button")
  button1.classList.add("carousel-control-prev")
  button1.setAttribute("data-mdb-target", "#carouselBasicExample")
  button1.setAttribute("data-mdb-slide", "prev")
  button1.setAttribute("type", "button")
  button1.innerHTML = `
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `

  let button2 = document.createElement("button")
  button2.classList.add("carousel-control-next")
  button2.setAttribute("data-mdb-target", "#carouselBasicExample")
  button2.setAttribute("data-mdb-slide", "next")
  button2.setAttribute("type", "button")
  button2.innerHTML = `
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `
  carousel.appendChild(carouselIndicators)
  carousel.appendChild(carouselInner)
  carousel.appendChild(button1)
  carousel.appendChild(button2)

  photos.appendChild(carousel)
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
