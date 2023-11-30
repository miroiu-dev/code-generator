export function getUriSegment(str: string): string {
	const arr: string[] = [];
	let lastIndex = 0;

	for (let i = 1; i < str.length; i++) {
		if (str[i] === str[i].toUpperCase()) {
			arr.push(str.substring(lastIndex, i).toLowerCase());
			lastIndex = i;
		}
	}

	arr.push(str.substring(lastIndex, str.length).toLocaleLowerCase());

	return arr.join('-');
}
