import TracesRouter from "../../presentation/routers/traces.routers";
import { ExchangeRates } from "../entities/exchangeRates";
import { Currency, Trace, isoToSymbol } from "../entities/trace";
import { ITraceRepository } from "../interfaces/repositories/traces.repository";
import { ExchangeRatesService } from "../interfaces/services/exchangeRates.service";
import { GeolocationService } from "../interfaces/services/geolocation.service";
import { CreateTraceUseCase } from "../interfaces/usecases/createTrace";
import { LatLng, calculateDistance } from "../utils/location.utils";

export class CreateTrace implements CreateTraceUseCase {
    
    geolocationService: GeolocationService;

    exchangeRatesService: ExchangeRatesService;
    
    traceRepository: ITraceRepository;

    casaBlanca: LatLng = { lat: 38.897957, lng: -77.036560 };

    constructor(geolocationService: GeolocationService, exchangeRatesService: ExchangeRatesService, traceRepository: ITraceRepository){
        this.geolocationService = geolocationService;
        this.exchangeRatesService = exchangeRatesService;
        this.traceRepository = traceRepository;
    }
    
    private parseCurrency(exchangeRates: ExchangeRates) {
        
        const currencies: Currency[] = []

        for (const currency in exchangeRates.rates) {
            const rate = exchangeRates.rates[currency];
            console.log(`${currency}: ${rate}`);
            const symbol = isoToSymbol[currency] as string | "$";
            const newCurrency: Currency = { iso: currency, symbol: symbol, conversion_rate: rate };
            currencies.push(newCurrency);
        }

        return currencies
    } 

    async execute(trace: Trace): Promise<Trace> {
        
        let savedTrace = await this.traceRepository.getByIP(trace.ip);

        if (savedTrace != null){
            const expirationTime = 24 * 60 * 60 * 1000; // 1 day in milliseconds
            const currentTime = Date.now();
            if (currentTime - savedTrace.timestamp < expirationTime) {
                // overwrite with fresh data
                return Promise.resolve(savedTrace)
            }
        }

        const result = await this.geolocationService.getGeolocation(trace.ip)
        
        const exchangeRates = await this.exchangeRatesService.getLatestRates(result.currency)

        let resTrace: Trace = {
            ip: trace.ip,
            lat: result.lat,
            lon: result.lon,
            code: result.countryCode,
            name: result.country,
            currencies: this.parseCurrency(exchangeRates),
            distance_to_usa: calculateDistance({lat: result.lat, lng: result.lon}, this.casaBlanca),
            timestamp: Date.now()
        }

        this.traceRepository.save(resTrace)

        return Promise.resolve(resTrace)
    }
}