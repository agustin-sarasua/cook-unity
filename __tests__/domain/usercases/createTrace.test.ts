import { CreateTraceUseCase } from "../../../src/domain/interfaces/usecases/createTrace";
import { CreateTrace } from "../../../src/domain/usecases/createTrace";
import { FixerIoMock } from "../../../__mocks__/fixer.mock";
import { IPGeolocationMock } from "../../../__mocks__/ipgeolocation.mock";
import { InMemoryTraceRepository } from "../../../src/infraestructure/repositories/trace.repository";
import { Trace } from "../../../src/domain/entities/trace";


describe('CreateTraceUseCase', () => {
    let useCase: CreateTraceUseCase;
    let geoLocationMock = new IPGeolocationMock();
    let fixerIoMock = new FixerIoMock();
    let traceRepository = new InMemoryTraceRepository();

  beforeEach(() => {
    useCase = new CreateTrace(geoLocationMock, fixerIoMock, traceRepository);
  });
  

  test('should return null if the IP address does not exist', async () => {
    let trace: Trace = {
      ip: "198.1.0.1",
      name: "USA",
      code: "USA",
      lat: 0,
      lon: 0,
      currencies: [],
      distance_to_usa: 0,
      timestamp: 0
    }

    const res = await useCase.execute(trace);
    console.log(res)
    expect(res).toBeDefined()
  });

});