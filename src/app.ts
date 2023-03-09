import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import TracesRouter from "./presentation/routers/traces.routers";
import { CreateTraceUseCase } from "./domain/interfaces/usecases/createTrace";
import { CreateTrace } from "./domain/usecases/createTrace";
import { GeolocationService } from "./domain/interfaces/services/geolocation.service";
import IPGeolocationService from "./infraestructure/services/ipgeolocation.service";
import { ExchangeRatesService } from "./domain/interfaces/services/exchangeRates.service";
import { FixerIoClient } from "./infraestructure/services/fixer.service";
import { GetStatisticsUseCase } from "./domain/interfaces/usecases/getStatistics";
import { GetStatistics } from "./domain/usecases/getStatistics";
import StatisticsRouter from "./presentation/routers/statistics.routers";
import { InMemoryTraceRepository } from "./infraestructure/repositories/trace.repository";
import { ITraceRepository } from "./domain/interfaces/repositories/traces.repository";
import logger from './logger';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express()

const dns = require('dns');
// Set the DNS server to Google's public DNS (8.8.8.8)
dns.setServers(['8.8.8.8']);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", (req: Request, res: Response) => {
  logger.info(`Hallo`)
})

const fixerAPIKey = process.env.FIXER_API_KEY;
if (fixerAPIKey == undefined){
  logger.error("FIXER_API_KEY undefined")
  process.exit(1);
}

// Define dependencies
logger.info("Defining dependencies")
const exchangeRatesService: ExchangeRatesService =  new FixerIoClient(fixerAPIKey)
const geolocationService: GeolocationService =  new IPGeolocationService()

const traceRepository: ITraceRepository = new InMemoryTraceRepository()

const createTraceUseCase: CreateTraceUseCase = new CreateTrace(geolocationService, exchangeRatesService, traceRepository)
const getStatisticsUseCase: GetStatisticsUseCase = new GetStatistics(traceRepository)

// Routers
const tracesMiddleWare = TracesRouter(createTraceUseCase)
const statsMiddleWare = StatisticsRouter(getStatisticsUseCase)

app.use("/traces", tracesMiddleWare)
app.use("/statistics", statsMiddleWare)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`server is running on PORT ${PORT}`)
})
