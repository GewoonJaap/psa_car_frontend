export interface VehicleResult {
    embedded: any
    links: Links
    battery: Battery
    doors_state: any
    energy: Energy[]
    environment: Environment
    ignition: Ignition
    kinetic: Kinetic
    last_position: LastPosition
    preconditionning: Preconditionning
    privacy: Privacy
    safety: any
    service: Service
    timed_odometer: TimedOdometer
  }
  
  export interface Links {
    _self: Self
    vehicle: Vehicle
  }
  
  export interface Self {
    deprecation: any
    href: string
    hreflang: any
    name: any
    profile: any
    templated: any
    title: any
    type: any
  }
  
  export interface Vehicle {
    deprecation: any
    href: string
    hreflang: any
    name: any
    profile: any
    templated: any
    title: any
    type: any
  }
  
  export interface Battery {
    current: any
    voltage: number
  }
  
  export interface Energy {
    updated_at: string
    autonomy: number
    battery?: Battery2
    charging?: Charging
    consumption: any
    level?: number
    residual: any
    type: string
  }
  
  export interface Battery2 {
    capacity: any
    health: Health
  }
  
  export interface Health {
    capacity: any
    resistance: number
  }
  
  export interface Charging {
    charging_mode: string
    charging_rate: number
    next_delayed_time: string
    plugged: boolean
    remaining_time: string
    status: string
  }
  
  export interface Environment {
    created_at: any
    air: Air
    luminosity: Luminosity
  }
  
  export interface Air {
    temp: number
  }
  
  export interface Luminosity {
    day: boolean
  }
  
  export interface Ignition {
    type: string
  }
  
  export interface Kinetic {
    acceleration: any
    moving: boolean
    pace: any
    speed: any
  }
  
  export interface LastPosition {
    type: string
    geometry: Geometry
    properties: Properties
  }
  
  export interface Geometry {
    coordinates: number[]
    type: string
  }
  
  export interface Properties {
    heading: number
    signal_quality: number
    type: string
    updated_at: string
  }
  
  export interface Preconditionning {
    air_conditioning: AirConditioning
  }
  
  export interface AirConditioning {
    status: string
    updated_at: string
    created_at: string
  }
  
  export interface Privacy {
    state: string
  }
  
  export interface Service {
    type: string
    updated_at: any
  }
  
  export interface TimedOdometer {
    updated_at: string
    mileage: number
  }
  