export type Column = {
	columnName: string;
	isNullable: boolean;
	dataType: string;
	len: number;
};

export function stripSingleQuotes(str: string) {
	return str.substring(1, str.length - 1);
}

export function getCamelCaseString(str: string): string {
	return str[0].toLowerCase() + str.substring(1, str.length);
}

export function parseText(text: string) {
	const columns = text
		.split('\n')
		.filter(s => typeof s === 'string' && s.length > 0);

	const parsedColumns: Column[] = [];

	columns.forEach(c => {
		c = c.trim();
		c = c.substring(1, c.length - 2).trim();

		const column: Column = {
			columnName: '',
			dataType: '',
			isNullable: false,
			len: 0,
		};
		c.split(',').forEach(p => {
			p = p.trim();
			const [name, value] = p.split(':');
			const key = name.trim() as keyof Column;
			const trimmedValue = value.trim();
			if (key === 'isNullable') {
				column[key] = trimmedValue === 'true';
			} else if (key === 'len') {
				column[key] = Number.parseFloat(
					stripSingleQuotes(trimmedValue)
				);
			} else if (key === 'columnName' || key === 'dataType') {
				column[key] = stripSingleQuotes(trimmedValue);
			}
		});

		parsedColumns.push(column);
	});

	return parsedColumns;
}
