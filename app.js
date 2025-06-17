// Seleccionamos elementos del DOM
const pokeInput = document.getElementById('pokeInput');
const searchBtn = document.getElementById('searchBtn');
const pokeImg   = document.getElementById('pokeImg');
const pokeName  = document.getElementById('pokeName');

searchBtn.addEventListener('click', () => {
  const query = pokeInput.value.trim().toLowerCase();
  if (!query) return alert('Ingresa un nombre o ID válido.');

  // Construimos la URL de la PokéAPI v2
  const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`;

  fetch(url)
    .then(resp => {
      if (!resp.ok) throw new Error('No encontrado');
      return resp.json();
    })
    .then(data => {
      // Obtenemos la imagen front_default
      const imgUrl = data.sprites.front_default;
      pokeImg.src = imgUrl;
      pokeImg.style.display = 'block';
      pokeName.textContent = data.name;
    })
    .catch(err => {
      pokeImg.style.display = 'none';
      pokeName.textContent = '';
      alert('Pokémon no encontrado. Verifica el nombre o ID.');
      console.error(err);
    });
});
