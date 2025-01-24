import type { PageServerLoad } from './$types';
import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

export const load: PageServerLoad = async ({ params }) => {
  // Optimized helper function to fetch Pokémon details
  const fetchPokemonDetails = async (pokemonName: string) => {
    const [pokemon, species] = await Promise.all([
      P.getPokemonByName(pokemonName),
      P.getPokemonSpeciesByName(pokemonName),
    ]);

    return { pokemon, color: species.color.name };
  };

  // Fetch the list of Pokémon
  const pokeListRes = await P.getPokemonsList({ limit: 20, offset: 0 });
  const pokeDetails = await Promise.all(
    pokeListRes.results.map((poke) => fetchPokemonDetails(poke.name))
  );

  return {
    data: pokeDetails,
  };
};
