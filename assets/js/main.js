const paginationButton = document.getElementById('paginationButton');
const pokemonsList = document.getElementById('pokemonsList');

const limit = 10;
const maxRecords = 151;
let offset = 0;

function ConvertPokemonToLi(pokemon) {
    const types = Array.isArray(pokemon.types) ? pokemon.types : [];
    return `
      <li class='pokemon ${pokemon.type}'>
                <span class='number'>#${String(pokemon.number || 0).padStart(3, '0')}</span>
                <span class='name'>${pokemon.name || '?'}</span>
                <div class='detail'>
                    <ol class='types'>
                        ${types.map((type) => `<li class='type ${type}'>${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo || ''}" alt="${pokemon.name || 'Pokémon'}">
                </div>
            </li>
    `;
}

function hidePaginationButton() {
    if (!paginationButton) return;
    if (!paginationButton.parentElement) return;
    paginationButton.parentElement.removeChild(paginationButton);
}

function setPaginationLoading(isLoading) {
    if (!paginationButton) return;
    paginationButton.disabled = isLoading;
    paginationButton.textContent = isLoading ? 'Carregando...' : 'Load More';
}

function loadNextPage() {
    if (!pokemonsList) return Promise.resolve([]);

    const remaining = maxRecords - offset;
    const pageLimit = Math.min(limit, remaining);

    if (pageLimit <= 0) {
        hidePaginationButton();
        return Promise.resolve([]);
    }

    setPaginationLoading(true);

    return PokeApi.getPokemons(offset, pageLimit)
        .then((pokemons = []) => {
            if (!pokemons.length) {
                hidePaginationButton();
                return [];
            }

            pokemonsList.innerHTML += pokemons.map(ConvertPokemonToLi).join('');
            offset += pokemons.length;

            if (offset >= maxRecords || pokemons.length < pageLimit) {
                hidePaginationButton();
            }

            return pokemons;
        })
        .catch((err) => {
            console.error('Erro ao carregar Pokémon:', err);
            hidePaginationButton();
            return [];
        })
        .finally(() => {
            setPaginationLoading(false);
        });
}

function init() {
    if (!pokemonsList) {
        console.error('Elemento #pokemonsList não encontrado no HTML.');
        return;
    }

    pokemonsList.innerHTML = '';
    offset = 0;

    loadNextPage();

    if (paginationButton) {
        paginationButton.addEventListener('click', loadNextPage);
    } else {
        hidePaginationButton();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}