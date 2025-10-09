/**
 * ! Singleton:
 * It is a creational design pattern that guarantees that a class
 * has a single instance and provides a global access point to it.
 *
 * * It is useful when you need to control access to a single instance
 * * of a class, for example, in a database object or in a
 * * configuration object.
 *
 * https://refactoring.guru/design-patterns/singleton
 */

import { configManager } from './singleton/config-manager.ts'
import { COLORS } from '../helpers/colors.ts'

configManager.setConfig('apiUrl', 'https://api.example.com/api')
configManager.setConfig('timeout', '5000')
configManager.setConfig('apiKey', '1234567890')

console.log(`%cAPI URL: ${configManager.getConfig('apiUrl')}`, COLORS.pink)
console.log(`%cTimeout: ${configManager.getConfig('timeout')}`, COLORS.pink)
console.log(`%cAPI Key: ${configManager.getConfig('apiKey')}`, COLORS.pink)

console.log(
  `%cAll Config: ${JSON.stringify(configManager.getAllConfig(), null, 2)}`,
  COLORS.purple
)
