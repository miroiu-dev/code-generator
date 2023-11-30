import { Column } from './parser';

export function getColumns(columns: Column[]) {
	return columns.map(c => `\t[${c.columnName}]`).join(', \n');
}

export function getUpdateColumns(columns: Column[]) {
	return columns
		.map(c => `\t[${c.columnName}] = @${c.columnName}`)
		.join(',\n');
}

export function getFilterByID(identityColumn: string) {
	return `[${identityColumn}] = @${identityColumn}`;
}

export function getColumnsWithoutID(columns: Column[], parameters = false) {
	const at = parameters ? '@' : '';
	const withBrackets = (c: Column) =>
		parameters ? `${at}${c.columnName}` : `[${c.columnName}]`;

	return columns
		.map(c => `\t${withBrackets(c)}`)
		.slice(1, columns.length)
		.join(',\n');
}
