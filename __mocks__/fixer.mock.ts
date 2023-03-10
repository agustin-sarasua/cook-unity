import axios, { AxiosInstance } from 'axios';
import { ExchangeRates } from '../src/domain/entities/exchangeRates';

export class FixerIoMock {

  constructor() {
  }

  exchangeRates: ExchangeRates = {
    base: 'USA',
    date: '2022-03-09',
    rates: {
        EUR: 0.8466,
        USD: 0.7225
    }
}

  async getLatestRates(base: string): Promise<ExchangeRates> {
    this.exchangeRates.base = base
    return Promise.resolve(this.exchangeRates);
  }
}
