/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AbstractRingPropertyType {
    abstractRing?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: AbstractRingType
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }
}

export type AbstractRingType = object

export interface AccessesRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    accessRefOrAccess?: object[]
}

export interface AlternativeDescriptors {
    id?: string
    topographicPlaceDescriptor: TopographicPlaceDescriptorVersionedChildStructure[]
}

export interface AlternativeText {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    extensions?: ExtensionsStructure
    dataManagedObjectRef?: VersionOfObjectRefStructure
    text: MultilingualString
    attributeName?: string
    useForLanguage?: string
    order?: number
}

export interface AlternativeTextsRelStructure {
    id?: string
    alternativeText: AlternativeText[]
}

export interface BrandingRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface CodeType {
    value?: string
    codeSpace?: string
}

export interface CodeWithAuthorityType {
    value?: string
    codeSpace?: string
}

export interface CountryRef {
    value?: string
    ref?:
        | 'AC'
        | 'AD'
        | 'AE'
        | 'AF'
        | 'AG'
        | 'AI'
        | 'AL'
        | 'AM'
        | 'AN'
        | 'AO'
        | 'AQ'
        | 'AR'
        | 'AS'
        | 'AT'
        | 'AU'
        | 'AW'
        | 'AZ'
        | 'AX'
        | 'BA'
        | 'BB'
        | 'BD'
        | 'BE'
        | 'BF'
        | 'BG'
        | 'BH'
        | 'BI'
        | 'BJ'
        | 'BM'
        | 'BN'
        | 'BO'
        | 'BR'
        | 'BS'
        | 'BT'
        | 'BV'
        | 'BW'
        | 'BY'
        | 'BZ'
        | 'CA'
        | 'CC'
        | 'CD'
        | 'CF'
        | 'CG'
        | 'CH'
        | 'CI'
        | 'CK'
        | 'CL'
        | 'CM'
        | 'CN'
        | 'CO'
        | 'CR'
        | 'CS'
        | 'CU'
        | 'CV'
        | 'CX'
        | 'CY'
        | 'CZ'
        | 'DE'
        | 'DJ'
        | 'DK'
        | 'DM'
        | 'DO'
        | 'DZ'
        | 'EC'
        | 'EE'
        | 'EG'
        | 'EH'
        | 'ER'
        | 'ES'
        | 'ET'
        | 'EU'
        | 'FI'
        | 'FJ'
        | 'FK'
        | 'FM'
        | 'FO'
        | 'FR'
        | 'GA'
        | 'GB'
        | 'GD'
        | 'GE'
        | 'GF'
        | 'GG'
        | 'GH'
        | 'GI'
        | 'GL'
        | 'GM'
        | 'GN'
        | 'GP'
        | 'GQ'
        | 'GR'
        | 'GS'
        | 'GT'
        | 'GU'
        | 'GW'
        | 'GY'
        | 'HK'
        | 'HM'
        | 'HN'
        | 'HR'
        | 'HT'
        | 'HU'
        | 'ID'
        | 'IE'
        | 'IL'
        | 'IM'
        | 'IN'
        | 'IO'
        | 'IQ'
        | 'IR'
        | 'IS'
        | 'IT'
        | 'JE'
        | 'JM'
        | 'JO'
        | 'JP'
        | 'KE'
        | 'KG'
        | 'KH'
        | 'KI'
        | 'KM'
        | 'KN'
        | 'KP'
        | 'KR'
        | 'KW'
        | 'KY'
        | 'KZ'
        | 'LA'
        | 'LB'
        | 'LC'
        | 'LI'
        | 'LK'
        | 'LR'
        | 'LS'
        | 'LT'
        | 'LU'
        | 'LV'
        | 'LY'
        | 'MA'
        | 'ME'
        | 'MC'
        | 'MD'
        | 'MG'
        | 'MH'
        | 'MK'
        | 'ML'
        | 'MM'
        | 'MN'
        | 'MO'
        | 'MP'
        | 'MQ'
        | 'MR'
        | 'MS'
        | 'MT'
        | 'MU'
        | 'MV'
        | 'MW'
        | 'MX'
        | 'MY'
        | 'MZ'
        | 'NA'
        | 'NC'
        | 'NE'
        | 'NF'
        | 'NG'
        | 'NI'
        | 'NL'
        | 'NO'
        | 'NP'
        | 'NR'
        | 'NU'
        | 'NZ'
        | 'OM'
        | 'PA'
        | 'PE'
        | 'PF'
        | 'PG'
        | 'PH'
        | 'PK'
        | 'PL'
        | 'PM'
        | 'PN'
        | 'PR'
        | 'PS'
        | 'PT'
        | 'PW'
        | 'PY'
        | 'QA'
        | 'RE'
        | 'RO'
        | 'RS'
        | 'RU'
        | 'RW'
        | 'SA'
        | 'SB'
        | 'SC'
        | 'SD'
        | 'SE'
        | 'SG'
        | 'SH'
        | 'SI'
        | 'SJ'
        | 'SK'
        | 'SL'
        | 'SM'
        | 'SN'
        | 'SO'
        | 'SR'
        | 'ST'
        | 'SV'
        | 'SY'
        | 'SZ'
        | 'TC'
        | 'TD'
        | 'TF'
        | 'TG'
        | 'TH'
        | 'TJ'
        | 'TK'
        | 'TL'
        | 'TM'
        | 'TN'
        | 'TO'
        | 'TP'
        | 'TR'
        | 'TT'
        | 'TV'
        | 'TW'
        | 'TZ'
        | 'UA'
        | 'UG'
        | 'UK'
        | 'UM'
        | 'US'
        | 'UY'
        | 'UZ'
        | 'VA'
        | 'VC'
        | 'VE'
        | 'VG'
        | 'VI'
        | 'VN'
        | 'VU'
        | 'WF'
        | 'WS'
        | 'YE'
        | 'YT'
        | 'YU'
        | 'ZA'
        | 'ZM'
        | 'ZW'
    refPrincipality?: string
}

export interface CountryRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    countryRef: CountryRef[]
}

export interface DirectPositionType {
    value?: number[]
    srsName?: string
    srsDimension?: number
}

export interface ExtensionsStructure {
    any?: object[]
}

export interface InfoLinkStructure {
    value?: string
    typeOfInfoLink?: (
        | 'CONTACT'
        | 'RESOURCE'
        | 'INFO'
        | 'IMAGE'
        | 'DOCUMENT'
        | 'TIMETABLE_DOCUMENT'
        | 'FARE_SHEET'
        | 'DATA_LICENCE'
        | 'MAP'
        | 'ICON'
        | 'OTHER'
    )[]
}

export interface InfoLinks {
    infoLink: InfoLinkStructure[]
}

export interface KeyListStructure {
    keyValue: KeyValueStructure[]
}

export interface KeyValueStructure {
    key: string
    value: string
    typeOfKey?: string
}

export interface LocationStructure {
    longitude?: number
    latitude?: number
    altitude?: number
    pos?: DirectPositionType
    precision?: number
    id?: string
    srsName?: string
}

export interface MultilingualString {
    value?: string
    lang?: string
    textIdType?: string
}

export interface PointRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface PointRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    pointRef?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: PointRefStructure
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }[]
}

export interface PolygonType {
    descriptionReference?: ReferenceType
    identifier?: CodeWithAuthorityType
    name?: CodeType[]
    id?: string
    srsName?: string
    srsDimension?: number
    exterior?: AbstractRingPropertyType
    interior?: AbstractRingPropertyType[]
}

