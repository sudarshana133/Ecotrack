export interface DeviceStatusResponse {
    status: {
        components: {
            main: {
                mediaPlayback: MediaPlayback;
                "samsungim.fixedFindNode": Record<string, unknown>;
                samsungvd: {
                    supportsPowerOnByOcf: PowerOnByOcf;
                    deviceCategory: DeviceCategory;
                    remoteControl?: Record<string, unknown>;
                    lightControl: LightControl;
                    firmwareVersion: FirmwareVersion;
                    thingStatus: ThingStatus;
                    mediaInputSource: MediaInputSource;
                    supportsFeatures: SupportedFeatures;
                    ambient?: Record<string, unknown>;
                    ambientContent?: AmbientContent;
                };
                sec: {
                    deviceConnectionState: ConnectionState;
                };
                switch: DeviceSwitch;
                ocf: OcfData;
                custom: {
                    accessibility?: Record<string, unknown>;
                    disabledCapabilities: DisabledCapabilities;
                    error?: ErrorStatus;
                    tvsearch?: Record<string, unknown>;
                    recording?: Record<string, unknown>;
                    energyType: EnergyType;
                    picturemode: PictureMode;
                    soundmode: SoundMode;
                    launchapp?: Record<string, unknown>;
                };
                execute?: ExecuteData;
                demandResponseLoadControl: DemandResponseLoadControl;
                audioVolume: AudioVolume;
                powerConsumptionReport: PowerConsumptionReport;
                tvChannel: TvChannel;
                mediaTrackControl: MediaTrackControl;
                audioMute: AudioMute;
            };
        };
    };
}

// Define interfaces for each component

export interface MediaPlayback {
    supportedPlaybackCommands: TimedValue<string[]>;
    playbackStatus: TimedValue<string | null>;
}

export interface PowerOnByOcf {
    supportsPowerOnByOcf: TimedValue<string>;
}

export interface DeviceCategory {
    category: TimedValue<string>;
}

export interface ConnectionState {
    deviceConnectionState: TimedValue<string | null>;
}

export interface DeviceSwitch {
    switch: TimedValue<string>;
}

export interface OcfData {
    st: TimedValue<string>;
    mndt: TimedValue<string>;
    mnfv: TimedValue<string>;
    mnhw: TimedValue<string>;
    di: TimedValue<string>;
    mnsl: TimedValue<string>;
    dmv: TimedValue<string>;
    n: TimedValue<string>;
    mnmo: TimedValue<string>;
    vid: TimedValue<string>;
    mnmn: TimedValue<string>;
    mnml: TimedValue<string>;
    mnpv: TimedValue<string>;
    mnos: TimedValue<string>;
    pi: TimedValue<string>;
    icv: TimedValue<string>;
}

export interface DisabledCapabilities {
    disabledCapabilities: TimedValue<string[]>;
}

export interface MediaInputSource {
    supportedInputSources: TimedValue<MediaSource[]>;
    inputSource: TimedValue<string | null>;
}

export interface MediaSource {
    id: string;
    name: string;
}

export interface LightControl {
    supportedModeMap: TimedValue<string | null>;
    requestId: TimedValue<string | null>;
    selectedMode: TimedValue<string | null>;
    streamControl: TimedValue<string | null>;
    selectedAppId: TimedValue<string | null>;
    errorCode: TimedValue<string | null>;
    supportedModes: TimedValue<string | null>;
}

export interface FirmwareVersion {
    firmwareVersion: TimedValue<string>;
}

export interface ThingStatus {
    updatedTime: TimedValue<number>;
    status: TimedValue<string>;
}

export interface SupportedFeatures {
    mediaOutputSupported: TimedValue<string | null>;
    imeAdvSupported: TimedValue<boolean>;
    wifiUpdateSupport: TimedValue<string | null>;
    executableServiceList: TimedValue<string | null>;
    mobileCamSupported: TimedValue<boolean>;
}

export interface DemandResponseLoadControl {
    drlcStatus: TimedValue<{
        drlcType: number;
        drlcLevel: number;
        start: string;
        duration: number;
        override: boolean;
    }>;
}

export interface AudioVolume {
    volume: TimedValue<number>;
}

export interface PowerConsumptionReport {
    powerConsumption: TimedValue<{
        energy: number;
        deltaEnergy: number;
        power: number;
        powerEnergy: number;
        persistedEnergy: number;
        energySaved: number;
        persistedSavedEnergy: number;
        start: string;
        end: string;
    }>;
}

export interface TvChannel {
    tvChannel: TimedValue<string>;
    tvChannelName: TimedValue<string>;
}

export interface PictureMode {
    pictureMode: TimedValue<string>;
    supportedPictureModes: TimedValue<string[]>;
    supportedPictureModesMap: TimedValue<Array<{ id: string; name: string }>>;
}

export interface SoundMode {
    supportedSoundModesMap: TimedValue<Array<{ id: string; name: string }>>;
    soundMode: TimedValue<string>;
    supportedSoundModes: TimedValue<string[]>;
}

export interface EnergyType {
    energyType: TimedValue<string>;
    energySavingSupport: TimedValue<boolean>;
    drMaxDuration: TimedValue<number>;
    energySavingLevel: TimedValue<number>;
    energySavingInfo: TimedValue<string | null>;
    supportedEnergySavingLevels: TimedValue<number[]>;
    energySavingOperation: TimedValue<boolean>;
    notificationTemplateID: TimedValue<string | null>;
    energySavingOperationSupport: TimedValue<boolean>;
}

export interface AmbientContent {
    supportedAmbientApps: TimedValue<string[]>;
}

export interface ExecuteData {
    data: TimedValue<string | null>;
}

export interface ErrorStatus {
    error: TimedValue<string | null>;
}

export interface MediaTrackControl {
    supportedTrackControlCommands: TimedValue<string | null>;
}

export interface AudioMute {
    mute: TimedValue<string>;
}

export interface TimedValue<T> {
    value: T;
    timestamp: string;
}
