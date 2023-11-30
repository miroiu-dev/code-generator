import { Column } from './parser';

export function getExtensionAssignment(columns: Column[]) {
	return columns
		.map(c => `\t\tcurrent.${c.columnName} = entity.${c.columnName}`)
		.join(`;\n`);
}
