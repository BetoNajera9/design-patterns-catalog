/**
 * ! Factory Method:
 * The Factory Method pattern allows creating objects without specifying
 * the exact class of object that will be created.
 *
 * Instead, we delegate object creation to subclasses or methods
 * that encapsulate this logic.
 *
 * * It is useful when a class cannot anticipate the class
 * * of objects it must create.
 *
 * https://refactoring.guru/design-patterns/factory-method
 *
 */

import { COLORS } from '../helpers/colors.ts'

interface Hamburger {
  prepare(): void
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log('%cPreparing a chicken hamburger', COLORS.yellow)
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log('%cPreparing a beef hamburger', COLORS.red)
  }
}

class BeanHamburger implements Hamburger {
  prepare(): void {
    console.log('%cPreparing a bean hamburger', COLORS.green)
  }
}

abstract class Restaurant {
  abstract createHamburger(): Hamburger

  orderHamburger(): void {
    const hamburger = this.createHamburger()
    hamburger.prepare()
  }
}

class ChickenRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new ChickenHamburger()
  }
}

class BeefRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeefHamburger()
  }
}

class BeanRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeanHamburger()
  }
}

function main() {
  let restaurant: Restaurant

  const burgerType = prompt('Enter the type of hamburger (chicken/beef/bean): ')

  switch (burgerType?.toLowerCase()) {
    case 'chicken':
      restaurant = new ChickenRestaurant()
      break
    case 'beef':
      restaurant = new BeefRestaurant()
      break
    case 'bean':
      restaurant = new BeanRestaurant()
      break
    default:
      throw new Error('Invalid hamburger type')
  }

  restaurant.orderHamburger()
}

main()
