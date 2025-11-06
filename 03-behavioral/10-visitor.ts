/**
 * !Visitor Pattern
 *
 * The Visitor pattern is a behavioral design pattern
 * that lets you separate algorithms from the objects
 * on which they operate.
 *
 * * It's useful when you need to add new operations to
 * * stable classes without changing their code.
 *
 * https://refactoring.guru/design-patterns/visitor
 */

import { COLORS } from '../helpers/index.ts'

/**
 * Context: Imagine you're designing a system for a theme
 * park with different types of attractions:
 * roller coasters, haunted houses and ferris wheels.
 *
 * Each attraction has its own entrance price and offers a discount
 * depending on the type of visitor (child, adult or senior).
 *
 * This is where the Visitor pattern comes in, which allows applying specific
 * operations (like calculating the discounted price) depending on both
 * the attraction and the type of visitor,
 * without modifying the original classes.
 */

interface Visitor {
  visitorRollerCoaster(attraction: RollerCoaster): void
  visitorHauntedHouse(attraction: HauntedHouse): void
  visitorFerrisWheel(attraction: FerrisWheel): void
}

interface Attraction {
  accept(visitor: Visitor): void
  getBasePrice(): number
}

class RollerCoaster implements Attraction {
  private basePrice: number

  constructor(basePrice: number = 50) {
    this.basePrice = basePrice
  }

  getBasePrice(): number {
    return this.basePrice
  }

  accept(visitor: Visitor): void {
    visitor.visitorRollerCoaster(this)
  }
}

class HauntedHouse implements Attraction {
  private basePrice: number

  constructor(basePrice: number = 40) {
    this.basePrice = basePrice
  }

  getBasePrice(): number {
    return this.basePrice
  }

  accept(visitor: Visitor): void {
    visitor.visitorHauntedHouse(this)
  }
}

class FerrisWheel implements Attraction {
  private basePrice: number

  constructor(basePrice: number = 30) {
    this.basePrice = basePrice
  }

  getBasePrice(): number {
    return this.basePrice
  }

  accept(visitor: Visitor): void {
    visitor.visitorFerrisWheel(this)
  }
}

// Visitor
class ChildVisitor implements Visitor {
  visitorRollerCoaster(attraction: RollerCoaster): void {
    const discountPrice = attraction.getBasePrice() * 0.5

    console.log(`Child price for Roller Coaster: $${discountPrice}`)
  }

  visitorHauntedHouse(attraction: HauntedHouse): void {
    const discountPrice = attraction.getBasePrice() * 0.7

    console.log(`Child price for Haunted House: $${discountPrice}`)
  }

  visitorFerrisWheel(attraction: FerrisWheel): void {
    const discountPrice = attraction.getBasePrice() * 0.6

    console.log(`Child price for Ferris Wheel: $${discountPrice}`)
  }
}

class AdultVisitor implements Visitor {
  visitorRollerCoaster(attraction: RollerCoaster): void {
    const discountPrice = attraction.getBasePrice()

    console.log(`Adult price for Roller Coaster: $${discountPrice}`)
  }

  visitorHauntedHouse(attraction: HauntedHouse): void {
    const discountPrice = attraction.getBasePrice()

    console.log(`Adult price for Haunted House: $${discountPrice}`)
  }

  visitorFerrisWheel(attraction: FerrisWheel): void {
    const discountPrice = attraction.getBasePrice()

    console.log(`Adult price for Ferris Wheel: $${discountPrice}`)
  }
}

class SeniorVisitor implements Visitor {
  visitorRollerCoaster(attraction: RollerCoaster): void {
    const discountPrice = attraction.getBasePrice() * 0.85

    console.log(`Senior price for Roller Coaster: $${discountPrice}`)
  }

  visitorHauntedHouse(attraction: HauntedHouse): void {
    const discountPrice = attraction.getBasePrice() * 0.85

    console.log(`Senior price for Haunted House: $${discountPrice}`)
  }

  visitorFerrisWheel(attraction: FerrisWheel): void {
    const discountPrice = attraction.getBasePrice() * 0.85

    console.log(`Senior price for Ferris Wheel: $${discountPrice}`)
  }
}

function main() {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ]

  console.log(`Roller Coaster: $${new RollerCoaster().getBasePrice()}`)
  console.log(`Haunted House: $${new HauntedHouse().getBasePrice()}`)
  console.log(`Ferris Wheel: $${new FerrisWheel().getBasePrice()}`)
  console.log('\n\n')

  console.log(`%cChild visitor`, COLORS.green)
  const childVisitor = new ChildVisitor()
  attractions.forEach(attraction => {
    attraction.accept(childVisitor)
  })

  console.log('%c\nAdult visitor', COLORS.green)
  const adultVisitor = new AdultVisitor()
  attractions.forEach(attraction => {
    attraction.accept(adultVisitor)
  })

  console.log('%c\nSenior visitor', COLORS.green)
  const seniorVisitor = new SeniorVisitor()
  attractions.forEach(attraction => {
    attraction.accept(seniorVisitor)
  })
}

main()
