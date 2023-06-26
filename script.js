// Constants
const PUBLIC_KEY = 'ba388afbb6a4e28c6800e2a579d38c71';
const PRIVATE_KEY = '38dea190372dc36c415a78e57f4653966c585174';
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';
const ts = Date.now();
const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

// Store superheroes data for filtering
let superheroesData = [];

// Function to make the API call
const getSuperheroes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
    superheroesData = response.data.data.results;
    renderSuperheroes(superheroesData);
  } catch (error) {
    console.error(error);
  }
};

// Function to render the superhero cards
const renderSuperheroes = (superheroes) => {
  const superheroesContainer = document.getElementById('superheroes-container');
  superheroesContainer.innerHTML = ''; // Clear previous superheroes

  superheroes.forEach((superhero) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', () => {
      showDetails(superhero);
    });

    const image = document.createElement('img');
    image.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    card.appendChild(image);

    const name = document.createElement('h2');
    name.textContent = superhero.name;
    card.appendChild(name);

    const addToFavoritesBtn = document.createElement('button');
    addToFavoritesBtn.textContent = 'Add to Favorites';
    addToFavoritesBtn.classList.add('add-to-favorites-button');
    addToFavoritesBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      addToFavorites(superhero);
    });
    card.appendChild(addToFavoritesBtn);

    superheroesContainer.appendChild(card);
  });
};

const goToFavorites = () => {
  window.open('favorites.html', '_blank');
};

// Get the favorites button element
const favoritesButton = document.getElementById('favorites-button');

// Add event listeners
favoritesButton.addEventListener('click', goToFavorites);

// Function to add a superhero to favorites
const addToFavorites = (superhero) => {
  // Retrieve favorites from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Check if the superhero is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === superhero.id);
  if (!isFavorite) {
    // Add the superhero to favorites
    favorites.push(superhero);
    // Save favorites to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Superhero added to favorites!');
  } else {
    alert('Superhero is already in favorites!');
  }
};

// Function to show superhero details on a new page
const showDetails = (superhero) => {
  // Store the superhero details in local storage
  localStorage.setItem('selectedSuperhero', JSON.stringify(superhero));

  // Open the details.html page
  window.open('details.html', '_blank');
};

// Function to filter superheroes based on search term
const filterSuperheroes = (superheroes, searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  return superheroes.filter(superhero => superhero.name.toLowerCase().includes(searchTerm));
};

// Function to handle search button click event
const handleSearch = () => {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();
  renderSuperheroes(filterSuperheroes(superheroesData, searchTerm));
};

// Event listener for search button click
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);

// Event listener for Enter key press in search input
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// Call the getSuperheroes function to load the screen with superhero cards
getSuperheroes();
