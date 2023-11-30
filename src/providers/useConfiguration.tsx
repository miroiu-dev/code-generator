import { useContext } from 'react';
import {
	ConfigurationContext,
} from './ConfigurationProvider';

export function useConfiguration() {
	const context = useContext(ConfigurationContext);

	if (context === undefined) {
		throw new Error(
			'useConfiguration must be within ConfigurationProvider'
		);
	}

	return context;
}
