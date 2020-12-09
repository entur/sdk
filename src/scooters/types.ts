export enum ScooterOperator {
    VOI = 'voi',
    TIER = 'tier',
    ZVIPP = 'zvipp',
    LIME = 'lime',
    BOLT = 'bolt',
}

interface BaseScooter {
    id: string
    lat: number
    lon: number
    code?: string
    rental_uris?: {
        android: string
        ios: string
    }
}

export interface StandardScooter extends BaseScooter {
    operator: ScooterOperator.BOLT
}

export interface BatteryScooter extends BaseScooter {
    operator: ScooterOperator.VOI | ScooterOperator.TIER | ScooterOperator.ZVIPP
    battery: number
}

export enum BatteryLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface BatteryLevelScooter extends BaseScooter {
    operator: ScooterOperator.LIME
    batteryLevel: BatteryLevel
}

export type Scooter = StandardScooter | BatteryScooter | BatteryLevelScooter
