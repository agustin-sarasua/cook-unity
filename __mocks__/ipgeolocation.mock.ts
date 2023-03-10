import { IPGeolocation } from "../src/domain/entities/geolocation";
import { GeolocationService } from "../src/domain/interfaces/services/geolocation.service";

export class IPGeolocationMock implements GeolocationService {

  ipGeolocation: IPGeolocation = {
    status: 'success',
    currency: 'USD',
    countryCode: 'US',
    country: 'United States',
    lat: 37.7749,
    lon: -122.4194
  };

  async getGeolocation(ipAddress: string): Promise<IPGeolocation> {
    return Promise.resolve(this.ipGeolocation);
  }
}