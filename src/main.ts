// NestJS
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// Modules
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)
	const PORT = configService.get<number>('config.port')

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	)

	console.log(`Application is running on: http://localhost:${PORT}`)
	app.enableCors()

	await app.listen(PORT)
}
bootstrap()
