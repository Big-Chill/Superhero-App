// Constants
const PUBLIC_KEY = 'ba388afbb6a4e28c6800e2a579d38c71';
const PRIVATE_KEY = '38dea190372dc36c415a78e57f4653966c585174';
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';
const ts = Date.now();
const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

// Retrieve the selected superhero from local storage
const selectedSuperhero = JSON.parse(localStorage.getItem('selectedSuperhero'));


// Function to make the API call to get Series details
const getSeries = async (superheroId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${superheroId}/series?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        const series = response.data.data.results;
        renderSeries(series);
    } catch (error) {
        console.error(error);
    }
};


// Function to make the API call to get Stories
const getStories = async (superheroId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${superheroId}/stories?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        const stories = response.data.data.results;
        renderStories(stories);
    } catch (error) {
        console.error(error);
    }
};


// Function to render the superhero details
const renderDetails = (superhero) => {
  const detailsContainer = document.getElementById('details-container');

  // Create elements to display the superhero details
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
  card.appendChild(image);

  const name = document.createElement('h2');
  name.textContent = superhero.name;
  card.appendChild(name);

  const description = document.createElement('p');
  description.textContent = superhero.description;
  card.appendChild(description);

  detailsContainer.appendChild(card);
};


// Function to render the series
const renderSeries = (series) => {
    const seriesContainer = document.getElementById('details-container');

    const heading = document.createElement('h2');
    heading.textContent = 'Series';
    seriesContainer.appendChild(heading);
    series.forEach((serie) => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const title = document.createElement('h2');
        title.textContent = serie.title;
        card.appendChild(title);

        const description = document.createElement('p');
        description.textContent = serie.description;
        card.appendChild(description);

        seriesContainer.appendChild(card);
    });
};


// Function to render the stories
const renderStories = (stories) => {
    const storiesContainer = document.getElementById('details-container');

    const heading = document.createElement('h2');
    heading.textContent = 'Stories';
    storiesContainer.appendChild(heading);

    stories.forEach((story) => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const title = document.createElement('h2');
        title.textContent = story.title;
        card.appendChild(title);

        const description = document.createElement('p');
        description.textContent = story.description;
        card.appendChild(description);

        storiesContainer.appendChild(card);
    });
};



// Call the renderDetails function to display the superhero details
renderDetails(selectedSuperhero);

// Call the getSeries function to display the series
getSeries(selectedSuperhero.id);

// Call the getStories function to display the stories
getStories(selectedSuperhero.id);
