import { Eta } from 'eta';

export const eta = new Eta();

export async function getTemplate(name: string, dir = '') {
	const directory = dir ? `${dir}/` : '';
	return fetch(`/views/${directory}${name}.eta`).then(x => x.text());
}
