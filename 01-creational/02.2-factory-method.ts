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
 */

/**
 * 	!Description:
  1.	Complete the SalesReport and InventoryReport classes to implement
      the Report interface, generating the content of each report in the generate method.

  2.	Implement the SalesReportFactory and InventoryReportFactory classes
      to create instances of SalesReport and InventoryReport, respectively.

  3.	Test the program by generating different types of reports using
      the prompt to select the report type.
 */

import { COLORS } from '../helpers/colors.ts'

// 1. Define the Report interface
interface Report {
  generate(): void
}

// 2. Concrete Report classes
class SalesReport implements Report {
  generate(): void {
    console.log('%cGenerating sales report...', COLORS.blue)
  }
}

class InventoryReport implements Report {
  generate(): void {
    console.log('%cGenerating inventory report...', COLORS.green)
  }
}

class AnotherReport implements Report {
  generate(): void {
    console.log('%cGenerating another report...', COLORS.yellow)
  }
}

// 3. Base ReportFactory Class with the Factory Method
abstract class ReportFactory {
  protected abstract createReport(): Report

  generateReport(): void {
    const report = this.createReport()
    report.generate()
  }
}

// 4. Concrete Report Factory Classes
class SalesReportFactory extends ReportFactory {
  createReport(): Report {
    return new SalesReport()
  }
}

class InventoryReportFactory extends ReportFactory {
  createReport(): Report {
    return new InventoryReport()
  }
}

class AnotherReportFactory extends ReportFactory {
  createReport(): Report {
    return new AnotherReport()
  }
}

// 5. Client Code for Testing
function main() {
  let reportFactory: ReportFactory

  const reportType = prompt(
    'What type of report do you want? (sales/inventory/another): '
  )

  console.log('Report type:', reportType)

  switch (reportType?.toLowerCase()) {
    case 'sales':
      reportFactory = new SalesReportFactory()
      break
    case 'inventory':
      reportFactory = new InventoryReportFactory()
      break
    case 'another':
      reportFactory = new AnotherReportFactory()
      break
    default:
      throw new Error('Invalid report type.')
  }

  reportFactory.generateReport()
}

main()