export interface PrivateCodeStructure {
    value?: string
    type?: string
}

export interface ProjectionsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    projectionRefOrProjection?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: object
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }[]
}

export interface PurposeOfGroupingRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface Qualify {
    qualifierName: MultilingualString
    topographicPlaceRef?: TopographicPlaceRefStructure
}

export interface ReferenceType {
    owns?: boolean
    nilReason?: string[]
}

export interface SimplePointVersionStructure {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    name?: MultilingualString
    location?: LocationStructure
}

export interface TopographicPlace {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: PointRefsRelStructure
    types?: TypeOfZoneRefsRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    projections?: ProjectionsRelStructure
    parentZoneRef?: ZoneRefStructure
    placeTypes?: TypeOfPlaceRefsRelStructure
    isoCode?: string
    descriptor: TopographicPlaceDescriptorVersionedChildStructure
    alternativeDescriptors?: AlternativeDescriptors
    topographicPlaceType?:
        | 'CONTINENT'
        | 'INTERREGION'
        | 'COUNTRY'
        | 'PRINCIPALITY'
        | 'STATE'
        | 'PROVINCE'
        | 'REGION'
        | 'COUNTY'
        | 'AREA'
        | 'CONURBATION'
        | 'CITY'
        | 'MUNICIPALITY'
        | 'QUARTER'
        | 'SUBURB'
        | 'TOWN'
        | 'URBAN_CENTRE'
        | 'DISTRICT'
        | 'PARISH'
        | 'VILLAGE'
        | 'HAMLET'
        | 'PLACE_OF_INTEREST'
        | 'OTHER'
        | 'UNRECORDED'
    placeCentre?: boolean
    postCode?: string
    countryRef?: CountryRef
    otherCountries?: CountryRefsRelStructure
    parentTopographicPlaceRef?: TopographicPlaceRefStructure
    adjacentPlaces?: TopographicPlaceRefsRelStructure
    containedIn?: TopographicPlaceRefsRelStructure
    accesses?: AccessesRelStructure
}

export interface TopographicPlaceDescriptorVersionedChildStructure {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    extensions?: ExtensionsStructure
    name: MultilingualString
    shortName?: MultilingualString
    qualify?: Qualify
}

export interface TopographicPlaceRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface TopographicPlaceRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    topographicPlaceRef: TopographicPlaceRefStructure[]
}

export interface TypeOfPlaceRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface TypeOfPlaceRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    typeOfPlaceRef?: TypeOfPlaceRefStructure[]
}

export interface TypeOfZoneRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface TypeOfZoneRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    typeOfZoneRef?: TypeOfZoneRefStructure[]
}

export interface ValidBetween {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    description?: MultilingualString
    conditionedObjectRef?: VersionOfObjectRefStructure
    withConditionRef?: ValidityConditionRefStructure

    /** @format date-time */
    fromDate?: string

    /** @format date-time */
    toDate?: string
}

export interface ValidityConditionRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface ValidityConditionsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    validityConditionRefOrValidBetweenOrValidityCondition_?: object[]
}

export interface VersionOfObjectRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface ZoneRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface PresentationStructure {
    colour?: string[]
    colourName?: string
    colourSystem?: string
    backGroundColour?: string[]
    backgroundColourName?: string
    textColour?: string[]
    textColourName?: string
    textFont?: string
    textFontName?: string
    textLanguage?: string
    infoLinks?: InfoLinks
}

export interface PrintPresentationStructure {
    colour?: string
    colourName?: string
    colourSystem?: string
    backGroundColour?: string[]
    backgroundColourName?: string
    textColour?: string
    textColourName?: string
    textFont?: string
    textFontName?: string
    textLanguage?: string
    fontSize?: 'VERY_SMALL' | 'SMALL' | 'MEDUIM' | 'LARGE' | 'VERY_LARGE'
}

export interface TariffZone {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: PointRefsRelStructure
    types?: TypeOfZoneRefsRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    projections?: ProjectionsRelStructure
    parentZoneRef?: ZoneRefStructure
    presentation?: PresentationStructure
    printedPresentation?: PrintPresentationStructure
}

export interface AccessSpacesRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    accessSpaceRefOrAccessSpace?: object[]
}

export interface AccessibilityAssessment {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    extensions?: ExtensionsStructure
    mobilityImpairedAccess: 'TRUE' | 'FALSE' | 'UNKNOWN' | 'PARTIAL'
    limitations?: AccessibilityLimitationsRelStructure
    suitabilities?: SuitabilitiesRelStructure
    comment?: MultilingualString
}

export interface AccessibilityLimitation {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    extensions?: ExtensionsStructure
    wheelchairAccess: 'TRUE' | 'FALSE' | 'UNKNOWN' | 'PARTIAL'
    stepFreeAccess?: 'TRUE' | 'FALSE' | 'UNKNOWN' | 'PARTIAL'
    escalatorFreeAccess?: 'TRUE' | 'FALSE' | 'UNKNOWN' | 'PARTIAL'
    liftFreeAccess?: 'TRUE' | 'FALSE' | 'UNKNOWN' | 'PARTIAL'
    audibleSignalsAvailable?: 'TRUE' | 'FALSE' | 'UNKNOWN' | 'PARTIAL'
    visualSignsAvailable?: 'TRUE' | 'FALSE' | 'UNKNOWN' | 'PARTIAL'
}

export interface AccessibilityLimitationsRelStructure {
    id?: string
    accessibilityLimitation: AccessibilityLimitation
}

export interface AddressRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface AlternativeName {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    extensions?: ExtensionsStructure
    namedObjectRef?: VersionOfObjectRefStructure
    lang?: string
    nameType?: 'ALIAS' | 'TRANSLATION' | 'COPY' | 'LABEL' | 'OTHER'
    typeOfName?: string
    name: MultilingualString
    shortName?: MultilingualString
    abbreviation?: MultilingualString
    qualifierName?: MultilingualString
    order?: number
}

export interface AlternativeNamesRelStructure {
    id?: string
    alternativeName: AlternativeName[]
}

export interface ContactStructure {
    contactPerson?: MultilingualString
    email?: string
    phone?: string
    fax?: string
    url?: string
    furtherDetails?: MultilingualString
}

export interface EquipmentPlacesRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    equipmentPlaceRefOrEquipmentPlace?: object[]
}

export interface ExplicitEquipmentsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    installedEquipmentRefOrInstalledEquipmentOrLocalServiceRef?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: object
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }[]
}

export interface LanguageUsageStructure {
    language: string
    languageUse: (
        | 'NORMALLY_USED'
        | 'UNDERSTOOD'
        | 'NATIVE'
        | 'SPOKEN'
        | 'WRITTEN'
        | 'READ'
        | 'OTHER'
        | 'ALL_USES'
    )[]
}

export interface Languages {
    languageUsage?: LanguageUsageStructure[]
}

export interface LevelsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    levelRefOrLevel?: object[]
}

export interface LocalServicesRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    localServiceRefOrLocalService?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: object
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }[]
}

export interface LocaleStructure {
    timeZoneOffset?: number
    timeZone?: string
    summerTimeZoneOffset?: number
    summerTimeZone?: string
    defaultLanguage?: string
    languages?: Languages
}

export interface NavigationPathsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    navigationPathRefOrNavigationPath?: object[]
}

