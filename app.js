/**
 * Fetch parks from NPS API
 */
function getParks(url) {
  fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      extractData(jsonData.data);
    });
}

/**
 * Extract data from response to put on page
 * @param {Object} data 
 */
function extractData(data) {
  $('.results').html('');
  data.forEach(park => {
    let {
      states,
      fullName,
      description,
      url
    } = park;

    $('.results').append(createTemplate(states, fullName, description, url));
    $('.results').removeClass('hidden');
  });
}

/**
 * Creates HTML template for page
 * @param {String} full_name 
 * @param {String} description 
 * @param {String} url 
 */
function createTemplate(states, fullName, description, url) {
  let template = `
    <div class="park">
        <h2>${fullName}<h2>
        <p>${states}</p>
        <p>${description}</p>
        <a href="${url}">Website</a>
    </div>
    `;

  return template;
}

/**
 * Event Listener to handle Submit button click
 */
function handleSubmit() {
  $('.search-form').submit(event => {
    let url = 'https://developer.nps.gov/api/v1/parks?api_key=ATMkBJmqCiW3XWl4wlVElWfLF4pRXl5iIkbCLJB9&stateCode=';
    event.preventDefault();
    let states = $('.states select').val();
    let amount = $('.amount input').val();
    states.forEach(state => {
      url += `${state},`;
    });
    url += `&limit=${amount}`;

    console.log(url);
    getParks(url);
  });
}

$(handleSubmit());