<script lang="ts">
	import type { CarDetails } from "$lib/typedef/carDetailsFromABRP";
	import type { Vehicle, VehicleResult } from "$lib/typedef/getVehicleInfoResult";
    import carLogos from "$lib/const/carManufacturerLogos.json";
	import { capitalizeFirstLetter } from "$lib/helpers/stringHelper";

     
    export let data: {
        vehicle: Vehicle;
        vehicleInfo: VehicleResult;
        carDetails: CarDetails;
        carImage: string;
    };

    const carBrandImage = carLogos.find((car) => car.slug.toLowerCase() === data.carDetails.brand.toLowerCase());
</script>
<div class="carContentGrid">
    <div class="leftUpperGrid">
        <img class="carBrandImage" src={carBrandImage?.image.optimized} alt={`${data.carDetails.brand} logo`} />
    </div>
    <div class="centerUpperGrid">
        <h1>{capitalizeFirstLetter(`${data.carDetails.brand} ${data.carDetails.model}`)}</h1>
        {#if data.vehicleInfo.energy[0].charging?.plugged}
        <span class="emojiFont chargingEmoji">🔌⚡</span>
        {/if}
    </div>
    <div class="rightUpperGrid"></div>
    <!-- <div class="leftCenterGrid"></div> -->
    <div class="centerCenterGrid"><img class="carImage" src={data.carImage} alt={`${data.carDetails.brand} ${data.carDetails.model} picture`} /></div>
    <!-- <div class="rightCenterGrid"></div> -->
    <div class="leftLowerGrid"></div>
    <div class="centerLowerGrid"></div>
    <div class="rightLowerGrid"></div>
</div>

<style>
    .carContentGrid {
        display: grid;
        grid-template-columns: 0.5fr 1fr 0.5fr;
        grid-template-rows: 0.5fr 1fr 0.5fr;
        gap: 0px 0px;
        grid-template-areas:
            "leftUpperGrid centerUpperGrid rightUpperGrid"
            "centerCenterGrid centerCenterGrid centerCenterGrid"
            "leftLowerGrid centerLowerGrid rightLowerGrid";
    }
    .carContentGrid div {
        border: 1px solid black;
    }
    .leftUpperGrid {
        grid-area: leftUpperGrid;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .centerUpperGrid {
        grid-area: centerUpperGrid;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .rightUpperGrid {
        grid-area: rightUpperGrid;
    }
    .leftCenterGrid {
        grid-area: leftCenterGrid;
    }
    .centerCenterGrid {
        display: flex;
        grid-area: centerCenterGrid;
        justify-content: center;
        align-items: center;
    }
    .rightCenterGrid {
        grid-area: rightCenterGrid;
    }
    .leftLowerGrid {
        grid-area: leftLowerGrid;
    }
    .centerLowerGrid {
        grid-area: centerLowerGrid;
    }
    .rightLowerGrid {
        grid-area: rightLowerGrid;
    }
    .carImage{
        width: 50%;
        animation: fadeIn ease 1s;
        -webkit-animation: fadeIn ease 1s;
        -moz-animation: fadeIn ease 1s;
        -o-animation: fadeIn ease 1s;
    }
    .carBrandImage{
        width: 50%;
    }

    .chargingEmoji{
        font-size: 2rem;
    }
</style>