export interface OrganisationRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface OrganisationDerivedViewStructure {
    brandingRef?: BrandingRefStructure
    id?: string
    organisationRef?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: OrganisationRefStructure
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }
    name?: MultilingualString
    shortName?: MultilingualString
    legalName?: MultilingualString
    tradingName?: MultilingualString
    alternativeNames?: AlternativeNamesRelStructure
    contactDetails?: ContactStructure
}

export interface PathJunctionsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    pathJunctionRefOrPathJunction?: object[]
}

export interface PlaceEquipmentsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    installedEquipmentRefOrInstalledEquipment?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: object
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }[]
}

export interface PostalAddress {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: PointRefsRelStructure
    types?: TypeOfZoneRefsRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    projections?: ProjectionsRelStructure
    parentZoneRef?: ZoneRefStructure
    placeTypes?: TypeOfPlaceRefsRelStructure
    countryRef?: CountryRef
    countryName?: MultilingualString
    houseNumber?: string
    buildingName?: MultilingualString
    addressLine1?: MultilingualString
    addressLine2?: MultilingualString
    street?: MultilingualString
    town?: MultilingualString
    suburb?: MultilingualString
    postCode?: string
    postCodeExtension?: string
    postalRegion?: string
    province?: MultilingualString
    roadAddressRef?: AddressRefStructure
}

export interface QuaysRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    quayRefOrQuay?: object[]
}

export interface RoadAddress {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: PointRefsRelStructure
    types?: TypeOfZoneRefsRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    projections?: ProjectionsRelStructure
    parentZoneRef?: ZoneRefStructure
    placeTypes?: TypeOfPlaceRefsRelStructure
    countryRef?: CountryRef
    countryName?: MultilingualString
    gisFeatureRef?: string
    roadNumber?: string
    roadName?: MultilingualString
    bearingCompass?: 'SW' | 'SE' | 'NW' | 'NE' | 'W' | 'E' | 'S' | 'N'
    bearingDegrees?: number
    oddNumberRange?: RoadNumberRangeStructure
    evenNumberRange?: RoadNumberRangeStructure
}

export interface RoadNumberRangeStructure {
    fromNumber?: number
    toNumber?: number
}

export interface SiteEntrancesRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    entranceRefOrEntrance?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: object
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }[]
}

export interface SiteFacilitySetsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    siteFacilitySetRefOrSiteFacilitySet?: object[]
}

export interface SitePathLinksRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    pathLinkRefOrSitePathLink?: object[]
}

export interface SiteRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface SiteRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    siteRef?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: SiteRefStructure
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }[]
}

