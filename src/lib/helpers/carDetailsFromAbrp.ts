import type { CarDetails } from '$lib/typedef/carDetailsFromABRP';

export function getCarDetailsFromABRP(abrpEntry: string): CarDetails {
	const splittedEntry = abrpEntry.split(':');
	return {
		brand: splittedEntry[0],
		model: splittedEntry[1]
	};
}
