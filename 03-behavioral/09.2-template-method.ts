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

/**
 * !Objective:
 * Implement the Template Method pattern to simulate a cleaning system
 * for different types of rooms
 * (for example, a hotel room and a conference room).
 *
 * You must design a base class that defines the general cleaning flow
 * and subclasses that implement specific steps depending on the type
 * of room.
 *
 *
 *
 * ! Exercise Description
  The general cleaning process includes the following steps:
    1.	Enter the room: Open the door and enter.
    2.	Collect trash: Remove trash from bins.
    3.	Specific cleaning: Depends on the room type:
    •	In a hotel room, beds are made.
    •	In a conference room, tables are cleaned and chairs are organized.
    • In an office, desks are cleaned and documents are organized.
    4.	Disinfect surfaces: Disinfect main areas.
    5.	Exit the room: Close the door and mark as finished
 */

import { COLORS } from '../helpers/colors.ts'

// Base Class - RoomCleaning
abstract class RoomCleaning {
  // Template method: defines the general flow
  cleanRoom(): void {
    this.enterRoom()
    this.collectTrash()
    this.specificCleaning() // This method must be implemented
    this.disinfectSurfaces()
    this.exitRoom()

    console.log('Cleaning finished.\n')
  }

  // Common steps
  private enterRoom(): void {
    console.log('Entering the room...')
  }

  private collectTrash(): void {
    console.log('Collecting trash...')
  }

  private disinfectSurfaces(): void {
    console.log('Disinfecting surfaces...')
  }

  private exitRoom(): void {
    console.log('Exiting the room and marking it as clean.')
  }

  protected abstract specificCleaning(): void
}

// Subclass - HotelRoomCleaning
class HotelRoomCleaning extends RoomCleaning {
  protected override specificCleaning(): void {
    console.log('Making beds and replenishing bathroom items.')
  }
}

// Subclass - ConferenceRoomCleaning
class ConferenceRoomCleaning extends RoomCleaning {
  protected override specificCleaning(): void {
    console.log('Cleaning tables and organizing chairs.')
  }
}

// Subclass - OfficeCleaning
class OfficeCleaning extends RoomCleaning {
  protected override specificCleaning(): void {
    console.log('Cleaning desks and organizing documents.')
  }
}

// Client Code
function main(): void {
  console.log('%cCleaning a hotel room:', COLORS.blue)
  const hotelRoom = new HotelRoomCleaning()
  hotelRoom.cleanRoom()

  console.log('%cCleaning a conference room:', COLORS.purple)
  const conferenceRoom = new ConferenceRoomCleaning()
  conferenceRoom.cleanRoom()

  console.log('%cCleaning an office:', COLORS.orange)
  const office = new OfficeCleaning()
  office.cleanRoom()
}

main()
