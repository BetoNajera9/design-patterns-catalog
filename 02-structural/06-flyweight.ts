/**
 * ! Flyweight Pattern
 * It's a structural design pattern that allows us to use shared objects
 * to efficiently support large quantities of objects.
 *
 * * It's useful when we need a large quantity of objects and want to reduce
 * * the amount of memory they use.
 *
 * https://refactoring.guru/design-patterns/flyweight
 */

import { COLORS } from '../helpers/colors.ts'

interface Location {
  display(coordinates: { x: number; y: number }): void
}

class LocationIcon implements Location {
  private iconImage: string
  private type: string

  constructor(icon: string, type: string) {
    this.iconImage = icon
    this.type = type
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coordinates ${this.type} in ${coordinates.x}, ${coordinates.y} with icon %c[${this.iconImage}]`,
      COLORS.green
    )
  }
}

// Flightweight Factory
class LocationIconFactory {
  private icons: Record<string, LocationIcon> = {}

  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log(`%cCreating new icon for type: ${type}`, COLORS.yellow)
      const iconImage = `image_of_${type}.png`
      this.icons[type] = new LocationIcon(iconImage, type)
    }

    return this.icons[type]
  }
}

class MapLocation {
  private coordinates: { x: number; y: number }
  private icon: LocationIcon

  constructor(coordinates: { x: number; y: number }, icon: LocationIcon) {
    this.coordinates = coordinates
    this.icon = icon
  }

  display(): void {
    this.icon.display(this.coordinates)
  }
}

function main() {
  const factory = new LocationIconFactory()

  const locations = [
    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon('hospital')),
    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon('hospital')),
    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon('hospital')),
    new MapLocation({ x: 15, y: 25 }, factory.getLocationIcon('restaurant')),
    new MapLocation({ x: 30, y: 40 }, factory.getLocationIcon('hotel')),
    new MapLocation({ x: 50, y: 60 }, factory.getLocationIcon('school')),
    new MapLocation({ x: 70, y: 80 }, factory.getLocationIcon('church')),
  ]

  locations.forEach((location) => location.display())
}

main()
