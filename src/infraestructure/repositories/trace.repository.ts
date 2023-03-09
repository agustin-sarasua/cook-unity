import { LongestDistance, MostTraced } from "../../domain/entities/statistics";
import { Trace } from "../../domain/entities/trace";
import { ITraceRepository } from "../../domain/interfaces/repositories/traces.repository";

export class InMemoryTraceRepository implements ITraceRepository {
    
    private countryCountMap: Map<string, number> = new Map();
    private tracesMap: Map<string, Trace> = new Map();
    private longestDistance: LongestDistance = {countryName: "", distanceToUsa: 0};
  
    async getByIP(ipAddress: string): Promise<Trace | null> {
      const trace = this.tracesMap.get(ipAddress);
      return trace || null;
    }

    async getLongestDistance(): Promise<LongestDistance> {
        return Promise.resolve(this.longestDistance);
    }

    async getMostTraced(): Promise<MostTraced> {
        let maxKey: string = '';
        let maxValue: number = -Infinity;
        for (const [key, value] of this.countryCountMap) {
            if (value > maxValue) {
                maxValue = value;
                maxKey = key;
            }
        }
        return Promise.resolve({country: maxKey, value: maxValue});
    }

    async save(trace: Trace): Promise<void> {
        let new_val = this.countryCountMap.get(trace.name)
        if (new_val !== undefined){
            new_val += 1;
        } else {
            new_val = 1;
        }
        this.countryCountMap.set(trace.name, new_val);

        if (trace.distance_to_usa > this.longestDistance.distanceToUsa){
            this.longestDistance.countryName = trace.name
            this.longestDistance.distanceToUsa = trace.distance_to_usa
        }
        // timestamp to invalidate trace
        trace.timestamp = Date.now()
        this.tracesMap.set(trace.ip, trace)
    }
}