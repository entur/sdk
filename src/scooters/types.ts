export enum ScooterOperator {
    VOI = 'voi',
    TIER = 'tier',
    ZVIPP = 'zvipp',
    LIME = 'lime',
}

interface BaseScooter {
    id: string
    lat: number
    lon: number
    code?: string
}

export interface BatteryScooter extends BaseScooter {
    operator: ScooterOperator.VOI | ScooterOperator.TIER | ScooterOperator.ZVIPP
    battery: number
}

enum BatteryLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface BatteryLevelScooter extends BaseScooter {
    operator: ScooterOperator.LIME
    batteryLevel: BatteryLevel
}

export type Scooter = BatteryScooter | BatteryLevelScooter
