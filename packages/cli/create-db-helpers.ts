import { Project, SourceFile, SyntaxKind } from "ts-morph";

function generateMapFile(exportedVariables: Map<string, string>): string {
  const mapVariableName = "dbTableMap";
  const mapContent =
    `import { ${Array.from(exportedVariables).map(
      ([variableName, tableName]) => variableName
    )} } from "./schema";\n
    export const ${mapVariableName} = {\n` +
    Array.from(exportedVariables)
      .map(([variableName, tableName]) => `  ${tableName}: ${variableName}`)
      .join(",\n") +
    `\n};\n export type DBTables = keyof typeof ${mapVariableName};`;

  return mapContent;
}

function writeMapFile(mapContent: string, outputPath: string) {
  const project = new Project();
  const mapSourceFile = project.createSourceFile(outputPath, mapContent, {
    overwrite: true,
  });
  mapSourceFile.saveSync();
}

function findExportedVariables(sourceFile: SourceFile): Map<string, string> {
  const exportedVariables = new Map<string, string>();

  // Find all export declarations
  const exportDeclarations = sourceFile.getExportedDeclarations();

  exportDeclarations.forEach((s) => {
    const exportDeclaration = s[0];
    // Check if the export declaration is calling pgTable function
    const pgTableCall = exportDeclaration.getFirstDescendantByKind(
      SyntaxKind.CallExpression
    );
    if (pgTableCall && pgTableCall.getText().includes("pgTable")) {
      // Get the name of the exported variable
      const exportedVariable = exportDeclaration.getFirstDescendantByKind(
        SyntaxKind.Identifier
      );

      // Get the first parameter passed to the pgTable function
      const pgTableArguments = pgTableCall.getArguments();
      if (pgTableArguments.length > 0 && exportedVariable != undefined) {
        const tableName = pgTableArguments[0].getText();
        exportedVariables.set(exportedVariable.getText(), tableName);
      }
    }
  });

  return exportedVariables;
}

function main() {
  const project = new Project();
  const filePath = "../../src/lib/models/schema.ts"; // Update with your file path
  const outputMapFilePath = "../../src/lib/models/table-map.ts";
  const sourceFile = project.addSourceFileAtPath(filePath);

  const exportedVariables = findExportedVariables(sourceFile);

  // Output the results
  exportedVariables.forEach((tableName, variableName) => {
    console.log(`${variableName}: ${tableName}`);
  });

  const mapContent = generateMapFile(exportedVariables);
  writeMapFile(mapContent, outputMapFilePath);

  console.log(`Map file generated at: ${outputMapFilePath}`);
}

main();
