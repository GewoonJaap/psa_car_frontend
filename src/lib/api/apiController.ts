import type { ChargingSessions } from '$lib/typedef/getChargingSessionsResult';
import type { PositionsResult } from '$lib/typedef/getPositionsResult';
import type { Trips } from '$lib/typedef/getTripsResult';
import type { VehicleResult } from '$lib/typedef/getVehicleInfoResult';
import type { Vehicles } from '$lib/typedef/getVehiclesResult';
import * as log from '$lib/helpers/consoleLogHelper';

let currentEndpoint = 'https://psa-dev.mrproper.dev';
let alwaysWakeUp = false;

export async function getVehicles(): Promise<Vehicles> {
	log.info(`Getting all vehicles`);
	var response = await fetch(currentEndpoint + '/get_vehicles');
	return response.json();
}

export async function getCarPositions(): Promise<PositionsResult> {
	log.info(`Getting all car positions`);
	var response = await fetch(currentEndpoint + '/positions');
	return response.json();
}

export async function getCharingSessions(): Promise<ChargingSessions> {
	log.info(`Getting all charging sessions`);
	var response = await fetch(currentEndpoint + '/get_vehiclechargings');
	return response.json();
}

export async function getTrips(): Promise<Trips> {
	log.info(`Getting all trips`);
	var response = await fetch(currentEndpoint + '/trips');
	return response.json();
}
//False will unlock the door, true will lock it
export async function lockDoor(lockDoor: boolean, vin: string): Promise<void> {
	if (alwaysWakeUp) {
		await wakeCar(vin);
	}
	log.info(`${lockDoor ? 'Locking' : 'Unlocking'} the door for ${vin}`);
	var response = await fetch(currentEndpoint + '/lock_door/' + vin + '/' + (lockDoor ? 'lock' : 'unlock'));
	return;
}

export async function flashLights(vin: string): Promise<void> {
	if (alwaysWakeUp) {
		await wakeCar(vin);
	}
	log.info(`Flashing the lights for ${vin}`);
	var response = await fetch(currentEndpoint + '/lights/' + vin);
	return;
}

export async function horn(vin: string): Promise<void> {
	if (alwaysWakeUp) {
		await wakeCar(vin);
	}
	log.info(`Activating the horn for ${vin}`);
	var response = await fetch(currentEndpoint + '/horn/' + vin);
	return;
}

export async function getVehicleInfo(
	vin: string,
	ignoreCache: boolean = false
): Promise<VehicleResult> {
	if (alwaysWakeUp && ignoreCache) {
		await wakeCar(vin);
	}
	log.info(`Getting vehicle info for ${vin}`);
	var response = await fetch(
		currentEndpoint + '/get_vehicleinfo/' + vin + `?from_cache=${ignoreCache ? 0 : 1}`
	);
	return response.json();
}

export async function changePreconditioning(vin: string, turnOn: boolean): Promise<void> {
	if (alwaysWakeUp) {
		await wakeCar(vin);
	}
	log.info(`${turnOn ? 'Starting' : 'Stopping'} preconditioning for ${vin}`);
	const turnOnInt = turnOn ? 1 : 0;
	const response = await fetch(currentEndpoint + '/preconditioning/' + vin + '/' + turnOnInt);
	return;
}

export async function wakeCar(vin: string): Promise<void> {
	log.info(`Waking up ${vin}`);
	const response = await fetch(currentEndpoint + '/wakeup/' + vin);
	return;
}
