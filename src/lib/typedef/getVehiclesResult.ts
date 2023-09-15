export type Vehicles = Vehicle[]

export interface Vehicle {
  vin: string
  vehicle_id: string
  label: string
  brand: any
  abrp_name: string
  battery_power: number
  fuel_capacity: number
  max_elec_consumption: number
  max_fuel_consumption: number
}