export interface StopPlace {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: PointRefsRelStructure
    types?: TypeOfZoneRefsRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    projections?: ProjectionsRelStructure
    parentZoneRef?: ZoneRefStructure
    placeTypes?: TypeOfPlaceRefsRelStructure
    url?: string
    image?: string
    postalAddress?: PostalAddress
    roadAddress?: RoadAddress
    accessibilityAssessment?: AccessibilityAssessment
    accessModes?: (
        | 'FOOT'
        | 'BICYCLE'
        | 'BOAT'
        | 'CAR'
        | 'TAXI'
        | 'SHUTTLE'
        | 'SKI'
        | 'SKATE'
    )[]
    nameSuffix?: MultilingualString
    alternativeNames?: AlternativeNamesRelStructure
    crossRoad?: MultilingualString
    landmark?: MultilingualString
    publicUse?:
        | 'ALL'
        | 'DISABLED_PUBLIC_ONLY'
        | 'AUTHORISED_PUBLIC_ONLY'
        | 'STAFF_ONLY'
        | 'PUBLIC_ONLY'
    covered?: 'INDOORS' | 'OUTDOORS' | 'COVERED' | 'MIXED' | 'UNKNOWN'
    gated?: 'GATED_AREA' | 'OPEN_AREA' | 'UNKNOWN'
    lighting?: 'WELL_LIT' | 'POORLY_LIT' | 'UNLIT' | 'UNKNOWN' | 'OTHER'
    allAreasWheelchairAccessible?: boolean
    personCapacity?: number
    facilities?: SiteFacilitySetsRelStructure
    topographicPlaceRef?: TopographicPlaceRefStructure
    topographicPlaceView?: TopographicPlaceView
    additionalTopographicPlaces?: TopographicPlaceRefsRelStructure
    siteType?:
        | 'SCHOOL'
        | 'UNIVERSITY'
        | 'WORKS'
        | 'OFFICE'
        | 'MILITARY_BASE'
        | 'RETAIL'
        | 'OTHER'
    atCentre?: boolean
    locale?: LocaleStructure
    organisationRef?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: OrganisationRefStructure
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }
    operatingOrganisationView?: OrganisationDerivedViewStructure
    parentSiteRef?: SiteRefStructure
    adjacentSites?: SiteRefsRelStructure
    containedInPlaceRef?: TopographicPlaceRefStructure
    levels?: LevelsRelStructure
    entrances?: SiteEntrancesRelStructure
    equipmentPlaces?: EquipmentPlacesRelStructure
    placeEquipments?: PlaceEquipmentsRelStructure
    localServices?: LocalServicesRelStructure
    publicCode?: string
    transportMode?:
        | 'AIR'
        | 'BUS'
        | 'COACH'
        | 'FERRY'
        | 'METRO'
        | 'RAIL'
        | 'TROLLEY_BUS'
        | 'TRAM'
        | 'WATER'
        | 'CABLEWAY'
        | 'FUNICULAR'
        | 'LIFT'
        | 'SNOW_AND_ICE'
        | 'OTHER'
    airSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_FLIGHT'
        | 'DOMESTIC_FLIGHT'
        | 'INTERCONTINENTAL_FLIGHT'
        | 'DOMESTIC_SCHEDULED_FLIGHT'
        | 'SHUTTLE_FLIGHT'
        | 'INTERCONTINENTAL_CHARTER_FLIGHT'
        | 'INTERNATIONAL_CHARTER_FLIGHT'
        | 'ROUND_TRIP_CHARTER_FLIGHT'
        | 'SIGHTSEEING_FLIGHT'
        | 'HELICOPTER_SERVICE'
        | 'DOMESTIC_CHARTER_FLIGHT'
        | 'SCHENGEN_AREA_FLIGHT'
        | 'AIRSHIP_SERVICE'
        | 'SHORT_HAUL_INTERNATIONAL_FLIGHT'
    busSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'LOCAL_BUS'
        | 'REGIONAL_BUS'
        | 'EXPRESS_BUS'
        | 'NIGHT_BUS'
        | 'POST_BUS'
        | 'SPECIAL_NEEDS_BUS'
        | 'MOBILITY_BUS'
        | 'MOBILITY_BUS_FOR_REGISTERED_DISABLED'
        | 'SIGHTSEEING_BUS'
        | 'SHUTTLE_BUS'
        | 'HIGH_FREQUENCY_BUS'
        | 'DEDICATED_LANE_BUS'
        | 'SCHOOL_BUS'
        | 'SCHOOL_AND_PUBLIC_SERVICE_BUS'
        | 'RAIL_REPLACEMENT_BUS'
        | 'DEMAND_AND_RESPONSE_BUS'
        | 'AIRPORT_LINK_BUS'
    coachSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_COACH'
        | 'NATIONAL_COACH'
        | 'SHUTTLE_COACH'
        | 'REGIONAL_COACH'
        | 'SPECIAL_COACH'
        | 'SCHOOL_COACH'
        | 'SIGHTSEEING_COACH'
        | 'TOURIST_COACH'
        | 'COMMUTER_COACH'
    funicularSubmode?:
        | 'UNKNOWN'
        | 'FUNICULAR'
        | 'STREET_CABLE_CAR'
        | 'ALL_FUNICULAR_SERVICES'
        | 'UNDEFINED_FUNICULAR'
    metroSubmode?: 'UNKNOWN' | 'UNDEFINED' | 'METRO' | 'TUBE' | 'URBAN_RAILWAY'
    tramSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'CITY_TRAM'
        | 'LOCAL_TRAM'
        | 'REGIONAL_TRAM'
        | 'SIGHTSEEING_TRAM'
        | 'SHUTTLE_TRAM'
        | 'TRAIN_TRAM'
    telecabinSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'TELECABIN'
        | 'CABLE_CAR'
        | 'LIFT'
        | 'CHAIR_LIFT'
        | 'DRAG_LIFT'
        | 'TELECABIN_LINK'
    railSubmode?:
        | 'UNKNOWN'
        | 'LOCAL'
        | 'HIGH_SPEED_RAIL'
        | 'SUBURBAN_RAILWAY'
        | 'REGIONAL_RAIL'
        | 'INTERREGIONAL_RAIL'
        | 'LONG_DISTANCE'
        | 'INTERNATIONAL'
        | 'SLEEPER_RAIL_SERVICE'
        | 'NIGHT_RAIL'
        | 'CAR_TRANSPORT_RAIL_SERVICE'
        | 'TOURIST_RAILWAY'
        | 'AIRPORT_LINK_RAIL'
        | 'RAIL_SHUTTLE'
        | 'REPLACEMENT_RAIL_SERVICE'
        | 'SPECIAL_TRAIN'
        | 'CROSS_COUNTRY_RAIL'
        | 'RACK_AND_PINION_RAILWAY'
    waterSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_CAR_FERRY'
        | 'NATIONAL_CAR_FERRY'
        | 'REGIONAL_CAR_FERRY'
        | 'LOCAL_CAR_FERRY'
        | 'INTERNATIONAL_PASSENGER_FERRY'
        | 'NATIONAL_PASSENGER_FERRY'
        | 'REGIONAL_PASSENGER_FERRY'
        | 'LOCAL_PASSENGER_FERRY'
        | 'POST_BOAT'
        | 'TRAIN_FERRY'
        | 'ROAD_FERRY_LINK'
        | 'AIRPORT_BOAT_LINK'
        | 'HIGH_SPEED_VEHICLE_SERVICE'
        | 'HIGH_SPEED_PASSENGER_SERVICE'
        | 'SIGHTSEEING_SERVICE'
        | 'SCHOOL_BOAT'
        | 'CABLE_FERRY'
        | 'RIVER_BUS'
        | 'SCHEDULED_FERRY'
        | 'SHUTTLE_FERRY_SERVICE'
        | 'CANAL_BARGE'
    snowAndIceSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'SNOW_MOBILE'
        | 'SNOW_CAT'
        | 'SNOW_COACH'
        | 'TERRA_BUS'
        | 'WIND_SLED'
    otherTransportModes?: (
        | 'AIR'
        | 'BUS'
        | 'COACH'
        | 'FERRY'
        | 'METRO'
        | 'RAIL'
        | 'TROLLEY_BUS'
        | 'TRAM'
        | 'WATER'
        | 'CABLEWAY'
        | 'FUNICULAR'
        | 'LIFT'
        | 'SNOW_AND_ICE'
        | 'OTHER'
    )[]
    tariffZones?: TariffZoneRefsRelStructure
    stopPlaceType?:
        | 'ONSTREET_BUS'
        | 'ONSTREET_TRAM'
        | 'AIRPORT'
        | 'RAIL_STATION'
        | 'METRO_STATION'
        | 'BUS_STATION'
        | 'COACH_STATION'
        | 'TRAM_STATION'
        | 'HARBOUR_PORT'
        | 'FERRY_PORT'
        | 'FERRY_STOP'
        | 'LIFT_STATION'
        | 'VEHICLE_RAIL_INTERCHANGE'
        | 'OTHER'
    borderCrossing?: boolean
    unlocalisedEquipments?: ExplicitEquipmentsRelStructure
    servedPlaces?: TopographicPlaceRefsRelStructure
    mainTerminusForPlaces?: TopographicPlaceRefsRelStructure
    limitedUse?:
        | 'INTERCHANGE_ONLY'
        | 'NO_DIRECT_ROAD_ACCESS'
        | 'LONG_WALK_TO_ACCESS'
        | 'ISOLATED'
        | 'LIMITED_SERVICE'
        | 'OTHER'
    weighting?:
        | 'NO_INTERCHANGE'
        | 'INTERCHANGE_ALLOWED'
        | 'RECOMMENDED_INTERCHANGE'
        | 'PREFERRED_INTERCHANGE'
    stopPlaceWeight?: 'INTERNATIONAL' | 'NATIONAL' | 'REGIONAL' | 'LOCAL'
    quays?: QuaysRelStructure
    accessSpaces?: AccessSpacesRelStructure
    pathLinks?: SitePathLinksRelStructure
    pathJunctions?: PathJunctionsRelStructure
    accesses?: AccessesRelStructure
    navigationPaths?: NavigationPathsRelStructure
    vehicleStoppingPlaces?: VehicleStoppingPlacesRelStructure
}

export interface SuitabilitiesRelStructure {
    id?: string
    suitability: Suitability[]
}

export interface Suitability {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    extensions?: ExtensionsStructure
    mobilityNeed?:
        | 'WHEELCHAIR'
        | 'ASSISTED_WHEELCHAIR'
        | 'MOTORIZED_WHEELCHAIR'
        | 'MOBILITY_SCOOTER'
        | 'ROAD_MOBILITY_SCOOTER'
        | 'WALKING_FRAME'
        | 'RESTRICTED_MOBILITY'
        | 'OTHER_MOBILITY_NEED'
        | 'NORMAL'
    psychosensoryNeed?:
        | 'VISUAL_IMPAIRMENT'
        | 'AUDITORY_IMPAIRMENT'
        | 'COGNITIVE_INPUT_IMPAIRMENT'
        | 'AVERSE_TO_LIFTS'
        | 'AVERSE_TO_ESCALATORS'
        | 'AVERSE_TO_CONFINED_SPACES'
        | 'AVERSE_TO_CROWDS'
        | 'OTHER_PSYCHOSENSORY_NEED'
    medicalNeed?: 'ALLERGIC' | 'HEART_CONDITION' | 'OTHER_MEDICAL_NEED'
    encumbranceNeed?:
        | 'LUGGAGE_ENCUMBERED'
        | 'PUSHCHAIR'
        | 'BAGGAGE_TROLLEY'
        | 'OVERSIZE_BAGGAGE'
        | 'GUIDE_DOG'
        | 'OTHER_ANIMAL'
        | 'OTHER_ENCUMBRANCE_NEED'
    excluded?: boolean
    needRanking?: number
    suitable: 'SUITABLE' | 'NOT_SUITABLE'
}

export interface TariffZoneRef {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface TariffZoneRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    tariffZoneRef: TariffZoneRef[]
}

export interface TopographicPlaceView {
    brandingRef?: BrandingRefStructure
    id?: string
    topographicPlaceRef?: TopographicPlaceRefStructure
    name?: MultilingualString
    shortName?: MultilingualString
    qualifierName?: MultilingualString
    countryRef?: CountryRef
}

export interface VehicleStoppingPlacesRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    vehicleStoppingPlaceRefOrVehicleStoppingPlace?: object[]
}

