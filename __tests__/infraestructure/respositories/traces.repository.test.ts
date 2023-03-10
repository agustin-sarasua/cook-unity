import { InMemoryTraceRepository } from "../../../src/infraestructure/repositories/trace.repository";
import { Trace } from "../../../src/domain/entities/trace";

describe('InMemoryTraceRepository', () => {
  let repository: InMemoryTraceRepository;

  beforeEach(() => {
    repository = new InMemoryTraceRepository();
  });


  describe('getByIP', () => {
    test('should return null if the IP address does not exist', async () => {
      const trace = await repository.getByIP('127.0.0.1');
      expect(trace).toBeNull();
    });

    test('should return the trace if the IP address exists', async () => {
      const trace: Trace = {
          ip: '192.168.0.1', code: 'USA', distance_to_usa: 1000,
          name: "USA",
          lat: 0,
          lon: 0,
          currencies: [],
          timestamp: 0
      } ;
      await repository.save(trace);
      const result = await repository.getByIP('192.168.0.1');
      expect(result).toEqual(trace);
    });
  });

  describe('getLongestDistance', () => {
    test('should return the longest distance', async () => {
      const trace1: Trace = {
        ip: '192.168.0.1', code: 'USA', distance_to_usa: 1000,
        name: "USA",
        lat: 0,
        lon: 0,
        currencies: [],
        timestamp: 0
      } ;
      const trace2: Trace = {
        ip: '192.168.0.2', code: 'Canada', distance_to_usa: 2000,
        name: "Canada",
        lat: 0,
        lon: 0,
        currencies: [],
        timestamp: 0
      } ;
      
      const trace3: Trace = {
        ip: '192.168.0.3', code: 'Mexico', distance_to_usa: 3000,
        name: "Mexico",
        lat: 0,
        lon: 0,
        currencies: [],
        timestamp: 0
      } ;

      await repository.save(trace1);
      await repository.save(trace2);
      await repository.save(trace3);
      const result = await repository.getLongestDistance();
      console.log(result)
      expect(result).toEqual({ countryName: 'Mexico', distanceToUsa: 3000 });
    });
  });

  describe('getMostTraced', () => {
    test('should return the country with the most traces', async () => {
        const trace1: Trace = {
            ip: '192.168.0.1', code: 'USA', distance_to_usa: 1000,
            name: "USA",
            lat: 0,
            lon: 0,
            currencies: [],
            timestamp: 0
          } ;
          const trace11: Trace = {
            ip: '192.168.3.1', code: 'USA', distance_to_usa: 1000,
            name: "USA",
            lat: 0,
            lon: 0,
            currencies: [],
            timestamp: 0
          } ;
          const trace2: Trace = {
            ip: '192.168.0.2', code: 'Canada', distance_to_usa: 2000,
            name: "Canada",
            lat: 0,
            lon: 0,
            currencies: [],
            timestamp: 0
          } ;
          
          const trace3: Trace = {
            ip: '192.168.0.3', code: 'Mexico', distance_to_usa: 3000,
            name: "Mexico",
            lat: 0,
            lon: 0,
            currencies: [],
            timestamp: 0
          } ;
      await repository.save(trace1);
      await repository.save(trace11);
      await repository.save(trace2);
      await repository.save(trace3);
      const result = await repository.getMostTraced();
      console.log(result)
      expect(result).toEqual({ country: 'USA', value: 2 });
    });

    
  });

  describe('save', () => {
    test('should add the trace to the repository', async () => {
        const trace: Trace = {
            ip: '192.168.0.1', code: 'USA', distance_to_usa: 1000,
            name: "",
            lat: 0,
            lon: 0,
            currencies: [],
            timestamp: 0
          } ;
      await repository.save(trace);
      const result = await repository.getByIP('192.168.0.1');
      expect(result).toEqual(trace);
    });
  });
});