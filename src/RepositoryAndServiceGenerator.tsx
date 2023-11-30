import { Button, Callout, Flex, Select, Switch, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { SyntaxHighligherWithCopy } from './SyntaxHighligherWithCopy';
import { useTemplate } from './hooks/useTemplate';
import { getCamelCaseString } from './lib/parser';
import { getSwitchExpression } from './lib/repositoryParser';
import { getExtensionAssignment } from './lib/getExtensionAssignment';

import pluralize from 'pluralize';
import { useConfiguration } from './providers/useConfiguration';

type Type = 'repository' | 'service';

export function RepositoryAndServiceGenerator() {
	const { name } = useConfiguration();
	const [type, setType] = useState<Type>('repository');
	const [customText, setCustomText] = useState(false);
	const [compileExpression, setCompileExpression] = useState(false);

	const pluralName = pluralize(name);

	const { code, error, generate } = useTemplate({
		templateName: type,
		parameters: {
			name,
			pluralName,
			compileExpression,
			customText,
			getCamelCaseString,
			getSwitchExpression,
			getExtensionAssignment,
		},
	});

	return (
		<Flex direction="column" gap="3">
			<Select.Root value={type} onValueChange={t => setType(t as Type)}>
				<Select.Trigger />
				<Select.Content>
					<Select.Item value="repository">Repository</Select.Item>
					<Select.Item value="service">Service</Select.Item>
				</Select.Content>
			</Select.Root>
			<Text>Configuration</Text>

			<Flex gap="2">
				<Switch
					checked={customText}
					onCheckedChange={p => setCustomText(p)}
				/>
				Custom Text
			</Flex>
			{type === 'repository' && (
				<Flex gap="2">
					<Switch
						checked={compileExpression}
						onCheckedChange={e => setCompileExpression(e)}
					/>
					Compile Order By Expression
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