export interface Parking {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: PointRefsRelStructure
    types?: TypeOfZoneRefsRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    projections?: ProjectionsRelStructure
    parentZoneRef?: ZoneRefStructure
    placeTypes?: TypeOfPlaceRefsRelStructure
    url?: string
    image?: string
    postalAddress?: PostalAddress
    roadAddress?: RoadAddress
    accessibilityAssessment?: AccessibilityAssessment
    accessModes?: (
        | 'FOOT'
        | 'BICYCLE'
        | 'BOAT'
        | 'CAR'
        | 'TAXI'
        | 'SHUTTLE'
        | 'SKI'
        | 'SKATE'
    )[]
    nameSuffix?: MultilingualString
    alternativeNames?: AlternativeNamesRelStructure
    crossRoad?: MultilingualString
    landmark?: MultilingualString
    publicUse?:
        | 'ALL'
        | 'DISABLED_PUBLIC_ONLY'
        | 'AUTHORISED_PUBLIC_ONLY'
        | 'STAFF_ONLY'
        | 'PUBLIC_ONLY'
    covered?: 'INDOORS' | 'OUTDOORS' | 'COVERED' | 'MIXED' | 'UNKNOWN'
    gated?: 'GATED_AREA' | 'OPEN_AREA' | 'UNKNOWN'
    lighting?: 'WELL_LIT' | 'POORLY_LIT' | 'UNLIT' | 'UNKNOWN' | 'OTHER'
    allAreasWheelchairAccessible?: boolean
    personCapacity?: number
    facilities?: SiteFacilitySetsRelStructure
    topographicPlaceRef?: TopographicPlaceRefStructure
    topographicPlaceView?: TopographicPlaceView
    additionalTopographicPlaces?: TopographicPlaceRefsRelStructure
    siteType?:
        | 'SCHOOL'
        | 'UNIVERSITY'
        | 'WORKS'
        | 'OFFICE'
        | 'MILITARY_BASE'
        | 'RETAIL'
        | 'OTHER'
    atCentre?: boolean
    locale?: LocaleStructure
    organisationRef?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: OrganisationRefStructure
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }
    operatingOrganisationView?: OrganisationDerivedViewStructure
    parentSiteRef?: SiteRefStructure
    adjacentSites?: SiteRefsRelStructure
    containedInPlaceRef?: TopographicPlaceRefStructure
    levels?: LevelsRelStructure
    entrances?: SiteEntrancesRelStructure
    equipmentPlaces?: EquipmentPlacesRelStructure
    placeEquipments?: PlaceEquipmentsRelStructure
    localServices?: LocalServicesRelStructure
    pathLinks?: SitePathLinksRelStructure
    pathJunctions?: PathJunctionsRelStructure
    accesses?: AccessesRelStructure
    navigationPaths?: NavigationPathsRelStructure
    publicCode?: string
    label?: MultilingualString
    parkingType?:
        | 'PARK_AND_RIDE'
        | 'LIFT_SHARE_PARKING'
        | 'URBAN_PARKING'
        | 'AIRPORT_PARKING'
        | 'TRAIN_STATION_PARKING'
        | 'EXHIBITION_CENTRE_PARKING'
        | 'RENTAL_CAR_PARKING'
        | 'SHOPPING_CENTRE_PARKING'
        | 'MOTORWAY_PARKING'
        | 'ROADSIDE'
        | 'PARKING_ZONE'
        | 'UNDEFINED'
        | 'CYCLE_RENTAL'
        | 'OTHER'
    parkingVehicleTypes?: (
        | 'PEDAL_CYCLE'
        | 'MOPED'
        | 'MOTORCYCLE'
        | 'MOTORCYCLE_WITH_SIDECAR'
        | 'MOTOR_SCOOTER'
        | 'TWO_WHEELED_VEHICLE'
        | 'THREE_WHEELED_VEHICLE'
        | 'CAR'
        | 'SMALL_CAR'
        | 'PASSENGER_CAR'
        | 'LARGE_CAR'
        | 'FOUR_WHEEL_DRIVE'
        | 'TAXI'
        | 'CAMPER_CAR'
        | 'CAR_WITH_TRAILER'
        | 'CAR_WITH_CARAVAN'
        | 'MINIBUS'
        | 'BUS'
        | 'VAN'
        | 'LARGE_VAN'
        | 'HIGH_SIDED_VEHICLE'
        | 'LIGHT_GOODS_VEHICLE'
        | 'HEAVY_GOODS_VEHICLE'
        | 'AGRICULTURAL_VEHICLE'
        | 'TANKER'
        | 'TRUCK'
        | 'TRAM'
        | 'ARTICULATED_VEHICLE'
        | 'VEHICLE_WITH_TRAILER'
        | 'LIGHT_GOODS_VEHICLE_WITH_TRAILER'
        | 'HEAVY_GOODS_VEHICLE_WITH_TRAILER'
        | 'UNDEFINED'
        | 'OTHER'
        | 'ALL_PASSENGER_VEHICLES'
        | 'ALL'
    )[]
    parkingLayout?:
        | 'COVERED'
        | 'OPEN_SPACE'
        | 'MULTISTOREY'
        | 'UNDERGROUND'
        | 'ROADSIDE'
        | 'UNDEFINED'
        | 'OTHER'
        | 'CYCLE_HIRE'
    numberOfParkingLevels?: number
    principalCapacity?: number
    totalCapacity?: number
    overnightParkingPermitted?: boolean
    prohibitedForHazardousMaterials?: boolean
    rechargingAvailable?: boolean
    secure?: boolean
    realTimeOccupancyAvailable?: boolean
    parkingPaymentProcess?: (
        | 'FREE'
        | 'PAY_AT_BAY'
        | 'PAY_AND_DISPLAY'
        | 'PAY_AT_EXIT_BOOTH_MANUAL_COLLECTION'
        | 'PAY_AT_MACHINE_ON_FOOT_PRIOR_TO_EXIT'
        | 'PAY_BY_PREPAID_TOKEN'
        | 'PAY_BY_MOBILE_DEVICE'
        | 'UNDEFINED'
        | 'OTHER'
    )[]
    paymentMethods?: (
        | 'CASH'
        | 'CASH_EXACT_CHANGE_ONLY'
        | 'CASH_AND_CARD'
        | 'COIN'
        | 'BANKNOTE'
        | 'CHEQUE'
        | 'TRAVELLERS_CHEQUE'
        | 'POSTAL_ORDER'
        | 'COMPANY_CHEQUE'
        | 'CREDIT_CARD'
        | 'DEBIT_CARD'
        | 'CARDS_ONLY'
        | 'TRAVEL_CARD'
        | 'CONTACTLESS_PAYMENT_CARD'
        | 'CONTACTLESS_TRAVEL_CARD'
        | 'DIRECT_DEBIT'
        | 'BANK_TRANSFER'
        | 'EPAY_DEVICE'
        | 'EPAY_ACCOUNT'
        | 'SMS'
        | 'MOBILE_PHONE'
        | 'VOUCHER'
        | 'TOKEN'
        | 'WARRANT'
        | 'MILEAGE_POINTS'
        | 'OTHER'
    )[]
    typesOfPaymentMethod?: TypeOfPaymentMethodRefsRelStructure
    defaultCurrency?: string
    currenciesAccepted?: string[]
    cardsAccepted?: string[]
    parkingReservation?:
        | 'RESERVATION_REQUIRED'
        | 'RESERVATION_ALLOWED'
        | 'NO_RESERVATIONS'
        | 'REGISTRATION_REQUIRED'
        | 'OTHER'
    bookingUrl?: string
    paymentByMobile?: PaymentByMobileStructure
    freeParkingOutOfHours?: boolean
    parkingProperties?: ParkingPropertiesRelStructure
    parkingAreas?: ParkingAreasRelStructure
    vehicleEntrances?: ParkingEntrancesForVehiclesRelStructure
}

