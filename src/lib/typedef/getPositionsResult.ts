export interface PositionsResult {
    features: Feature[]
    type: string
  }
  
  export interface Feature {
    geometry: Geometry
    properties: Properties
    type: string
  }
  
  export interface Geometry {
    coordinates: number[]
    type: string
  }
  
  export interface Properties {
    date: string
    level: number
    level_fuel: any
    mileage: number
    vin: string
  }
  