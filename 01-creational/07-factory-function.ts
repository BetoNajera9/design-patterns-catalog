/**
import { COLORS } from '../helpers/colors';
 * ! Factory Function
 * It is a design pattern that allows us to create objects or functions dynamically that will be
 * used later in the code.
 *
 * * It is useful when we need to create objects or functions dynamically,
 * * that is, at runtime and not at compile time.
 *
 */

import { COLORS } from '../helpers/colors.ts'

// i18n
type Language = 'en' | 'es' | 'fr'

function createGreeter(lang: Language) {
  return function greet(name: string) {
    const messages = {
      en: `Hello, %c${name}!`,
      es: `Hola, %c${name}!`,
      fr: `Bonjour, %c${name}!`,
    }

    return console.log(messages[lang], COLORS.red)
  }
}

function main() {
  const spanishGreeter = createGreeter('es')
  const englishGreeter = createGreeter('en')
  const frenchGreeter = createGreeter('fr')

  spanishGreeter('Roberto')
  englishGreeter('John')
  frenchGreeter('Jean')
}

main()
