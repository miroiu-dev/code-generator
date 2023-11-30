import { Box, Container, Tabs } from '@radix-ui/themes';
import { QueryGenerator } from './QueryGenerator';
import { Config } from './Config';
import { EntityGenerator } from './EntityGenerator';
import { ControllerGenerator } from './ControllerGenerator';
import { RepositoryAndServiceGenerator } from './RepositoryAndServiceGenerator';
import { ConfigurationProvider } from './providers/ConfigurationProvider';
import { Generator } from './Generator';

function App() {
	return (
		<Container>
			<Tabs.Root defaultValue="config">
				<Tabs.List>
					<Tabs.Trigger value="config">Configuration</Tabs.Trigger>
					<Tabs.Trigger value="query">Query Generator</Tabs.Trigger>
					<Tabs.Trigger value="entity">Entity Generator</Tabs.Trigger>
					<Tabs.Trigger value="controller">
						Controller Generator
					</Tabs.Trigger>
					<Tabs.Trigger value="service/repository">
						Service/Repository Generator
					</Tabs.Trigger>
					<Tabs.Trigger value="generator">Generator</Tabs.Trigger>
				</Tabs.List>
				<Box mt="4">
					<ConfigurationProvider>
						<Tabs.Content value="config">
							<Config />
						</Tabs.Content>

						<Tabs.Content value="query">
							<QueryGenerator />
						</Tabs.Content>

						<Tabs.Content value="entity">
							<EntityGenerator />
						</Tabs.Content>
						<Tabs.Content value="controller">
							<ControllerGenerator />
						</Tabs.Content>
						<Tabs.Content value="service/repository">
							<RepositoryAndServiceGenerator />
						</Tabs.Content>
						<Tabs.Content value="generator">
							<Generator />
						</Tabs.Content>
					</ConfigurationProvider>
				</Box>
			</Tabs.Root>
		</Container>
	);
}

export default App;
