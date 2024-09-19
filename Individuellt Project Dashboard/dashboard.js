let titleElement = document.getElementById("title");

titleElement.addEventListener("click", function() {
  let titleInput = prompt("Enter a new title:");
  if (titleInput !== null && titleInput !== "") {
    titleElement.innerText = titleInput;
  }
});


let box1 = document.getElementById("links");
let addLinkBtn = document.getElementById("add-link-btn");
let modal = document.getElementById("modal");
let titleInput = document.getElementById("title-input");
let linkInput = document.getElementById("link-input");
let imageInput = document.getElementById("image-input");
let saveLinkBtn = document.getElementById("save-link-btn");
let cancelBtn = document.getElementById("cancel-btn");

addLinkBtn.addEventListener("click", function() {
  modal.style.display = "block"; /* Show the modal */
});

cancelBtn.addEventListener("click", function() {
  modal.style.display = "none"; /* Hide the modal */
});

saveLinkBtn.addEventListener("click", function() {
    let title = titleInput.value;
    let linkUrl = linkInput.value;

    if (title && linkUrl) {
    let newLink = document.createElement("a");
    newLink.href = linkUrl;
      newLink.target = "_blank"; /* Open link in new tab */

    let linkText = document.createElement("span");
    linkText.textContent = title;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
      removeBtn.className = "remove-btn"; /* Add a class to the remove button */

    removeBtn.addEventListener("click", function(event) {
        event.preventDefault(); /* Prevent default behavior of <a> tag */
        event.stopPropagation(); /* Prevent event propagation to parent elements */
        let linkToRemove = this.parentNode; /* Get the parent link element */
        linkToRemove.parentNode.removeChild(linkToRemove); /* Remove the link element */
    });

    newLink.appendChild(linkText);
    newLink.appendChild(removeBtn);

      let linkContainer = document.createElement("div"); /* Create a container for the link */
    linkContainer.appendChild(newLink);

      box1.appendChild(linkContainer); /* Append the link container to box1 */

    titleInput.value = "";
    linkInput.value = "";
      modal.style.display = "none"; /* Hide the modal */
    }
});

const apiKey = '91c2d29054964b98b6572625241909';
const apiUrl = 'http://api.weatherapi.com/v1/current.json';

async function getWeather() {
  try {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Use the latitude and longitude to retrieve the weather data
      const response = await fetch(`${apiUrl}?key=${apiKey}&q=${latitude},${longitude}`);
      const data = await response.json();
      displayWeather(data);
    });
  } catch (error) {
    console.error(error)
  }
}

function displayWeather(data) {
  try{
      const weatherElement = document.getElementById('forecast');
      weatherElement.innerHTML = `
        <h3>${data.location.name}</h3>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>${data.current.condition.text}</p>
      `; 
  } catch (error){
    console.error(error);
  }
}

getWeather();


