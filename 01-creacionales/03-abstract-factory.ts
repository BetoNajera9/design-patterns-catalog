/**
import { COLORS } from '../helpers/colors';
 * ! Abstract Factory:
 * It's a design pattern that allows creating families of related objects
 * without specifying their concrete classes.
 *
 * Instead of creating individual objects directly,
 * we create factories that produce a set of related objects.
 *
 * * It's useful when you need to create objects that are part of a family
 * * and you want to ensure these objects complement each other.
 *
 * https://refactoring.guru/design-patterns/abstract-factory
 */

import { COLORS } from '../helpers/colors.ts'

/**
 *  The purpose of the Abstract Factory is to create families of related objects
 *  (in this case, burgers and drinks) without specifying the concrete classes
 *  of each of those objects in the main code.
 */

interface Hamburguer {
  prepare(): void
}

interface Drink {
  pour(): void
}

class ChickenHamburger implements Hamburguer {
  prepare(): void {
    console.log('Preparing a %cchicken burger', COLORS.yellow)
  }
}

class BeefHamburger implements Hamburguer {
  prepare(): void {
    console.log('Preparing a %cbeef burger', COLORS.red)
  }
}

class Water implements Drink {
  pour(): void {
    console.log('Pouring a %cwater', COLORS.blue)
  }
}

class Sodas implements Drink {
  pour(): void {
    console.log('Pouring a %csoda', COLORS.violet)
  }
}

interface RestaurantFactory {
  createHamburger(): Hamburguer
  createDrink(): Drink
}

class FastFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburguer {
    return new BeefHamburger()
  }

  createDrink(): Drink {
    return new Sodas()
  }
}

class HealthyRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburguer {
    return new ChickenHamburger()
  }

  createDrink(): Drink {
    return new Water()
  }
}

function main(factory: RestaurantFactory) {
  const burger = factory.createHamburger()
  const drink = factory.createDrink()

  burger.prepare()
  drink.pour()
}

console.log('%c--- Fast Food Restaurant ---', COLORS.purple)
main(new FastFoodRestaurantFactory())

console.log('%c--- Healthy Restaurant ---', COLORS.purple)
main(new HealthyRestaurantFactory())
