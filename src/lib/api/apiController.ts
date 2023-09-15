import type { ChargingSessions } from '$lib/typedef/getChargingSessionsResult';
import type { PositionsResult } from '$lib/typedef/getPositionsResult';
import type { Trips } from '$lib/typedef/getTripsResult';
import type { VehicleResult } from '$lib/typedef/getVehicleInfoResult';
import type { Vehicles } from '$lib/typedef/getVehiclesResult';

var currentEndpoint = "https://psa-dev.mrproper.dev";

export async function getVehicles(): Promise<Vehicles>{
    var response = await fetch(currentEndpoint + "/get_vehicles");
    return response.json();
}

export async function getCarPositions(): Promise<PositionsResult>{
    var response = await fetch(currentEndpoint + "/positions");
    return response.json();
}

export async function getCharingSessions(): Promise<ChargingSessions>{
    var response = await fetch(currentEndpoint + "/get_vehiclechargings");
    return response.json();
}

export async function getTrips(): Promise<Trips>{
    var response = await fetch(currentEndpoint + "/trips");
    return response.json();
}
//False will unlock the door, true will lock it
export async function lockDoor(lockDoor: boolean, vin: string): Promise<void>{
    var response = await fetch(currentEndpoint + "/lock_door/" + vin + lockDoor ? 'lock' : 'unlock');
    return;
}

export async function flashLights(vin: string): Promise<void>{
    var response = await fetch(currentEndpoint + "/lights/" + vin);
    return;
}

export async function horn(vin: string): Promise<void>{
    var response = await fetch(currentEndpoint + "/horn/" + vin);
    return;
}

export async function getVehicleInfo(vin: string): Promise<VehicleResult>{
    var response = await fetch(currentEndpoint + "/get_vehicleinfo/" + vin + '?from_cache=1');
    return response.json();
}