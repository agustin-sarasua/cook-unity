import express from 'express'
import { Request, Response } from 'express'
import { CreateTraceUseCase } from '../../domain/interfaces/usecases/createTrace'
import logger from '../../logger'

export default function TracesRouter(
    createTraceUseCase: CreateTraceUseCase
) {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response) => {
        try {
            const result = await createTraceUseCase.execute(req.body)
            res.statusCode = 201
            res.json(result)
        } catch (err) {
            logger.error(err);
            res.status(500).send({ message: err })
        }
    })

    return router
}