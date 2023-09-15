import { getVehicleInfo, getVehicles } from '$lib/api/apiController';
import { getCarDetailsFromABRP } from '$lib/helpers/carDetailsFromAbrp';
import { getCarImageWithDetails } from '$lib/helpers/carImageFetcher';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const vehicles = await getVehicles();
	console.log(vehicles);
	if (!vehicles) return;
	const vehicleInfo = await getVehicleInfo(vehicles[0].vin);
	console.log(vehicleInfo);
	const carDetails = getCarDetailsFromABRP(vehicles[0].abrp_name);
	console.log(carDetails);
	const carImage = getCarImageWithDetails(carDetails);
	return {
		vehicle: vehicles[0],
		vehicleInfo: vehicleInfo,
		carImage: carImage,
		carDetails: carDetails
	};
}