export interface ParkingAreaRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface ParkingAreaRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    parkingAreaRef: ParkingAreaRefStructure[]
}

export interface ParkingAreasRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    parkingAreaRefOrParkingArea?: object[]
}

export interface ParkingCapacitiesRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    parkingCapacityRefOrParkingCapacity?: object[]
}

export interface ParkingEntrancesForVehiclesRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    parkingEntranceForVehiclesRefOrParkingEntranceForVehicles?: object[]
}

export interface ParkingProperties {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    extensions?: ExtensionsStructure
    parkingRef?: ParkingRefStructure
    parkingUserTypes?: (
        | 'ALL_USERS'
        | 'STAFF'
        | 'VISITORS'
        | 'REGISTERED_DISABLED'
        | 'REGISTERED'
        | 'RENTAL'
        | 'DOCTORS'
        | 'RESIDENTS_WITH_PERMITS'
        | 'RESERVATION_HOLDERS'
        | 'EMERGENCY_SERVICES'
        | 'OTHER'
        | 'ALL'
    )[]
    parkingVehicleTypes?: (
        | 'PEDAL_CYCLE'
        | 'MOPED'
        | 'MOTORCYCLE'
        | 'MOTORCYCLE_WITH_SIDECAR'
        | 'MOTOR_SCOOTER'
        | 'TWO_WHEELED_VEHICLE'
        | 'THREE_WHEELED_VEHICLE'
        | 'CAR'
        | 'SMALL_CAR'
        | 'PASSENGER_CAR'
        | 'LARGE_CAR'
        | 'FOUR_WHEEL_DRIVE'
        | 'TAXI'
        | 'CAMPER_CAR'
        | 'CAR_WITH_TRAILER'
        | 'CAR_WITH_CARAVAN'
        | 'MINIBUS'
        | 'BUS'
        | 'VAN'
        | 'LARGE_VAN'
        | 'HIGH_SIDED_VEHICLE'
        | 'LIGHT_GOODS_VEHICLE'
        | 'HEAVY_GOODS_VEHICLE'
        | 'AGRICULTURAL_VEHICLE'
        | 'TANKER'
        | 'TRUCK'
        | 'TRAM'
        | 'ARTICULATED_VEHICLE'
        | 'VEHICLE_WITH_TRAILER'
        | 'LIGHT_GOODS_VEHICLE_WITH_TRAILER'
        | 'HEAVY_GOODS_VEHICLE_WITH_TRAILER'
        | 'UNDEFINED'
        | 'OTHER'
        | 'ALL_PASSENGER_VEHICLES'
        | 'ALL'
    )[]
    parkingStayList?: (
        | 'SHORT_STAY'
        | 'MID_TERM'
        | 'LONG_TERM'
        | 'DROPOFF'
        | 'UNLIMITED'
        | 'OTHER'
        | 'ALL'
    )[]
    maximumStay?: {
        seconds?: number
        nano?: number
        units?: {
            duration?: {
                seconds?: number
                nano?: number
                zero?: boolean
                negative?: boolean
            }
            durationEstimated?: boolean
            dateBased?: boolean
            timeBased?: boolean
        }[]
        zero?: boolean
        negative?: boolean
    }
    areas?: ParkingAreaRefsRelStructure
    spaces?: ParkingCapacitiesRelStructure
}

export interface ParkingPropertiesRelStructure {
    id?: string
    parkingProperties: ParkingProperties[]
}

export interface ParkingRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface PaymentByMobileStructure {
    phoneNumberToPay?: string
    supportPhoneNumber?: string
    paymentUrl?: string
    paymentAppDownloadUrl?: string
}

export interface TypeOfPaymentMethodRef {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface TypeOfPaymentMethodRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    typeOfPaymentMethodRef: TypeOfPaymentMethodRef[]
}

export interface BoardingPositionsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    boardingPositionRefOrBoardingPosition?: object[]
}

export interface CheckConstraintsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    checkConstraintRefOrCheckConstraint?: object[]
}

export interface ClassOfUseRef {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface DestinationDisplayViewsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    destinationDisplayRefOrDestinationDisplayView?: object[]
}

export interface LevelRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
}

