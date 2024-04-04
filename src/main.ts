import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import * as cors from 'cors'
import * as session from '@fastify/session'
import * as cookie from '@fastify/cookie'
import { env } from 'process'
import * as cookieParser from 'cookie-parser'

const MongoStore = require('connect-mongo')

// const corsOptions = {
//   'Access-Control-Allow-Origin': 'http://localhost:3000',
//   'Access-Control-Allow-Credentials': true,
//   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//   'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
// }

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  await app.register(cookie)
  await app.register(session, {
    secret: env.SESSION_SECRET,
    saveUninitialized: false,
    // cookie: {
    //   path: '/',
    //   secure: process.env.  === 'production',
    // },
    store: MongoStore.create({
      mongoUrl: env.DATABASE_URL,
      collectionName: 'Sessions',
      ttl: 60 * 60,
    }),
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  app.use(cors(corsOptions))
  await app.listen(8080, '0.0.0.0')
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
