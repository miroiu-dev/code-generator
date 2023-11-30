import { Button, Callout, Flex, Select, Switch, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { SyntaxHighligherWithCopy } from './SyntaxHighligherWithCopy';
import { useTemplate } from './hooks/useTemplate';
import {
	getProperty,
	getJsonPropertiesWithValidation,
	getAssignmentProperties,
	getJsonProperties,
	getAssignments,
} from './lib/entityParser';
import { getCamelCaseString } from './lib/parser';
import pluralize from 'pluralize';
import { useConfiguration } from './providers/useConfiguration';

type EntityType =
	| 'entity'
	| 'entities-representation'
	| 'entities-item-representation'
	| 'entity-representation'
	| 'payload';

export function EntityGenerator() {
	const { name } = useConfiguration();
	const [entityType, setEntityType] = useState<EntityType>('entity');
	const [space, setSpace] = useState(false);
	const [pagination, setPagination] = useState(false);
	const [customText, setCustomText] = useState(false);

	const pluralName = pluralize(name);

	const { code, error, generate } = useTemplate({
		templateName: entityType,
		dir: 'entity',
		parameters: {
			name,
			space,
			customText,
			pluralName,
			pagination,
			getAssignments,
			getProperty,
			getJsonPropertiesWithValidation,
			getAssignmentProperties,
			getCamelCaseString,
			getJsonProperties,
		},
	});

	const showCustomTextSwitch =
		entityType === 'entity' ||
		entityType === 'entity-representation' ||
		entityType === 'payload';
	const showSpaceBetweenLinesSwitch = entityType === 'entity';
	const showPaginationSwitch = entityType === 'entities-representation';

	return (
		<Flex direction="column" gap="3">
			<Select.Root
				value={entityType}
				onValueChange={e => setEntityType(e as EntityType)}
			>
				<Select.Trigger />
				<Select.Content>
					<Select.Item value="entity">Entity</Select.Item>
					<Select.Item value="entities-representation">
						Entities Representation
					</Select.Item>
					<Select.Item value="entities-item-representation">
						Entities Item Representation
					</Select.Item>
					<Select.Item value="entity-representation">
						Entity Representation
					</Select.Item>
					<Select.Item value="payload">Payload</Select.Item>
				</Select.Content>
			</Select.Root>
			<Text>Configuration</Text>
			{showPaginationSwitch && (
				<Flex gap="2">
					<Switch
						checked={pagination}
						onCheckedChange={p => setPagination(p)}
					/>
					Pagination
				</Flex>
			)}
			{showSpaceBetweenLinesSwitch && (
				<Flex gap="2">
					<Switch
						checked={space}
						onCheckedChange={c => setSpace(c)}
					/>
					Space between lines
				</Flex>
			)}
			{showCustomTextSwitch && (
				<Flex gap="2">
					<Switch
						checked={customText}
						onCheckedChange={c => setCustomText(c)}
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
