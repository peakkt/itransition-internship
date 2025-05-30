import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import { AuthMiddleware } from './middleware/AuthMiddleware'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use(AuthMiddleware.authenticate)

app.get('/protected', (_req, res) => {
    res.json({ ok: true, msg: 'You have access!' })
})

app.listen(Number(process.env.PORT) || 3000, () =>
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`)
)
