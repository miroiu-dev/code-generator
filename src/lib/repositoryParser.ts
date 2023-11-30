import { Column } from './parser';

export function getSwitchExpression(columns: Column[], name: string) {
	return columns
		.map(
			c =>
				`\t\t\t"${c.columnName.toLocaleLowerCase()}" => "${name}.${
					c.columnName
				} {direction}"`
		)
		.join(',\n');
}
