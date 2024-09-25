let titleElement = document.getElementById("title");

// Add an event listener to the title element to save the title when it's changed
titleElement.addEventListener("click", function() {
  let titleInput = prompt("Enter a new title:");
  if (titleInput !== null && titleInput !== "") {
    titleElement.innerText = titleInput;
    saveTitle(); // Save the new title
  }
});


let box1 = document.getElementById("links");
let addLinkBtn = document.getElementById("add-link-btn");
let modal = document.getElementById("modal");
let titleInput = document.getElementById("title-input");
let linkInput = document.getElementById("link-input");
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

      let linkText = document.createTextNode(title);

      let removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove-btn"; /* Add a class to the remove button */

      removeBtn.addEventListener("click", function(event) {
          event.preventDefault(); /* Prevent default behavior of <a> tag */
          event.stopPropagation(); /* Prevent event propagation to parent elements */
          let linkToRemove = this.parentNode; /* Get the parent link element */
          linkToRemove.parentNode.removeChild(linkToRemove); /* Remove the link element */
          saveLinks(); // Save the links after removal
      });

      newLink.appendChild(linkText);

      let linkContainer = document.createElement("div"); /* Create a container for the link */
      linkContainer.appendChild(newLink);
      linkContainer.appendChild(removeBtn);

      box1.appendChild(linkContainer); /* Append the link container to box1 */

      titleInput.value = "";
      linkInput.value = "";
      modal.style.display = "none"; /* Hide the modal */
  }
  saveLinks();
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

const currencyApiUrl = 'https://v6.exchangerate-api.com/v6/bbdb8614b904dc82725f6ede/latest/USD'

async function getExchangeRate() {
  try {
    const response = await fetch(currencyApiUrl);
    const data = await response.json();
    const conversionRate = data.conversion_rates.SEK;
    displayCurrencyExchange(conversionRate);
  } catch (error) {
    console.error(error);
  }
}

function displayCurrencyExchange(conversionRate) {
  try {
    const exchangeElement = document.getElementById('exchange');
    exchangeElement.innerHTML = `
      <h3>Currency Exchange Rate</h3>
      <p>1 USD | ${conversionRate} SEK</p>
    `;
  } catch (error) {
    console.error(error);
  }
}

getExchangeRate();


// Get the elements that need to be saved
const titleElements = document.getElementById('title');
const linksElement = document.getElementById('links');
const noteTextarea = document.getElementById('note');

// Function to save the title
function saveTitle() {
  const title = titleElements.textContent;
  localStorage.setItem('title', title);
}

// Function to load the title
function loadTitle() {
  const savedTitle = localStorage.getItem('title');
  if (savedTitle) {
    titleElements.innerText = savedTitle;
  }
}

// Function to save the notes
function saveNotes() {
  const note = noteTextarea.value;
  localStorage.setItem('notes', note);
}

// Function to load the notes
function loadNotes() {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    noteTextarea.value = savedNotes;
  }
}

// Function to save the links
function saveLinks() {
  const links = [];
  const linkContainers = linksElement.children;
  for (let i = 0; i < linkContainers.length; i++) {
    const linkContainer = linkContainers[i];
    const link = linkContainer.querySelector('a');
    const linkText = link.textContent;
    const linkUrl = link.href;
    console.log(`Saving link: ${linkText} - ${linkUrl}`);
    links.push({ text: linkText, url: linkUrl });
  }
  localStorage.setItem('links', JSON.stringify(links));
}

// Function to load the links
function loadLinks() {
  const savedLinks = localStorage.getItem('links');
  if (savedLinks) {
    const links = JSON.parse(savedLinks);
    // Remove all child nodes from linksElement
    while (linksElement.firstChild) {
      linksElement.removeChild(linksElement.firstChild);
    }
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const linkContainer = document.createElement('div');
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.textContent = link.text;
      
      // Create the remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove-btn";
      
      // Add an event listener to the remove button
      removeBtn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        let linkToRemove = this.parentNode; /* Get the parent link element */
        linkToRemove.parentNode.removeChild(linkToRemove); /* Remove the link element */
        saveLinks(); // Save the links after removal
      });
      
      linkContainer.appendChild(linkElement);
      linkContainer.appendChild(removeBtn);
      linksElement.appendChild(linkContainer);
    }
  }
}


// Save the notes when they're changed
noteTextarea.addEventListener('input', saveNotes);

// Load the saved title and notes when the page loads
document.addEventListener('DOMContentLoaded', function() {
  loadTitle();
  loadNotes();
  loadLinks();
});

// Get a random picture from Unsplash API
const unsplashApiKey = '3aS7eTT0BZFgkPxHALYKW9f6yaC6y_r_L-ROf9QTL0M';
const unsplashApiUrl = `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}&orientation=landscape`;

// Create a button to get a random picture
const getRandomPictureBtn = document.createElement('button');
getRandomPictureBtn.textContent = 'Get Random Picture';
getRandomPictureBtn.addEventListener('click', getRandomPicture);
getRandomPictureBtn.classList.add('rngPicButton');

// Function to get a random picture
async function getRandomPicture() {
    try {
        const response = await fetch(unsplashApiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.urls || !data.urls.regular) {
            throw new Error('Invalid response from API');
        }
        const imageUrl = data.urls.regular;
        document.body.style.backgroundImage = `url(${imageUrl})`;
        saveBackgroundPicture(imageUrl);
    } catch (error) {
        console.error(error);
        alert('Failed to load picture');
    }
}

// Function to save the background picture
function saveBackgroundPicture(imageUrl) {
    localStorage.setItem('backgroundPicture', imageUrl);
}

// Function to load the saved background picture
function loadBackgroundPicture() {
    const savedBackgroundPicture = localStorage.getItem('backgroundPicture');
    if (savedBackgroundPicture) {
        document.body.style.backgroundImage = `url(${savedBackgroundPicture})`;
    }
}

// Load the saved background picture when the page loads
document.addEventListener('DOMContentLoaded', loadBackgroundPicture);

// Add the button to the page
document.body.appendChild(getRandomPictureBtn);

console.log(localStorage)
