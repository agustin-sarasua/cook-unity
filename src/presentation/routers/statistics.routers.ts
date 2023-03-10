import express from 'express'
import { Request, Response } from 'express'
import { GetStatisticsUseCase } from '../../domain/interfaces/usecases/getStatistics'
import logger from '../../logger'



export default function StatisticsRouter(
    getStatisticsUseCase: GetStatisticsUseCase
) {
    const router = express.Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const result = await getStatisticsUseCase.execute()
            res.statusCode = 200
            res.json(result)
        } catch (err) {
            logger.error(err);
            res.status(500).send({ message: "Error saving data" })
        }
    })

    return router
}