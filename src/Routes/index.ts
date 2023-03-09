import { RoutesInput } from "../Types/types"
import TraceController from "../Controllers/trace.controller"

export default ({ app }: RoutesInput) => {

    app.post("traces", async (req, res) => {
        const trace = await TraceController.CreateTrace({
            ip: req.body.ip,
        })
        return res.send({ trace })
    })

}