interface Capability {
    id: string;
    version: number;
}

interface Category {
    name: string;
    categoryType: string;
}

interface Component {
    id: string;
    label: string;
    capabilities: Capability[];
    categories: Category[];
}

interface Profile {
    id: string;
}

interface OcfInfo {
    ocfDeviceType: string;
    name: string;
    specVersion: string;
    verticalDomainSpecVersion: string;
    manufacturerName: string;
    modelNumber: string;
    platformVersion: string;
    platformOS: string;
    hwVersion: string;
    firmwareVersion: string;
    vendorId: string;
    vendorResourceClientServerVersion: string;
    lastSignupTime: string;
    transferCandidate: boolean;
    additionalAuthCodeRequired: boolean;
}

export interface Device {
    deviceId: string;
    name: string;
    label: string;
    manufacturerName: string;
    presentationId: string;
    deviceManufacturerCode: string;
    locationId: string;
    ownerId: string;
    roomId: string;
    deviceTypeName: string;
    components: Component[];
    createTime: string;
    profile: Profile;
    ocf: OcfInfo;
    type: string;
    restrictionTier: number;
    allowed: any[];
    executionContext: string;
}  