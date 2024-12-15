import { Hono } from 'hono'
import { v1Routes } from './routes/v1Routes';
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors());

app.route('/api/v1', v1Routes);

export default app
