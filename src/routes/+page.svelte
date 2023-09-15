<script lang="ts">
	import type { CarDetails } from "$lib/typedef/carDetailsFromABRP";
	import type { VehicleResult } from "$lib/typedef/getVehicleInfoResult";
    import carLogos from "$lib/const/carManufacturerLogos.json";
	import { capitalizeFirstLetter } from "$lib/helpers/stringHelper";
	import { onMount } from "svelte";
	import { changePreconditioning, flashLights, getVehicleInfo, horn, lockDoor } from "$lib/api/apiController";
    import * as log from '$lib/helpers/consoleLogHelper';
	import type { Vehicle } from "$lib/typedef/getVehiclesResult";

     
    export let data: {
        vehicle: Vehicle;
        vehicleInfo: VehicleResult;
        carDetails: CarDetails;
        carImage: string;
        vin: string;
    };

    onMount(async () => {
        setInterval(async () => {
            log.info('Refreshing vehicle info');
            await refreshVehicleInfo();
        }, 1000 * 60);
    });

    async function refreshVehicleInfo(ignoreCache: boolean = false){
        data.vehicleInfo = await getVehicleInfo(data.vin, ignoreCache);
    }

    async function toggleAirco(){
        log.info('Toggling airco');
        const isAircoEnabled = data.vehicleInfo.preconditionning.air_conditioning.status.toLowerCase() != "disabled";
        const newAircoState = !isAircoEnabled;
        await changePreconditioning(data.vin, newAircoState);
        await refreshVehicleInfo(true);
    }

    const carBrandImage = carLogos.find((car) => car.slug.toLowerCase() === data.carDetails.brand.toLowerCase());


	async function blinkLight() {
        await flashLights(data.vin);
	}

    async function soundHorn(){
        await horn(data.vin);
    }

    async function toggleDoor(){
        await lockDoor(false, data.vin)
    }

</script>
<div class="carContentGrid">
    <div class="leftUpperGrid">
        <img class="carBrandImage" src={carBrandImage?.image.optimized} alt={`${data.carDetails.brand} logo`} />
    </div>
    <div class="centerUpperGrid">
        <div>
        <h1>{capitalizeFirstLetter(`${data.carDetails.brand} ${data.carDetails.model}`)}</h1>
        {#if data.vehicleInfo.energy[0].charging?.plugged}
        <span class="emojiFont chargingEmoji">🔌</span>
        {#if data.vehicleInfo.energy[0].charging?.status.toLowerCase() == "inprogress"}
        <span class="emojiFont chargingEmoji">⚡</span>
        {/if}
        {#if data.vehicleInfo.energy[0].charging?.status.toLowerCase() == "finished"}
        <span class="emojiFont chargingEmoji">✅</span>
        {/if}
        {#if data.vehicleInfo.energy[0].charging?.charging_mode.toLowerCase() == "slow" && data.vehicleInfo.energy[0].charging?.status.toLowerCase() == "inprogress"}
        <span class="emojiFont chargingEmoji">🐌</span>
        {/if}
        {/if}
    </div>
    <div>
        <p>
            <span class="emojiFont chargingEmoji">⏲️</span>
            {data.vehicleInfo.timed_odometer.mileage}KM | 
            <span class="emojiFont chargingEmoji">{data.vehicleInfo.energy[0].level > 50 ?'🔋' : '🪫'}</span>
            {data.vehicleInfo.energy[0].level}% ({data.vehicleInfo.energy[0].autonomy}KM)
        </p>
        {#if data.vehicleInfo.energy[0].charging?.status.toLowerCase() == "inprogress"}
        <span> | {data.vehicleInfo.energy[0].charging?.remaining_time.split('PT')[1]} remaining</span>
        {/if}
    </div>
    </div>
    <div class="rightUpperGrid"></div>
    <div class="centerCenterGrid">
        <img class="carImage" src={data.carImage} alt={`${data.carDetails.brand} ${data.carDetails.model} picture`} />
    </div>
    <div class="leftLowerGrid">
        <h1>Airconditioning <span class="emojiFont chargingEmoji">🥶</span></h1>
        <div class="airconitioningGrid">
            <div>
                <span class="emojiFont chargingEmoji">🌡️</span>
                {data.vehicleInfo.environment.air.temp}°C outside
            </div>
            <div>
                <span class="emojiFont chargingEmoji">🌬️</span>
                {data.vehicleInfo.preconditionning.air_conditioning.status}
            </div>
            <div>
                <button on:click={toggleAirco} class={`aircoToggleBtn airco-${data.vehicleInfo.preconditionning.air_conditioning.status.toLowerCase() == "disabled" ? 'off' : 'on'}`}>Turn {data.vehicleInfo.preconditionning.air_conditioning.status.toLowerCase() == "disabled" ? 'On' : 'Off'} airconditioning</button>
            </div>
            </div>
    </div>
    <div class="centerLowerGrid"></div>
    <div class="rightLowerGrid">
        <h1>Fun stuff <span class="emojiFont chargingEmoji">😜🥸</span></h1>
        <div class="airconitioningGrid">
            <div>
                <button on:click={blinkLight} class="funStuffBtn">
                    Blink 
                    <span class="emojiFont chargingEmoji">💡💡</span>
                </button>
            </div>
            <div>
                <button on:click={soundHorn} class="funStuffBtn">
                    Activate 
                    <span class="emojiFont chargingEmoji">📯</span>
                    3 times
                </button>
            </div>
            <div>
                <button on:click={toggleDoor} class="funStuffBtn">
                    Unlock door
                    <span class="emojiFont chargingEmoji">🔑</span>
                </button>
            </div>
            </div>
    </div>
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
        flex-direction: column;
        font-size: 1.5rem;
    }

    .centerUpperGrid div {
        margin: 0.5rem;
        display: flex;
        align-items: center;
        text-align: center;
    }
    .rightUpperGrid {
        grid-area: rightUpperGrid;
    }
    .centerCenterGrid {
        display: flex;
        grid-area: centerCenterGrid;
        justify-content: center;
        align-items: center;
    }
    .leftLowerGrid {
        grid-area: leftLowerGrid;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .centerLowerGrid {
        grid-area: centerLowerGrid;
    }
    .rightLowerGrid {
        grid-area: rightLowerGrid;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
    .aircoToggleBtn{
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        font-size: 1rem;
        margin: 0.5rem;
    }

    button:hover{
        cursor: pointer;
    }
    .airco-on {
        background-color: #f44336;
    }
    .airco-off {
        background-color: #4CAF50;
    }

    .funStuffBtn{
        margin-top: 0.5em;
        width: 100%;
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        font-size: 1.5rem;
        text-align: center;
    }
</style>


