import axios, { AxiosInstance } from 'axios';
import { ExchangeRates } from '../../domain/entities/exchangeRates';

export class FixerIoClient {
  private readonly apiKey: string;
  private readonly httpClient: AxiosInstance;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.httpClient = axios.create({
      baseURL: 'https://api.apilayer.com',
    });
  }

  async getLatestRates(base: string): Promise<ExchangeRates> {
    const headers = {
        'apikey': this.apiKey,
        'Content-Type': 'application/json'
    };
      
    const response = await this.httpClient.get('/fixer/latest', {
        headers: headers,
        params: {
            base: base,
            symbols: {base},
        },
    });
    return response.data;
  }
}
