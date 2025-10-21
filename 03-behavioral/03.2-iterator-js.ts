/**
 * ! Iterator Pattern
 * This pattern allows traversing the elements of a collection without exposing
 * the internal structure of the collection.
 *
 * * It's useful when you need to traverse a collection of elements regardless of
 * * how the elements are stored.
 *
 * https://refactoring.guru/design-patterns/iterator
 */

// Class representing a Pokémon
class Pokemon {
  name: string
  type: string

  constructor(name: string, type: string) {
    this.name = name
    this.type = type
  }
}

// Class representing the Pokémon collection
class PokemonCollection {
  private pokemons: Pokemon[] = []

  addPokemon(pokemon: Pokemon): void {
    this.pokemons.push(pokemon)
  }

  *getPokemons(): IterableIterator<Pokemon> {
    for (const pokemon of this.pokemons) {
      yield pokemon
    }
  }

  // Iterator implementation using a method with Symbol.iterator
  // to make the collection iterable
  // yield* delegates the iteration responsibility to the Pokémon collection
  *[Symbol.iterator](): IterableIterator<Pokemon> {
    yield* this.pokemons
  }
}
// Client Code to test the iterator with generator function

function main(): void {
  const pokedex = new PokemonCollection()

  // Add Pokémon to the collection
  pokedex.addPokemon(new Pokemon('Pikachu', 'Electric'))
  pokedex.addPokemon(new Pokemon('Charmander', 'Fire'))
  pokedex.addPokemon(new Pokemon('Squirtle', 'Water'))
  pokedex.addPokemon(new Pokemon('Bulbasaur', 'Grass'))

  // We iterate through the collection using for...of, thanks to the generator function
  console.log('Iterating through the Pokémon collection:')
  // for (const pokemon of pokedex.getPokemons()) {
  //   console.log(`Pokémon: ${pokemon.name}, Type: ${pokemon.type}`)
  // }
  for (const pokemon of pokedex) {
    console.log(`Pokémon: ${pokemon.name}, Type: ${pokemon.type}`)
  }
}

main()
