import { Statistics } from "../../entities/statistics";

export interface GetStatisticsUseCase {
    execute(): Promise<Statistics>;
}