export interface Quay {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: PointRefsRelStructure
    types?: TypeOfZoneRefsRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    projections?: ProjectionsRelStructure
    parentZoneRef?: ZoneRefStructure
    placeTypes?: TypeOfPlaceRefsRelStructure
    url?: string
    image?: string
    postalAddress?: PostalAddress
    roadAddress?: RoadAddress
    accessibilityAssessment?: AccessibilityAssessment
    accessModes?: (
        | 'FOOT'
        | 'BICYCLE'
        | 'BOAT'
        | 'CAR'
        | 'TAXI'
        | 'SHUTTLE'
        | 'SKI'
        | 'SKATE'
    )[]
    nameSuffix?: MultilingualString
    alternativeNames?: AlternativeNamesRelStructure
    crossRoad?: MultilingualString
    landmark?: MultilingualString
    publicUse?:
        | 'ALL'
        | 'DISABLED_PUBLIC_ONLY'
        | 'AUTHORISED_PUBLIC_ONLY'
        | 'STAFF_ONLY'
        | 'PUBLIC_ONLY'
    covered?: 'INDOORS' | 'OUTDOORS' | 'COVERED' | 'MIXED' | 'UNKNOWN'
    gated?: 'GATED_AREA' | 'OPEN_AREA' | 'UNKNOWN'
    lighting?: 'WELL_LIT' | 'POORLY_LIT' | 'UNLIT' | 'UNKNOWN' | 'OTHER'
    allAreasWheelchairAccessible?: boolean
    personCapacity?: number
    facilities?: SiteFacilitySetsRelStructure
    siteRef?: SiteRefStructure
    levelRef?: LevelRefStructure
    classOfUseRef?: ClassOfUseRef
    checkConstraints?: CheckConstraintsRelStructure
    equipmentPlaces?: EquipmentPlacesRelStructure
    placeEquipments?: PlaceEquipmentsRelStructure
    localServices?: LocalServicesRelStructure
    transportMode?:
        | 'AIR'
        | 'BUS'
        | 'COACH'
        | 'FERRY'
        | 'METRO'
        | 'RAIL'
        | 'TROLLEY_BUS'
        | 'TRAM'
        | 'WATER'
        | 'CABLEWAY'
        | 'FUNICULAR'
        | 'LIFT'
        | 'SNOW_AND_ICE'
        | 'OTHER'
    airSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_FLIGHT'
        | 'DOMESTIC_FLIGHT'
        | 'INTERCONTINENTAL_FLIGHT'
        | 'DOMESTIC_SCHEDULED_FLIGHT'
        | 'SHUTTLE_FLIGHT'
        | 'INTERCONTINENTAL_CHARTER_FLIGHT'
        | 'INTERNATIONAL_CHARTER_FLIGHT'
        | 'ROUND_TRIP_CHARTER_FLIGHT'
        | 'SIGHTSEEING_FLIGHT'
        | 'HELICOPTER_SERVICE'
        | 'DOMESTIC_CHARTER_FLIGHT'
        | 'SCHENGEN_AREA_FLIGHT'
        | 'AIRSHIP_SERVICE'
        | 'SHORT_HAUL_INTERNATIONAL_FLIGHT'
    busSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'LOCAL_BUS'
        | 'REGIONAL_BUS'
        | 'EXPRESS_BUS'
        | 'NIGHT_BUS'
        | 'POST_BUS'
        | 'SPECIAL_NEEDS_BUS'
        | 'MOBILITY_BUS'
        | 'MOBILITY_BUS_FOR_REGISTERED_DISABLED'
        | 'SIGHTSEEING_BUS'
        | 'SHUTTLE_BUS'
        | 'HIGH_FREQUENCY_BUS'
        | 'DEDICATED_LANE_BUS'
        | 'SCHOOL_BUS'
        | 'SCHOOL_AND_PUBLIC_SERVICE_BUS'
        | 'RAIL_REPLACEMENT_BUS'
        | 'DEMAND_AND_RESPONSE_BUS'
        | 'AIRPORT_LINK_BUS'
    coachSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_COACH'
        | 'NATIONAL_COACH'
        | 'SHUTTLE_COACH'
        | 'REGIONAL_COACH'
        | 'SPECIAL_COACH'
        | 'SCHOOL_COACH'
        | 'SIGHTSEEING_COACH'
        | 'TOURIST_COACH'
        | 'COMMUTER_COACH'
    funicularSubmode?:
        | 'UNKNOWN'
        | 'FUNICULAR'
        | 'STREET_CABLE_CAR'
        | 'ALL_FUNICULAR_SERVICES'
        | 'UNDEFINED_FUNICULAR'
    metroSubmode?: 'UNKNOWN' | 'UNDEFINED' | 'METRO' | 'TUBE' | 'URBAN_RAILWAY'
    tramSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'CITY_TRAM'
        | 'LOCAL_TRAM'
        | 'REGIONAL_TRAM'
        | 'SIGHTSEEING_TRAM'
        | 'SHUTTLE_TRAM'
        | 'TRAIN_TRAM'
    telecabinSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'TELECABIN'
        | 'CABLE_CAR'
        | 'LIFT'
        | 'CHAIR_LIFT'
        | 'DRAG_LIFT'
        | 'TELECABIN_LINK'
    railSubmode?:
        | 'UNKNOWN'
        | 'LOCAL'
        | 'HIGH_SPEED_RAIL'
        | 'SUBURBAN_RAILWAY'
        | 'REGIONAL_RAIL'
        | 'INTERREGIONAL_RAIL'
        | 'LONG_DISTANCE'
        | 'INTERNATIONAL'
        | 'SLEEPER_RAIL_SERVICE'
        | 'NIGHT_RAIL'
        | 'CAR_TRANSPORT_RAIL_SERVICE'
        | 'TOURIST_RAILWAY'
        | 'AIRPORT_LINK_RAIL'
        | 'RAIL_SHUTTLE'
        | 'REPLACEMENT_RAIL_SERVICE'
        | 'SPECIAL_TRAIN'
        | 'CROSS_COUNTRY_RAIL'
        | 'RACK_AND_PINION_RAILWAY'
    waterSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_CAR_FERRY'
        | 'NATIONAL_CAR_FERRY'
        | 'REGIONAL_CAR_FERRY'
        | 'LOCAL_CAR_FERRY'
        | 'INTERNATIONAL_PASSENGER_FERRY'
        | 'NATIONAL_PASSENGER_FERRY'
        | 'REGIONAL_PASSENGER_FERRY'
        | 'LOCAL_PASSENGER_FERRY'
        | 'POST_BOAT'
        | 'TRAIN_FERRY'
        | 'ROAD_FERRY_LINK'
        | 'AIRPORT_BOAT_LINK'
        | 'HIGH_SPEED_VEHICLE_SERVICE'
        | 'HIGH_SPEED_PASSENGER_SERVICE'
        | 'SIGHTSEEING_SERVICE'
        | 'SCHOOL_BOAT'
        | 'CABLE_FERRY'
        | 'RIVER_BUS'
        | 'SCHEDULED_FERRY'
        | 'SHUTTLE_FERRY_SERVICE'
        | 'CANAL_BARGE'
    snowAndIceSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'SNOW_MOBILE'
        | 'SNOW_CAT'
        | 'SNOW_COACH'
        | 'TERRA_BUS'
        | 'WIND_SLED'
    otherTransportModes?: (
        | 'AIR'
        | 'BUS'
        | 'COACH'
        | 'FERRY'
        | 'METRO'
        | 'RAIL'
        | 'TROLLEY_BUS'
        | 'TRAM'
        | 'WATER'
        | 'CABLEWAY'
        | 'FUNICULAR'
        | 'LIFT'
        | 'SNOW_AND_ICE'
        | 'OTHER'
    )[]
    tariffZones?: TariffZoneRefsRelStructure
    boardingUse?: boolean
    alightingUse?: boolean
    label?: MultilingualString
    entrances?: SiteEntrancesRelStructure
    publicCode?: string
    plateCode?: string
    shortCode?: number
    destinations?: DestinationDisplayViewsRelStructure

    /** @format float */
    compassBearing?: number
    compassOctant?: 'SW' | 'SE' | 'NW' | 'NE' | 'W' | 'E' | 'S' | 'N'
    quayType?:
        | 'AIRLINE_GATE'
        | 'RAIL_PLATFORM'
        | 'METRO_PLATFORM'
        | 'COACH_STOP'
        | 'BUS_STOP'
        | 'BUS_PLATFORM'
        | 'BUS_BAY'
        | 'TRAM_PLATFORM'
        | 'TRAM_STOP'
        | 'BOAT_QUAY'
        | 'FERRY_LANDING'
        | 'TELECABINE_PLATFORM'
        | 'TAXI_STAND'
        | 'SET_DOWN_PLACE'
        | 'VEHICLE_LOADING_PLACE'
        | 'MULTIMODAL'
        | 'OTHER'
    parentQuayRef?: QuayRefStructure
    boardingPositions?: BoardingPositionsRelStructure
}

export interface QuayRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface GroupOfTariffZones {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: TariffZoneRefsRelStructure
}

