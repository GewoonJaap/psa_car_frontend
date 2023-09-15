import type { CarDetails } from '$lib/typedef/carDetailsFromABRP';

export function getCarImageWithDetails(CarDetails: CarDetails): string {
	return `https://cdn.imagin.studio/getImage?customer=img&make=${CarDetails.brand}&modelFamily=${CarDetails.model}&angle=23&width=2600&zoomType=fullscreen`;
}
