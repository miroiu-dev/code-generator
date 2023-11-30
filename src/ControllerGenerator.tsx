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
import pluralize from 'pluralize';
import { getUriSegment } from './lib/controllerParser.ts';
import { getCamelCaseString } from './lib/parser.ts';
import { useConfiguration } from './providers/useConfiguration.tsx';

export type ControllerType =
	| 'get-all'
	| 'get-item'
	| 'insert'
	| 'update'
	| 'delete'
	| 'rels';

export function ControllerGenerator() {
	const { name } = useConfiguration();
	const [pagination, setPagination] = useState(false);
	const [customQuery, setCustomQuery] = useState(false);
	const [customText, setCustomText] = useState(false);
	const [controllerType, setControllerType] =
		useState<ControllerType>('rels');

	const pluralName = pluralize(name);

	const showOptions =
		controllerType === 'get-all' ||
		controllerType === 'get-item' ||
		controllerType === 'insert' ||
		controllerType === 'update';

	const { code, error, generate } = useTemplate({
		templateName: controllerType,
		dir: 'controller',
		parameters: {
			name,
			pluralName,
			pagination,
			customQuery,
			customText,
			getUriSegment,
			getCamelCaseString,
		},
	});

	return (
		<Flex direction="column" gap="3">
			<Select.Root
				value={controllerType}
				onValueChange={c => setControllerType(c as ControllerType)}
			>
				<Select.Trigger />
				<Select.Content>
					<Select.Item value="rels">Rels</Select.Item>
					<Select.Item value="get-all">Get All</Select.Item>
					<Select.Item value="get-item">Get Item</Select.Item>
					<Select.Item value="insert">Insert</Select.Item>
					<Select.Item value="update">Update</Select.Item>
					<Select.Item value="delete">Delete</Select.Item>
				</Select.Content>
			</Select.Root>

			{showOptions && (
				<>
					<Text>Configuration</Text>
				</>
			)}
			{controllerType === 'get-all' && (
				<>
					<Flex gap="2">
						<Switch
							checked={pagination}
							onCheckedChange={p => {
								if (!p) setCustomQuery(false);
								setPagination(p);
							}}
						/>
						Pagination
					</Flex>
					{pagination && (
						<Flex gap="2">
							<Switch
								checked={customQuery}
								onCheckedChange={q => setCustomQuery(q)}
							/>
							Custom Query
						</Flex>
					)}
				</>
			)}
			{(controllerType === 'get-item' ||
				controllerType === 'insert' ||
				controllerType === 'update') && (
				<Flex gap="2">
					<Switch
						checked={customText}
						onCheckedChange={p => setCustomText(p)}
					/>
					Custom Text
				</Flex>
			)}
			<Button onClick={generate}>Generate</Button>
			{error ? (
				<Callout.Root color="red">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			) : (
				code && (
					<SyntaxHighligherWithCopy code={code} language="csharp" />
				)
			)}
		</Flex>
	);
}
