import { IPGeolocation } from "../../entities/geolocation";

export interface GeolocationService {
    getGeolocation(ipAddress: string): Promise<IPGeolocation>;
}