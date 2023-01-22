//Busco un elemento con la clase main en el html con querySelector
const myMain = document.querySelector(".main");

//Hago llamda a la api de pokemon  utilizando funcion asincrona getPokemonList
// y retornan los datos en la constante res
const getPokemonList = async () => {
  const result = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=105");
  const res = await result.json();
  return res;
};
//Para obtener el detalle de cada uno de los pokemon creo una nueva
//funcion asincrona llamada getPokemonDetail que recibe como paramatro la url individual para el
//detalle de cada uno de los pokemon

const getPokemonDetail = async (url) => {
  const result = await fetch(url);
  const res = await result.json();
  return res;
};
//Para pintar pokemons recorremos con map el array (pokemons)que nos devuelve la funcion getPokemonList
const drawPokemonList = async (pokemons) => {
  pokemons.map(async (pokemon) => {
    const newDiv = document.createElement("div");
    myMain.appendChild(newDiv);

    //llamamos la funcion getPokemonDetail pasandole dos parametros pokemon y url
    const pokemonDetail = await getPokemonDetail(pokemon.url);

    //Creamos un nuevo div con el text de cada nombre de los pokemon y su imagen
    newDiv.innerHTML = `
          <p>${pokemon.name}</p>
          <img src="${pokemonDetail.sprites.front_default}" alt=""/>
          `;
  });
};

//obtenemos el boton con getElementById
const searchButton = document.getElementById("searchButton");

//añadimos al boton un evento al hacer click que nos muestra una alerta y que
// en el futuro filtrará pokemos
searchButton.addEventListener(
  "click",
  () => alert("buscando pokemons ...")
  //searchCharacters(input.value, pokemon)
);

// Se crea la funcion init para inicializar el código
const init = async () => {
  const pokemonList = await getPokemonList();
  drawPokemonList(pokemonList.results);
};

init();
