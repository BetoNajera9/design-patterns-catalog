/**
 * ! Strategy Pattern
 *
 * The Strategy pattern is a software design pattern that defines a
 * family of algorithms, encapsulates them and makes them interchangeable.
 *
 *
 * * It's useful when you have a class that has behavior that can
 * * change at runtime and you want to delegate the responsibility of
 * * the implementation to another class.
 *
 * https://refactoring.guru/design-patterns/strategy
 */

import { COLORS } from '../helpers/colors.ts'

/**
 * !Objective: Explain the Strategy pattern using an example where several
 * ! little ducks compete in a race and each one has its own
 * ! movement strategy (for example, swimming, flying or walking).
 */

interface MovementStrategy {
  move(): void
}

// Strategy 1: Swimming
class SwimFast implements MovementStrategy {
  move(): void {
    console.log('%cThe duck is swimming fast over the water!\n', COLORS.blue)
  }
}

// Strategy 2: Flying
class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log('%cThe duck is flying high in the sky!\n', COLORS.yellow)
  }
}

// Strategy 3: Walking
class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log('%cThe duck is walking clumsily on the ground!\n', COLORS.green)
  }
}

// Consumer Class - Duck
class Duck {
  private name: string
  private movementStrategy: MovementStrategy

  constructor(name: string, movementStrategy: MovementStrategy) {
    this.name = name
    this.movementStrategy = movementStrategy

    console.log(`%c${name} %cis ready to race!`, COLORS.green, COLORS.white)
  }

  performMove(): void {
    console.log(`${this.name} is about to move...`)

    this.movementStrategy.move()
  }

  setMovementStrategy(movementStrategy: MovementStrategy): void {
    this.movementStrategy = movementStrategy
    console.log(
      `%c${this.name} %chas changed its movement strategy!`,
      COLORS.green,
      COLORS.white
    )
  }
}

function main() {
  const duck1 = new Duck('Daffy', new SwimFast())
  const duck2 = new Duck('Donald', new FlyOverWater())
  const duck3 = new Duck('Daisy', new WalkClumsily())

  console.log('%c The race of the ducks begins!\n', COLORS.red)

  duck1.performMove()
  duck2.performMove()
  duck3.performMove()

  duck3.setMovementStrategy(new FlyOverWater())
  duck3.performMove()

  duck3.setMovementStrategy(new SwimFast())
  duck3.performMove()
}

main()
