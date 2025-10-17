/**
 * ! Flyweight Pattern
 * It's a structural design pattern that allows us to use shared objects
 * to efficiently support large quantities of objects.
 *
 * * It's useful when we need a large quantity of objects and want to reduce
 * * the amount of memory they use.
 */

import { COLORS } from '../helpers/colors.ts'

// 1. Class representing the bullet type - BulletType (Flyweight)
class BulletType {
  private name: string
  private damage: number
  private color: string

  constructor(name: string, damage: number, color: string) {
    this.name = name
    this.damage = damage
    this.color = color
  }

  getName(): string {
    return this.name
  }

  getDamage(): number {
    return this.damage
  }

  getColor(): string {
    return this.color
  }
}

// 2. Flyweight Factory - BulletTypeFactory
class BulletTypeFactory {
  private bulletTypes: Record<string, BulletType> = {}

  getBulletType(name: string, damage: number, color: string): BulletType {
    if (!this.bulletTypes[`${name}-${damage}-${color}`]) {
      console.log(
        `%cCreating new BulletType: ${name}-${damage}-${color}`,
        COLORS.yellow
      )

      this.bulletTypes[`${name}-${damage}-${color}`] = new BulletType(
        name,
        damage,
        color
      )
    }

    return this.bulletTypes[`${name}-${damage}-${color}`]
  }
}

// 3. Class representing a Bullet - Bullet
class Bullet {
  private x: number
  private y: number
  private direction: number
  private bulletType: BulletType

  constructor(x: number, y: number, direction: number, bulletType: BulletType) {
    this.x = x
    this.y = y
    this.direction = direction
    this.bulletType = bulletType
  }

  display(): void {
    const text = `
      Bullet of type: %c"${this.bulletType.getName()}"
      %cCoords: (${this.x}, ${this.y})
      Direction ${this.direction}
      Damage: ${this.bulletType.getDamage()}
      Color: ${this.bulletType.getColor()}
    `

    console.log(text, COLORS.green, COLORS.white)
  }
}

interface ShootParams {
  x: number
  y: number
  direction: number
  type: string
  damage: number
  color: string
}

// 4. Shooting System - ShootingSystem
class ShootingSystem {
  private bullets: Bullet[] = []
  private factory: BulletTypeFactory

  constructor(factory: BulletTypeFactory) {
    this.factory = factory
  }

  shoot({ x, y, direction, type, damage, color }: ShootParams): void {
    const bulletType = this.factory.getBulletType(type, damage, color)
    const bullet = new Bullet(x, y, direction, bulletType)
    this.bullets.push(bullet)
    bullet.display()
  }

  getBulletCount(): number {
    return this.bullets.length
  }
}

// 5. Client Code to test the Flyweight

function main() {
  const factory = new BulletTypeFactory()
  const shootingSystem = new ShootingSystem(factory)

  // Shoot several bullets of different types
  shootingSystem.shoot({
    x: 10,
    y: 20,
    direction: 0,
    type: 'Pistol',
    damage: 10,
    color: 'Gray',
  })
  shootingSystem.shoot({
    x: 15,
    y: 25,
    direction: 90,
    type: 'Shotgun',
    damage: 20,
    color: 'Red',
  })
  shootingSystem.shoot({
    x: 20,
    y: 30,
    direction: 180,
    type: 'Rifle',
    damage: 15,
    color: 'Green',
  })
  shootingSystem.shoot({
    x: 10,
    y: 20,
    direction: 45,
    type: 'Pistol',
    damage: 10,
    color: 'Gray',
  })
  shootingSystem.shoot({
    x: 25,
    y: 35,
    direction: 270,
    type: 'Shotgun',
    damage: 20,
    color: 'Red',
  })

  console.log(
    `Total bullets fired: %c${shootingSystem.getBulletCount()}\n`,
    COLORS.yellow
  )
}

main()
