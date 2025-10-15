/**
 * ! Decorator Pattern
 * It's a structural design pattern that allows adding
 * functionalities to objects by placing these objects within
 * special wrapper objects that contain these functionalities.
 *
 * Not to be confused with TypeScript decorators which are annotations.
 *
 * * It's useful when you need to add functionalities to objects
 *  * dynamically and flexibly.
 *
 * https://refactoring.guru/design-patterns/decorator
 */

// 1. Character Interface
interface Character {
  getDescription(): string
  getStats(): { attack: number; defense: number }
}

// 2. BasicCharacter Class
// Represents a basic character without accessories
interface Stats {
  attack: number
  defense: number
}

class BasicCharacter implements Character {
  getDescription(): string {
    return 'Basic character'
  }

  getStats(): Stats {
    return { attack: 10, defense: 10 }
  }
}

// 3. CharacterDecorator Decorator Class
// Acts as a base for specific decorators
abstract class CharacterDecorator implements Character {
  constructor(protected character: Character) { }

  getDescription(): string {
    return this.character.getDescription()
  }

  getStats(): Stats {
    return this.character.getStats()
  }
}

// 4. Concrete Decorator HelmetDecorator
// Adds a helmet that increases defense by +5
class HelmetDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * with Helmet'
  }

  override getStats(): Stats {
    const stats = this.character.getStats()
    return { attack: stats.attack, defense: stats.defense + 5 }
  }
}

// 5. Concrete Decorator ShieldDecorator
// Adds a shield that increases defense by +10
class ShieldDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * with Shield'
  }

  override getStats(): Stats {
    const stats = this.character.getStats()
    return { attack: stats.attack, defense: stats.defense + 10 }
  }
}

// 6. Concrete Decorator SwordDecorator
// Adds a sword that increases attack by +7
class SwordDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * with Sword'
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats()
    return { attack: stats.attack + 7, defense: stats.defense }
  }
}

class RingDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * with Ring'
  }

  override getStats(): Stats {
    const stats = this.character.getStats()
    return { attack: stats.attack + 3, defense: stats.defense }
  }
}

// 7. Client Code to Test the Decorator

function main() {
  // Create a basic character
  let character: Character = new BasicCharacter()
  console.log('\nInitial character:', character.getDescription())
  console.log('Stats:', character.getStats())

  // Add a helmet to the character
  character = new HelmetDecorator(character)
  console.log('\nWith Helmet:', character.getDescription())
  console.log('Stats:', character.getStats())

  // Add a shield to the character
  character = new ShieldDecorator(character)
  console.log('\nWith Shield:', character.getDescription())
  console.log('Stats:', character.getStats())

  // Add a sword to the character
  character = new SwordDecorator(character)
  console.log('\nWith Sword:', character.getDescription())
  console.log('Stats:', character.getStats())

  character = new RingDecorator(character)
  console.log('\nWith Ring:', character.getDescription())
  console.log('Stats:', character.getStats())

  console.log('\n\n')
}

main()
