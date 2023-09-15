export type ChargingSessions = ChargingSession[];

export interface ChargingSession {
	start_at: string;
	stop_at?: string;
	VIN: string;
	start_level: number;
	end_level?: number;
	co2: any;
	kw?: number;
	price?: number;
	charging_mode: string;
	mileage?: number;
}
