/**
 * ! Facade Pattern
 * This pattern provides a unified interface for a set of interfaces
 * in a subsystem.
 *
 * Facade defines a higher-level interface that makes the subsystem
 * easier to use.
 *
 * * It's useful when a subsystem is complex or difficult to understand to
 * * provide a simplified interface for the client.
 *
 * https://refactoring.guru/design-patterns/facade
 */

import { COLORS } from '../helpers/colors.ts'

class Projector {
  turnOn() {
    console.log('Projector: turned on')
  }

  turnOff() {
    console.log('Projector: turned off')
  }
}

class SoundSystem {
  turnOn() {
    console.log('SoundSystem: turned on')
  }

  turnOff() {
    console.log('SoundSystem: turned off')
  }
}

class VideoPlayer {
  turnOn() {
    console.log('VideoPlayer: turned on')
  }

  play(movie: string) {
    console.log(`VideoPlayer: playing "${movie}"`)
  }

  stop() {
    console.log('VideoPlayer: stopped movie')
  }

  turnOff() {
    console.log('VideoPlayer: turned off')
  }
}

class PopcornMaker {
  turnOn() {
    console.log('PopcornMaker: popping popcorn!')
  }

  turnOff() {
    console.log('PopcornMaker: stopped popping popcorn!')
  }
}

interface HomeTheaterFacadeProps {
  projector: Projector
  soundSystem: SoundSystem
  videoPlayer: VideoPlayer
  popcornMaker: PopcornMaker
}

class HomeTheaterFacade {
  private projector: Projector
  private soundSystem: SoundSystem
  private videoPlayer: VideoPlayer
  private popcornMaker: PopcornMaker

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeProps) {
    this.projector = projector
    this.soundSystem = soundSystem
    this.videoPlayer = videoPlayer
    this.popcornMaker = popcornMaker
  }

  watchMovie(movie: string) {
    console.log('%cGet ready to watch a movie...', COLORS.blue)
    this.popcornMaker.turnOn()
    this.projector.turnOn()
    this.soundSystem.turnOn()
    this.videoPlayer.turnOn()
    this.videoPlayer.play(movie)

    console.log('%cEnjoy the movie!', COLORS.green)
  }

  endWatchMovie() {
    console.log('%cShutting movie theater down...', COLORS.blue)
    this.popcornMaker.turnOff()
    this.projector.turnOff()
    this.soundSystem.turnOff()
    this.videoPlayer.stop()
    this.videoPlayer.turnOff()

    console.log('%cMovie theater is closed.', COLORS.red)
  }
}

function main() {
  const projector = new Projector()
  const soundSystem = new SoundSystem()
  const videoPlayer = new VideoPlayer()
  const popcornMaker = new PopcornMaker()

  const homeTheater = new HomeTheaterFacade({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  })

  homeTheater.watchMovie('Inception')
  console.log('\n')
  homeTheater.endWatchMovie()
}

main()
