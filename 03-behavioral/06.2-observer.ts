/**
 * ! Observer Pattern
 * The Observer pattern is a behavioral design pattern that establishes
 * a one-to-many relationship between an object, called the subject,
 * and other objects, called observers, which are notified
 * and updated automatically by the subject
 * when changes occur in its state.
 *
 * * It's useful when we need several objects to be
 * * aware of changes
 *
 * !Not to be confused with RXJS Observables
 *
 * https://refactoring.guru/design-patterns/observer
 */

import { COLORS } from '../helpers/colors.ts'

// Observer Interface
interface Observer {
  update(weatherData: string): void
}

// Subject Class - WeatherStation
class WeatherStation {
  private observers: Observer[] = []
  private weatherData: string = 'Sunny'

  // Add an Observer
  subscribe(observer: Observer): void {
    this.observers.push(observer)

    console.log('%cNew app subscribed to weather system.', COLORS.green)
  }

  // Remove an Observer
  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer)

    console.log(`%cAn app has unsubscribed`, COLORS.red)
  }

  // Update weather and notify all Observers
  setWeather(weatherData: string): void {
    console.log(`\nWeather updated: %c${weatherData}`, COLORS.blue)

    this.weatherData = weatherData
    this.notifyObservers()
  }

  // Notify all Observers
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.weatherData)
    }
  }
}

// Observer Class - WeatherApp
class WeatherApp implements Observer {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  // Receive weather update
  update(weatherData: string): void {
    console.log(
      `%c${this.name} %chas received weather notification: %c${weatherData}`,
      COLORS.red,
      COLORS.white,
      COLORS.yellow
    )
  }
}

// Client Code for Testing
function main(): void {
  const weatherStation = new WeatherStation()

  // Create applications
  const flutterWeatherApp = new WeatherApp('Flutter WeatherApp')
  const reactNativeWeatherApp = new WeatherApp('React Native WeatherApp')
  const weatherTrackerApp = new WeatherApp('Weather Tracker App')

  // Subscribe applications to weather station
  weatherStation.subscribe(flutterWeatherApp)
  weatherStation.subscribe(reactNativeWeatherApp)

  // Update weather
  weatherStation.setWeather('Rainy')

  // Add a new application
  weatherStation.subscribe(weatherTrackerApp)
  weatherStation.setWeather('Cloudy')

  // An application unsubscribes
  weatherStation.unsubscribe(reactNativeWeatherApp)
  weatherStation.setWeather('Thunderstorm')
}

main()
