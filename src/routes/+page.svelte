<script lang="ts">
	import type { CarDetails } from "$lib/typedef/carDetailsFromABRP";
	import type { Vehicle, VehicleResult } from "$lib/typedef/getVehicleInfoResult";

     
    export let data: {
        vehicle: Vehicle;
        vehicleInfo: VehicleResult;
        carDetails: CarDetails;
        carImage: string;
    };
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<!-- Show car details -->

<img src={data.carImage} alt={`${data.carDetails.brand} ${data.carDetails.model} picture`} />

<h2>{data.carDetails.brand} {data.carDetails.model}</h2>
<p>Range: {data.vehicleInfo.energy[0].level}%</p>


