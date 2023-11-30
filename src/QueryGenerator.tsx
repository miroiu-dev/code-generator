import {
	Button,
	Callout,
	Flex,
	Select,
	Switch,
	Text,
} from '@radix-ui/themes';
import { useState } from 'react';
import { SyntaxHighligherWithCopy } from './SyntaxHighligherWithCopy';
import { useTemplate } from './hooks/useTemplate';
import {
	getColumns,
	getColumnsWithoutID,
	getUpdateColumns,
	getFilterByID,
} from './lib/sqlParser';
import { useConfiguration } from './providers/useConfiguration';

type QueryType = 'insert' | 'update' | 'delete' | 'select' | 'get-by-id';

export function QueryGenerator() {
	const { name } = useConfiguration();
	const [queryType, setQueryType] = useState<QueryType>('select');
	const [pagination, setPagination] = useState(false);

	const { code, error, generate } = useTemplate({
		templateName: queryType,
		dir: 'sql',
		parameters: {
			name,
			pagination,
			getColumns,
			getColumnsWithoutID,
			getUpdateColumns,
			getFilterByID,
		},
	});

	const showOptions = queryType === 'select';

	return (
		<Flex direction="column" gap="3">
			<Select.Root
				value={queryType}
				onValueChange={q => setQueryType(q as QueryType)}
			>
				<Select.Trigger />
				<Select.Content>
					<Select.Item value="select">Select</Select.Item>
					<Select.Item value="insert">Insert</Select.Item>
					<Select.Item value="update">Update</Select.Item>
					<Select.Item value="delete">Delete</Select.Item>
					<Select.Item value="get-by-id">Get by ID</Select.Item>
				</Select.Content>
			</Select.Root>
			{showOptions && <Text>Configuration</Text>}
			{queryType === 'select' && (
				<Flex gap="2">
					<Switch
						checked={pagination}
						onCheckedChange={p => setPagination(p)}
					/>
					Pagination
				</Flex>
			)}

			<Button onClick={generate}>Generate</Button>
			{error ? (
				<Callout.Root color="red">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			) : (
				code && <SyntaxHighligherWithCopy code={code} language="sql" />
			)}
		</Flex>
	);
}
