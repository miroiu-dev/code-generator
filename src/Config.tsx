import { Box, Button, Flex, Text, TextArea, TextField } from '@radix-ui/themes';
import { SyntaxHighligherWithCopy } from './SyntaxHighligherWithCopy';
import { useConfiguration } from './providers/useConfiguration';

const query = (name: string) => `select    
    '{ columnName: ''' + COLUMN_NAME + ''', ' + 
     ' isNullable: ' + ( case IS_NULLABLE when 'YES' then 'true' else 'false' end ) + ', ' + 
     ' dataType: ''' + DATA_TYPE + ''', ' +
     ' len: ''' + cast(isnull(CHARACTER_MAXIMUM_LENGTH, 0) as nvarchar(MAX)) + ''' }, '
from    INFORMATION_SCHEMA.COLUMNS   
where    TABLE_NAME = '${name}' 
`;

const copy = async (str: string) => {
	await navigator.clipboard.writeText(str);
};

export function Config() {
	const { name, setName, setText, text } = useConfiguration();

	const code = query(name);

	return (
		<Flex direction="column" gap="3">
			<Box>
				<Text>Entity name</Text>
				<TextField.Input
					mt="3"
					size="3"
					value={name}
					onChange={({ target }) => setName(target.value)}
				/>
			</Box>
			<Box>
				<Text>Columns</Text>
				<TextArea
					value={text}
					mt="3"
					size="3"
					onChange={({ target }) => setText(target.value)}
					style={{ height: 150 }}
				></TextArea>
			</Box>
			<Flex>
				<Button onClick={() => copy(text.split('\n').join('\\n'))}>
					Copy formatted for generator
				</Button>
			</Flex>
			<SyntaxHighligherWithCopy code={code} language="sql" />
		</Flex>
	);
}
