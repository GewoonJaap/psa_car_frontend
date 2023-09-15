export type Trips = Trip[]

export interface Trip {
  consumption_km: number
  start_at: string
  consumption_by_temp: any
  positions: Positions
  duration: number
  speed_average: number
  distance: number
  mileage: number
  altitude_diff: number
  id: number
  consumption: number
}

export interface Positions {
  lat: number[]
  long: number[]
}
