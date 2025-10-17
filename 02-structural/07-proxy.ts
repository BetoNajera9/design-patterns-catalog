/**
 * ! Proxy Pattern
 * This pattern is used to control access to an object, that is,
 * an object is created that acts as an intermediary between the client and the real object.
 *
 * * It's useful when we need to control access to an object,
 * * for example, to verify if the client has permission
 * * to access certain methods or properties.
 *
 * https://refactoring.guru/design-patterns/proxy
 *
 */

import { COLORS } from '../helpers/colors.ts'

class Player {
  name: string
  level: number

  constructor(name: string, level: number) {
    this.name = name
    this.level = level
  }
}

interface Room {
  enter(player: Player): void
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%c${player.name} entered the secret room!`, COLORS.green)
    console.log(`A greatest enemy appears!`)
  }
}

class MagicPortal implements Room {
  private secretRoom: Room

  constructor(room: Room) {
    this.secretRoom = room
  }

  enter(player: Player): void {
    if (player.level >= 10) {
      this.secretRoom.enter(player)
      return
    }

    console.log(
      `%cAccess denied. ${player.name}, you need to be at least level 10 to enter the secret room.`,
      COLORS.red
    )
  }
}

function main() {
  const portal = new MagicPortal(new SecretRoom())

  const player01 = new Player('Hero', 5)
  const player02 = new Player('Warrior', 15)

  console.log('%cPlayer 01 tries to enter the secret room:', COLORS.cyan)
  portal.enter(player01)

  console.log('%cPlayer 02 tries to enter the secret room:', COLORS.cyan)
  portal.enter(player02)
}

main()
