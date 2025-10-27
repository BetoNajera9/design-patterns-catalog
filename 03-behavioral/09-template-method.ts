/**
 * ! Template Method Pattern
 *
 * The Template Method pattern is a behavioral design pattern
 * that defines the skeleton of an algorithm in an operation,
 * delegating some steps to subclasses.
 *
 * It allows subclasses to redefine certain steps of an algorithm
 * without changing its structure.
 *
 * * It's useful when you have an algorithm that follows a sequence of steps
 * * and you want to allow subclasses to redefine some of those steps.
 *
 * https://refactoring.guru/design-patterns/template-method
 */

import { COLORS } from '../helpers/index.ts'

/**
 * Context: We're going to implement a system that allows preparing
 * different hot beverages, like coffee and tea.
 *
 * Although the general process for preparing both beverages is similar
 * (boil water, add the main ingredient, serve in a cup),
 * there are specific steps that vary depending on the beverage.
 *
 * The Template Method pattern is perfect for this case,
 * as it defines a general skeleton of the algorithm in a base class
 * and delegates specific details to subclasses.
 */

abstract class HotBeverage {
  prepare(): void {
    this.boilWater()
    this.addMainIngredient()
    this.pourInCup()
    this.addCondiments()
  }

  private boilWater(): void {
    console.log('Boiling water...')
  }

  private pourInCup(): void {
    console.log('Pouring into cup...')
  }

  protected abstract addMainIngredient(): void
  protected abstract addCondiments(): void
}

class Tea extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Adding tea leaves...')
  }

  protected override addCondiments(): void {
    console.log('Adding honey and lemon...')
  }
}

class Coffee extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Adding coffee grounds...')
  }

  protected override addCondiments(): void {
    console.log('Adding sugar and milk...')
  }
}

class HotChocolate extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Adding cocoa powder...')
  }

  protected override addCondiments(): void {
    console.log('Adding marshmallows...')
  }
}

function main() {
  console.log('\n%cPreparing Tea:', COLORS.green)
  const tea = new Tea()
  tea.prepare()

  console.log('\n%cPreparing Coffee:', COLORS.brown)
  const coffee = new Coffee()
  coffee.prepare()

  console.log('\n%cPreparing Hot Chocolate:', COLORS.purple)
  const hotChocolate = new HotChocolate()
  hotChocolate.prepare()
}

main()
