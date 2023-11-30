import { useState } from 'react';
import { eta, getTemplate } from '../lib/eta';
import { parseText } from '../lib/parser';
import { useConfiguration } from '../providers/useConfiguration';

type Parameters = {
	validation?: () => string | undefined;
	templateName: string;
	parameters: object;
	dir?: string;
};

export function useTemplate({
	templateName,
	dir = '',
	parameters,
	validation,
}: Parameters) {
	const { text } = useConfiguration();
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	const generate = async () => {
		try {
			setError('');
			const columns = parseText(text);

			const validationMessage = validation?.();

			if (validationMessage !== undefined) {
				setError(validationMessage);

				return;
			}

			const template = await getTemplate(templateName, dir);

			const parsedCode = await eta.renderStringAsync(template, {
				...parameters,
				columns,
				identityColumn: columns[0].columnName,
			});

			setCode(parsedCode);
		} catch (err: unknown) {
			console.log(err);
			setError((err as Error).message);
		}
	};

	return { code, error, generate, text };
}
