import { Trace } from "../../entities/trace";

export interface CreateTraceUseCase {
    execute(trace: Trace): Promise<Trace>;
}