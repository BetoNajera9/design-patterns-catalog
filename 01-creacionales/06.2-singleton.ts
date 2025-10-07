/**
 * ! Singleton:
 * It is a creational design pattern that guarantees that a class
 * has a single instance and provides a global access point to it.
 *
 * * It is useful when you need to control access to a single instance
 * * of a class, for example, in a database object or in a
 * * configuration object.
 */

import { COLORS } from '../helpers/colors.ts'

class DatabaseConnection {
  private static instance: DatabaseConnection
  private connected: boolean = false

  // Private constructor to prevent direct instances
  private constructor() { }

  // Static method to get the unique instance
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
      console.log(
        '%c\nCreating a new instance of DatabaseConnection',
        COLORS.blue
      )
    }

    return DatabaseConnection.instance
  }

  // Method to connect to the database
  public connect(): void {
    if (this.connected) {
      console.log('%cThere is already an active connection', COLORS.yellow)
      return
    }

    this.connected = true
    console.log('%cConnected to the database', COLORS.green)
  }

  // Method to disconnect from the database
  public disconnect(): void {
    if (!this.connected) {
      console.log('%cNo active connection to close', COLORS.yellow)
      return
    }

    console.log('%cConnection closed', COLORS.red)
    this.connected = false
  }
}

// Tests
function main() {
  const db1 = DatabaseConnection.getInstance()
  db1.connect() // Should connect to the database

  const db2 = DatabaseConnection.getInstance()
  db2.connect() // Should show that there is already an active connection

  console.log('Are equal:', db1 === db2) // Should show true

  db1.disconnect() // Should close the connection

  db1.disconnect()

  db2.connect() // Now it should connect again, since the previous one was closed
}

main()
