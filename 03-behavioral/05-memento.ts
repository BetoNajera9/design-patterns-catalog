/**
 * !Memento Pattern
 * Allows capturing and externalizing an internal state of an object,
 * so that the object can be restored to that state later.
 *
 * * It's useful when you need to save the state of an object to be able
 * * to return to it in the future.
 *
 * https://refactoring.guru/design-patterns/memento
 */

import { COLORS } from '../helpers/colors.ts'

class GameMemento {
  private level: number = 1
  private health: number = 100
  private position: { x: number; y: number } = { x: 0, y: 0 }

  constructor(
    level: number,
    health: number,
    position: { x: number; y: number }
  ) {
    this.level = level
    this.health = health
    this.position = position
  }

  getLevel(): number {
    return this.level
  }

  getHealth(): number {
    return this.health
  }

  getPosition(): { x: number; y: number } {
    return this.position
  }
}

class Game {
  private level: number = 1
  private health: number = 100
  private position: { x: number; y: number } = { x: 0, y: 0 }

  constructor() {
    console.log(
      `Game started at level ${this.level} with health ${this.health} at position (${this.position.x}, ${this.position.y})`
    )
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position)
  }

  play(
    level: number,
    health: number,
    position: { x: number; y: number }
  ): void {
    this.level = level
    this.health = health
    this.position = position

    console.log(
      `Playing... Reached level ${level} with health ${health} at position (${position.x}, ${position.y})`
    )
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel()
    this.health = memento.getHealth()
    this.position = memento.getPosition()

    console.log(
      `Game restored to level ${this.level} with health ${this.health} at position (${this.position.x}, ${this.position.y})`
    )
  }
}

class GameHistory {
  private mementos: GameMemento[] = []

  push(memento: GameMemento): void {
    this.mementos.push(memento)
  }

  pop(): GameMemento | undefined {
    return this.mementos.pop()
  }
}

function main() {
  const game = new Game()
  const history = new GameHistory()

  history.push(game.save())

  // Player progresses in the game
  game.play(2, 80, { x: 10, y: 5 })
  history.push(game.save())

  game.play(3, 50, { x: 20, y: 15 })
  history.push(game.save())

  game.play(4, 20, { x: 30, y: 25 })
  console.log('%cCurrent state', COLORS.green)

  game.restore(history.pop()!)
  console.log('%cRestoring previous state', COLORS.yellow)
}

main()
