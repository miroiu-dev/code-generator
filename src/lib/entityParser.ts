import { Column, getCamelCaseString } from './parser';

export function getProperty(column: Column): string {
	const dataType = getDataType(column.dataType, column.isNullable);
	const required =
		dataType === 'string' && !column.isNullable ? ' = "";' : ' ';

	return `public ${dataType} ${column.columnName} { get; set; }${required}`;
}

export function getJsonProperties(columns: Column[]) {
	return columns
		.map(
			c => `\t///<summary>
\t/// Gets or sets ${c.columnName}
\t/// </summary>
\t[JsonProperty("${getCamelCaseString(c.columnName)}")]
\t${getProperty(c)}`
		)
		.join('\n\n');
}

export function getJsonPropertiesWithValidation(
	columns: Column[],
	name: string
) {
	return columns
		.map(c => {
			let code = `	///<summary>
	/// Gets or sets ${c.columnName}
	/// </summary>
	[JsonProperty("${getCamelCaseString(c.columnName)}")]`;

			if (!c.isNullable && c.columnName !== `${name}ID`)
				code += `\n\t[Required(ErrorMessageResourceName = "Required", ErrorMessageResourceType = typeof(Resources.ErrorMessages))]`;

			if (c.len > 0) {
				code += `\n\t[MaxLength(${c.len}, ErrorMessageResourceName = "MaxLength", ErrorMessageResourceType = typeof(Resources.ErrorMessages))]`;
			}

			code += `\n\t${getProperty(c)}`;

			return code;
		})
		.join('\n\n');
}

export function getAssignmentProperties(
	columns: Column[],
	tabs: number,
	endOfAssignment = ';'
) {
	return columns
		.map(
			c => `${'\t'.repeat(tabs)}${c.columnName} = entity.${c.columnName}`
		)
		.join(`${endOfAssignment}\n`);
}

export function getAssignments(
	columns: Column[],
	tabs: number,
	endOfAssignment = ';'
) {
	return columns
		.map(
			c => `${'\t'.repeat(tabs)}${c.columnName} = ${c.columnName}`
		)
		.join(`${endOfAssignment}\n`);
}

export function getDataType(type: string, isNullable: boolean): string {
	let result: string;

	switch (type) {
		case 'nvarchar':
			result = 'string';
			break;
		case 'varchar':
			result = 'string';
			break;
		case 'text':
			result = 'string';
			break;
		case 'bit':
			result = 'bool';
			break;
		case 'int':
			result = 'int';
			break;
		case 'decimal':
			result = 'decimal';
			break;
		case 'datetime':
			result = 'DateTime';
			break;
		default:
			result = 'object';
			break;
	}
	result = `${result}${isNullable ? '?' : ''}`;
	return result;
}
