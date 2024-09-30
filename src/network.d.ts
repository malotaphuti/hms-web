// src/network.d.ts
interface NetworkInformation {
    readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
    readonly downlink: number;
    readonly rtt: number;
    readonly saveData: boolean;
    addEventListener(type: 'change', listener: () => void): void;
    removeEventListener(type: 'change', listener: () => void): void;
}

interface Navigator {
    connection?: NetworkInformation;
}
