// Elementos del DOM
const pokeInput = document.getElementById('pokeInput');
const searchBtn = document.getElementById('searchBtn');
const pokeImg   = document.getElementById('pokeImg');
const pokeName  = document.getElementById('pokeName');
const pokeDesc  = document.getElementById('pokeDesc');

// Función que ejecuta la búsqueda
function buscarPokemon() {
  const query = pokeInput.value.trim().toLowerCase();
  if (!query) return alert('Ingresa un nombre o ID válido.');

  // URLs de la PokéAPI
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${encodeURIComponent(query)}`;

  // 1. Obtener imagen y nombre
  fetch(pokemonUrl)
    .then(resp => {
      if (!resp.ok) throw new Error('No encontrado');
      return resp.json();
    })
    .then(data => {
      pokeImg.src = data.sprites.front_default;
      pokeImg.style.display = 'block';
      pokeName.textContent = data.name;
      // 2. Obtener descripción en español
      return fetch(speciesUrl);
    })
    .then(resp => {
      if (!resp.ok) throw new Error('No encontrado');
      return resp.json();
    })
    .then(species => {
      // Filtrar flavor_text_entries para idioma 'es'
      const entry = species.flavor_text_entries.find(
        e => e.language.name === 'es'
      );
      pokeDesc.textContent = entry
        ? entry.flavor_text.replace(/\s+/g, ' ')  // limpiar saltos de línea
        : 'Descripción no disponible en español.';
    })
    .catch(err => {
      pokeImg.style.display = 'none';
      pokeName.textContent = '';
      pokeDesc.textContent = '';
      alert('Pokémon no encontrado. Verifica el nombre o ID.');
      console.error(err);
    });
}

// 3. Evento click en el botón
searchBtn.addEventListener('click', buscarPokemon);

// 4. Evento keyup para Enter en el input
pokeInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    buscarPokemon();
  }
});
