// @flow

export type TravelerCategory = 'Adult' | 'Senior' | 'Child' | 'Infant'

export type Traveler = {
    id: TravelerCategory,
    name: string,
    number: number,
    totalPrice?: number,
    userProfiles?: Array<any>,
    userProfileRefs: Array<string>,
}
