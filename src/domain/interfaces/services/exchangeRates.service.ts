import { ExchangeRates } from "../../entities/exchangeRates";

export interface ExchangeRatesService {
    getLatestRates(base: string): Promise<ExchangeRates>
}