import axios from "axios";
import { IPGeolocation } from "../../domain/entities/geolocation";
import { GeolocationService } from "../../domain/interfaces/services/geolocation.service";

class IPGeolocationService implements GeolocationService {
  async getGeolocation(ipAddress: string): Promise<IPGeolocation> {
    const response = await axios.get<IPGeolocation>(`http://ip-api.com/json/${ipAddress}?fields=currency,lat,lon,countryCode,country,status`);
    return response.data;
  }
}

export default IPGeolocationService;