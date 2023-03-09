import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import Routes from "./Routes"

const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", (req: Request, res: Response) => {
  res.send("TS App is Running")
})

// Connect({ db })
Routes({ app })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})