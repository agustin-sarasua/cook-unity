import { LongestDistance, MostTraced } from "../../entities/statistics";
import { Trace } from "../../entities/trace";

export interface ITraceRepository {
    getByIP(ipAddress: string): Promise<Trace | null>;
    getLongestDistance(): Promise<LongestDistance>;
    getMostTraced(): Promise<MostTraced>;
    save(trace: Trace): Promise<void>;
}