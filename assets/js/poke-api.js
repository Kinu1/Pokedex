const PokeApi = {}

function ConvertPokeApiDetailToPokemon(pokeApiDetail) {
    const pokemon = new window.Pokemon();
    pokemon.number = pokeApiDetail.id;
    pokemon.name = pokeApiDetail.name;
    const typeList = pokeApiDetail.types || [];
    pokemon.types = typeList.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0] || '';
    pokemon.photo = pokeApiDetail.sprites?.other?.dream_world?.front_default
        || pokeApiDetail.sprites?.other?.['official-artwork']?.front_default
        || pokeApiDetail.sprites?.front_default
        || '';

    return pokemon;
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(ConvertPokeApiDetailToPokemon)
        .catch((err) => {
            console.error('Erro ao buscar detalhe do Pokémon:', pokemon?.name || pokemon?.url, err);
            return null;
        });
}

PokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`PokeAPI list request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then((jsonBody) => jsonBody.results || [])
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonsDetails) => (pokemonsDetails || []).filter((p) => p != null));
}
