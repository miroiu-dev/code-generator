import { Box, Button } from '@radix-ui/themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export type SyntaxHighligherWithCopyProps = {
	code: string;
	language: string;
};

const copy = async (str: string) => {
	await navigator.clipboard.writeText(str);
};

export function SyntaxHighligherWithCopy({
	code,
	language,
}: SyntaxHighligherWithCopyProps) {
	return (
		<Box>
			<Button onClick={() => copy(code)}>Copy to clipboard</Button>
			<SyntaxHighlighter language={language} style={atomDark}>
				{code}
			</SyntaxHighlighter>
		</Box>
	);
}
