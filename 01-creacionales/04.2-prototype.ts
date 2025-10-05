/**
import { COLORS } from '../helpers/colors';
 * ! Prototype Pattern:

 * It is a creational design pattern that allows us to copy existing objects without making
 * the code depend on their classes.
 *
 * * It is useful when we want to duplicate the content,
 * * the title and author of a document, for example, or any complex object.
 *
 * https://refactoring.guru/design-patterns/prototype
 */

import { COLORS } from '../helpers/colors.ts'

class Pokemon {
  constructor(
    public name: string,
    public type: string,
    public level: number,
    public attacks: string[]
  ) { }

  clone(): Pokemon {
    return new Pokemon(this.name, this.type, this.level, [...this.attacks])
  }

  displayInfo(): void {
    console.log(
      `
      %cName: ${this.name}
      %cType: ${this.type}
      %cLevel: ${this.level}
      %cAttacks: ${this.attacks.join(', ')}`,
      COLORS.violet,
      COLORS.blue,
      COLORS.green,
      COLORS.yellow
    )
  }
}

// Task:
// 1. Create a base Pokémon.
// 2. Clone the base Pokémon and modify some attributes in the clones.
// 3. Call displayInfo on each Pokémon to show their details.

const basePokemon = new Pokemon('Charmander', 'Fire', 1, ['Ember', 'Scratch'])
const clone1 = basePokemon.clone()
clone1.name = 'Charmeleon'
clone1.level = 16
clone1.attacks.push('Flamethrower')

basePokemon.displayInfo()
clone1.displayInfo()