export interface GroupOfStopPlaces {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    publicCode?: string
    members?: StopPlaceRefsRelStructure
    alternativeNames?: AlternativeNamesRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    transportMode?:
        | 'AIR'
        | 'BUS'
        | 'COACH'
        | 'FERRY'
        | 'METRO'
        | 'RAIL'
        | 'TROLLEY_BUS'
        | 'TRAM'
        | 'WATER'
        | 'CABLEWAY'
        | 'FUNICULAR'
        | 'LIFT'
        | 'SNOW_AND_ICE'
        | 'OTHER'
    airSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_FLIGHT'
        | 'DOMESTIC_FLIGHT'
        | 'INTERCONTINENTAL_FLIGHT'
        | 'DOMESTIC_SCHEDULED_FLIGHT'
        | 'SHUTTLE_FLIGHT'
        | 'INTERCONTINENTAL_CHARTER_FLIGHT'
        | 'INTERNATIONAL_CHARTER_FLIGHT'
        | 'ROUND_TRIP_CHARTER_FLIGHT'
        | 'SIGHTSEEING_FLIGHT'
        | 'HELICOPTER_SERVICE'
        | 'DOMESTIC_CHARTER_FLIGHT'
        | 'SCHENGEN_AREA_FLIGHT'
        | 'AIRSHIP_SERVICE'
        | 'SHORT_HAUL_INTERNATIONAL_FLIGHT'
    busSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'LOCAL_BUS'
        | 'REGIONAL_BUS'
        | 'EXPRESS_BUS'
        | 'NIGHT_BUS'
        | 'POST_BUS'
        | 'SPECIAL_NEEDS_BUS'
        | 'MOBILITY_BUS'
        | 'MOBILITY_BUS_FOR_REGISTERED_DISABLED'
        | 'SIGHTSEEING_BUS'
        | 'SHUTTLE_BUS'
        | 'HIGH_FREQUENCY_BUS'
        | 'DEDICATED_LANE_BUS'
        | 'SCHOOL_BUS'
        | 'SCHOOL_AND_PUBLIC_SERVICE_BUS'
        | 'RAIL_REPLACEMENT_BUS'
        | 'DEMAND_AND_RESPONSE_BUS'
        | 'AIRPORT_LINK_BUS'
    coachSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_COACH'
        | 'NATIONAL_COACH'
        | 'SHUTTLE_COACH'
        | 'REGIONAL_COACH'
        | 'SPECIAL_COACH'
        | 'SCHOOL_COACH'
        | 'SIGHTSEEING_COACH'
        | 'TOURIST_COACH'
        | 'COMMUTER_COACH'
    funicularSubmode?:
        | 'UNKNOWN'
        | 'FUNICULAR'
        | 'STREET_CABLE_CAR'
        | 'ALL_FUNICULAR_SERVICES'
        | 'UNDEFINED_FUNICULAR'
    metroSubmode?: 'UNKNOWN' | 'UNDEFINED' | 'METRO' | 'TUBE' | 'URBAN_RAILWAY'
    tramSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'CITY_TRAM'
        | 'LOCAL_TRAM'
        | 'REGIONAL_TRAM'
        | 'SIGHTSEEING_TRAM'
        | 'SHUTTLE_TRAM'
        | 'TRAIN_TRAM'
    telecabinSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'TELECABIN'
        | 'CABLE_CAR'
        | 'LIFT'
        | 'CHAIR_LIFT'
        | 'DRAG_LIFT'
        | 'TELECABIN_LINK'
    railSubmode?:
        | 'UNKNOWN'
        | 'LOCAL'
        | 'HIGH_SPEED_RAIL'
        | 'SUBURBAN_RAILWAY'
        | 'REGIONAL_RAIL'
        | 'INTERREGIONAL_RAIL'
        | 'LONG_DISTANCE'
        | 'INTERNATIONAL'
        | 'SLEEPER_RAIL_SERVICE'
        | 'NIGHT_RAIL'
        | 'CAR_TRANSPORT_RAIL_SERVICE'
        | 'TOURIST_RAILWAY'
        | 'AIRPORT_LINK_RAIL'
        | 'RAIL_SHUTTLE'
        | 'REPLACEMENT_RAIL_SERVICE'
        | 'SPECIAL_TRAIN'
        | 'CROSS_COUNTRY_RAIL'
        | 'RACK_AND_PINION_RAILWAY'
    waterSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'INTERNATIONAL_CAR_FERRY'
        | 'NATIONAL_CAR_FERRY'
        | 'REGIONAL_CAR_FERRY'
        | 'LOCAL_CAR_FERRY'
        | 'INTERNATIONAL_PASSENGER_FERRY'
        | 'NATIONAL_PASSENGER_FERRY'
        | 'REGIONAL_PASSENGER_FERRY'
        | 'LOCAL_PASSENGER_FERRY'
        | 'POST_BOAT'
        | 'TRAIN_FERRY'
        | 'ROAD_FERRY_LINK'
        | 'AIRPORT_BOAT_LINK'
        | 'HIGH_SPEED_VEHICLE_SERVICE'
        | 'HIGH_SPEED_PASSENGER_SERVICE'
        | 'SIGHTSEEING_SERVICE'
        | 'SCHOOL_BOAT'
        | 'CABLE_FERRY'
        | 'RIVER_BUS'
        | 'SCHEDULED_FERRY'
        | 'SHUTTLE_FERRY_SERVICE'
        | 'CANAL_BARGE'
    snowAndIceSubmode?:
        | 'UNKNOWN'
        | 'UNDEFINED'
        | 'SNOW_MOBILE'
        | 'SNOW_CAT'
        | 'SNOW_COACH'
        | 'TERRA_BUS'
        | 'WIND_SLED'
}

export interface StopPlaceRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface StopPlaceRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    stopPlaceRef: StopPlaceRefStructure[]
}

export interface FareSectionsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    fareSectionRefOrFareSection?: object[]
}

export interface FareZone {
    nameOfClass?: string
    id?: string
    validityConditions?: ValidityConditionsRelStructure
    validBetween?: ValidBetween[]
    alternativeTexts?: AlternativeTextsRelStructure
    dataSourceRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    version?: string
    status_BasicModificationDetailsGroup?: 'ACTIVE' | 'INACTIVE' | 'OTHER'
    derivedFromVersionRef_BasicModificationDetailsGroup?: string
    compatibleWithVersionFrameVersionRef?: string
    derivedFromObjectRef?: string
    keyList?: KeyListStructure
    extensions?: ExtensionsStructure
    brandingRef?: BrandingRefStructure
    responsibilitySetRef?: string
    name?: MultilingualString
    shortName?: MultilingualString
    description?: MultilingualString
    purposeOfGroupingRef?: PurposeOfGroupingRefStructure
    privateCode?: PrivateCodeStructure
    infoLinks?: InfoLinks
    members?: PointRefsRelStructure
    types?: TypeOfZoneRefsRelStructure
    centroid?: SimplePointVersionStructure
    polygon?: PolygonType
    projections?: ProjectionsRelStructure
    parentZoneRef?: ZoneRefStructure
    presentation?: PresentationStructure
    printedPresentation?: PrintPresentationStructure
    parentFareZoneRef?: FareZoneRefStructure
    zoneTopology?:
        | 'OVERLAPPING'
        | 'HONEYCOMB'
        | 'RING'
        | 'ANNULAR'
        | 'NESTED'
        | 'TILED'
        | 'SEQUENCE'
        | 'OVERLAPPING_SEQUENCE'
        | 'OTHER'
    scopingMethod?:
        | 'EXPLICIT_STOPS'
        | 'IMPLICIT_SPATIAL_PROJECTION'
        | 'EXPLICIT_PERIPHERY_STOPS'
        | 'OTHER'
    transportOrganisationRef?: {
        name?: { namespaceURI?: string; localPart?: string; prefix?: string }
        value?: OrganisationRefStructure
        nil?: boolean
        typeSubstituted?: boolean
        globalScope?: boolean
    }
    groupOfOperatorsRef?: GroupOfOperatorsRefStructure
    fareSections?: FareSectionsRelStructure
    contains?: TariffZoneRefsRelStructure
    neighbours?: FareZoneRefsRelStructure
}

export interface FareZoneRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}

export interface FareZoneRefsRelStructure {
    id?: string
    modificationSet?: 'ALL' | 'CHANGES_ONLY'
    fareZoneRef: FareZoneRefStructure[]
}

export interface GroupOfOperatorsRefStructure {
    value?: string
    nameOfRefClass?: string
    modification?: 'NEW' | 'REVISE' | 'DELETE' | 'UNCHANGED' | 'DELTA'
    ref?: string
    versionRef?: string

    /** @format date-time */
    created?: string

    /** @format date-time */
    changed?: string
    version?: string
    nameOfMemberClass?: string
}
