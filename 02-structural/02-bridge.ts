/**
 * ! Bridge Pattern
 * This pattern allows us to decouple an abstraction from its implementation,
 * so that both can vary independently.
 *
 * * It's useful when you have multiple implementations of an abstraction
 * * It can be used to separate business logic from presentation logic
 * * It can be used to separate user interface logic as well.
 *
 * https://refactoring.guru/design-patterns/bridge
 */

import { COLORS } from '../helpers/colors.ts'

interface Ability {
  use(): void
}

class SwordAttack implements Ability {
  use(): void {
    console.log('%cSwinging a sword!', COLORS.green)
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log('%cSwinging an axe!', COLORS.orange)
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log('%cCasting a magic spell!', COLORS.blue)
  }
}

class FireBallSpell implements Ability {
  use(): void {
    console.log('%cCasting a fireball!', COLORS.red)
  }
}

abstract class Character {
  protected ability: Ability

  constructor(ability: Ability) {
    this.ability = ability
  }

  setAbility(ability: Ability) {
    this.ability = ability
  }

  abstract performAbility(): void
}

class Warrior extends Character {
  override performAbility(): void {
    console.log('%cWarrior is ready to fight!', COLORS.yellow)
    this.ability.use()
  }
}

class Mage extends Character {
  override performAbility(): void {
    console.log('%cMage is ready to cast!', COLORS.purple)
    this.ability.use()
  }
}

function main() {
  const warrior = new Warrior(new SwordAttack())
  warrior.performAbility()
  warrior.setAbility(new AxeAttack())
  warrior.performAbility()

  const mage = new Mage(new MagicSpell())
  mage.performAbility()
  mage.setAbility(new FireBallSpell())
  mage.performAbility()
}

main()
