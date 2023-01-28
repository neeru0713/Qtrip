import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let ans = await fetch(`${config.backendEndpoint}/reservations`)
    return ans.text().then(function(text) {
      return text ? JSON.parse(text) : {}
    })
  } catch(e) {
    return null;
  }
  

}


function formatMyTime(time){

  var dateString = time;
  var date = new Date(dateString);

  var options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  var dateFormatted = date.toLocaleDateString("en-US", options);
  let len = dateFormatted.split(" ")[1].length
  console.log("....", dateFormatted.split(" "))
  let mydate = `${ dateFormatted.split(" ")[1].substring(0, len-1)} ${dateFormatted.split(" ")[0]} ${dateFormatted.split(" ")[2]}`

  var options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  };
  var timeFormatted = date.toLocaleTimeString("en-US", options);


  return `${mydate}, ${timeFormatted.toLowerCase()}`;
}


//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length === 0){
    console.log("if de andeer aya")
    document.querySelector("#no-reservation-banner").style.display = "block"
    document.querySelector("#reservation-table-parent").style.display = "none"
  } else {
    document.querySelector("#no-reservation-banner").style.display = "none"
    document.querySelector("#reservation-table-parent").style.display = "block"
    for(let i=0; i<reservations.length; i++){
      let row = document.createElement('tr')
      let datearray = reservations[i].date.split("-")
      let mydate = `${parseInt(datearray[2])}/${parseInt(datearray[1])}/${datearray[0]}`

      let colhtml = `
      <td>${reservations[i].id}</td>
      <td>${reservations[i].name}</td>
      <td>${reservations[i].adventureName}</td>
      <td>${reservations[i].person}</td>
      <td>${mydate}</td>
      <td>${reservations[i].price}</td>
      <td>${formatMyTime(reservations[i].time)}</td>
      <td id="${reservations[i].id}"><a href="../detail/?adventure=${reservations[i].adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>
      `

      row.innerHTML = colhtml
      document.querySelector("#reservation-table").appendChild(row)
    }
    
  }
 
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
