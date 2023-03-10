import { Statistics } from "../entities/statistics";
import { ITraceRepository } from "../interfaces/repositories/traces.repository";
import { ExchangeRatesService } from "../interfaces/services/exchangeRates.service";
import { GeolocationService } from "../interfaces/services/geolocation.service";
import { GetStatisticsUseCase } from "../interfaces/usecases/getStatistics";

export class GetStatistics implements GetStatisticsUseCase {
    
    traceRepository: ITraceRepository;
    
    constructor(traceRepository: ITraceRepository){
        this.traceRepository = traceRepository;
    }  

    async execute(): Promise<Statistics> {
        
        const longestDistance = await this.traceRepository.getLongestDistance()
        const mostTraced = await this.traceRepository.getMostTraced()
        return Promise.resolve({mostTraced: mostTraced, longestDistance: longestDistance})
    }
}