import { Flex, Link } from '@radix-ui/themes';

export function Generator() {
	return (
		<Flex>
			<Link href="/generator.rar" download="test.rar">
				Download Generator
			</Link>
		</Flex>
	);
}
