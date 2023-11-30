import { createContext, useState } from 'react';

export type ConfigurationContext = {
	name: string;
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	setName: React.Dispatch<React.SetStateAction<string>>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ConfigurationProviderProps = {};

const example = `{ columnName: 'CustomerID',  isNullable: false,  dataType: 'int',  len: '0' },
{ columnName: 'FirstName',  isNullable: true,  dataType: 'varchar',  len: '255'},
{ columnName: 'LastName',  isNullable: false,  dataType: 'varchar',  len: '255' },`;

export const ConfigurationContext = createContext<
	ConfigurationContext | undefined
>(undefined);

export function ConfigurationProvider({
	children,
}: React.PropsWithChildren<ConfigurationProviderProps>) {
	const [text, setText] = useState(example);
	const [name, setName] = useState('Customer');

	return (
		<ConfigurationContext.Provider value={{ name, text, setText, setName }}>
			{children}
		</ConfigurationContext.Provider>
	);
}
