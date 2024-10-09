import { ColumnType, type Anonymizer } from "@databye/anonymizers";
import { createLogger } from "@databye/common";
import { BaseColumnProcessor } from "@databye/processor";
import { readFileSync, writeFileSync } from "fs";
import Papa from "papaparse";
const { parse, unparse } = Papa;
const logger = createLogger();

export class CSVProcessor extends BaseColumnProcessor {
  constructor(private readonly filePath: string) {
    super();
  }

  async getColumnType(_columnName: string): Promise<ColumnType> {
    // everything is a string in csv
    return ColumnType.String;
  }

  async processColumn(
    columnName: string,
    columnType: ColumnType,
    anonymizer: Anonymizer
  ) {
    processCsv(this.filePath, columnType, columnName, anonymizer);
  }
  catch(error: unknown) {
    logger.error(error);
  }
}

// Function to process the CSV and mask values in the specified column
function processCsv(
  filePath: string,
  columnType: ColumnType,
  columnName: string,
  anonymizer: Anonymizer
) {
  // Read the CSV file asynchronously
  const csvFileString = readFileSync(filePath, "utf-8");

  // Parse the CSV data
  const csvFile = parse(csvFileString, {
    header: true,
    dynamicTyping: true,
  });

  // Mask the specified column
  csvFile.data.forEach((row: any) => {
    if (row[columnName]) {
      // Anonymize
      const anonymizedValue: any = anonymizer.anonymize(
        row[columnName],
        columnType
      );
      row[columnName] = anonymizedValue;
    }
  });

  // Convert back to CSV
  const updatedCsv = unparse(csvFile.data);

  // Write the updated CSV to a file asynchronously
  writeFileSync(filePath, updatedCsv);
}
