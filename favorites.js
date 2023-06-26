// Retrieve the favorites from local storage
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to render the favorite superheroes
const renderFavorites = () => {
  const favoritesContainer = document.getElementById('favorites-container');
  favoritesContainer.innerHTML = ''; // Clear the container before rendering

  favorites.forEach((superhero) => {
    const row = document.createElement('tr');

    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = superhero.name;
    row.appendChild(nameCell);

    const buttonCell = document.createElement('td');
    const removeFromFavoritesBtn = document.createElement('button');
    removeFromFavoritesBtn.textContent = 'Remove from Favorites';
    removeFromFavoritesBtn.classList.add('remove-from-favorites-button');
    removeFromFavoritesBtn.addEventListener('click', () => {
      // Remove the superhero from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== superhero.id);
      // Save favorites to local storage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      // Re-render the favorites
      window.location.reload();
    });
    buttonCell.appendChild(removeFromFavoritesBtn);
    row.appendChild(buttonCell);

    favoritesContainer.appendChild(row);
  });
};

// Call the renderFavorites function to display the favorite superheroes
renderFavorites();
