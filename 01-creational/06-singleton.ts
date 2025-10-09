/**
 * ! Singleton:
 * It is a creational design pattern that guarantees that a class
 * has a single instance and provides a global access point to it.
 *
 * * It is useful when you need to control access to a single instance
 * * of a class, for example, in a database object or in a
 * * configuration object.
 *
 * https://refactoring.guru/design-patterns/singleton
 */

import { COLORS } from '../helpers/colors.ts'

class DragonBalls {
  private static instance: DragonBalls
  private ballsCollected: number

  private constructor() {
    this.ballsCollected = 0
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls()
      console.log('%cThe Dragon Balls have been created!', COLORS.green)
    }
    return DragonBalls.instance
  }

  collectBall() {
    if (this.ballsCollected < 7) {
      this.ballsCollected++
      console.log(
        `%cYou have collected ${this.ballsCollected} Dragon Ball(s).`,
        COLORS.orange
      )
      return
    }
    console.log(
      '%cYou already have all 7 Dragon Balls, invoke Shenlong!',
      COLORS.yellow
    )
  }

  summonShenlong() {
    if (this.ballsCollected === 7) {
      console.log(
        '%cShenlong has been summoned! Make your wish!',
        COLORS.purple
      )
      this.ballsCollected = 0
      return
    }

    console.log(
      `%cYou need ${7 - this.ballsCollected
      } more Dragon Ball(s) to summon Shenlong.`,
      COLORS.red
    )
  }
}

function main() {
  const goku = DragonBalls.getInstance()

  goku.collectBall()
  goku.collectBall()
  goku.collectBall()

  goku.summonShenlong()

  const vegeta = DragonBalls.getInstance()

  vegeta.collectBall()
  vegeta.collectBall()
  vegeta.collectBall()
  vegeta.collectBall()

  vegeta.summonShenlong()
}

main()
