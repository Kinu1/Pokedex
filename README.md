# Pokedex

Pokedex estático em JavaScript que consome a API pública do Pokémon.

## Como usar

1. Abra `index.html` no um navegador moderno.
2. Clique em `Load More` para carregar mais Pokémon.
3. O app consome `https://pokeapi.co/api/v2/pokemon`.

## Linguagens e frameworks

- HTML5
- CSS3
- JavaScript moderno (ES6+)
- Consumo da API pública `PokeAPI` para dados de Pokémon

## Técnicas usadas

- Manipulação do DOM para renderizar a lista de Pokémon dinamicamente
- `fetch` para requisições HTTP à API externa
- Paginação simples com botão `Load More`
- Layout responsivo com CSS Grid e media queries
- Estilo de cards baseado em classes de tipo de Pokémon
- Uso de arquivo estático único sem build tools
- Estrutura modular de código JavaScript (modelo, API e lógica de apresentação)

## Estrutura do projeto

- `index.html` — página principal
- `assets/css/global.css` — estilos base
- `assets/css/pokedex.css` — estilos da lista de Pokémon
- `assets/js/pokemon-model.js` — modelo de dados
- `assets/js/poke-api.js` — chamadas à API do PokeAPI
- `assets/js/main.js` — lógica de paginação e renderização


