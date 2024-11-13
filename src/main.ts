// NestJS
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

// Modules
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)
	const port = configService.get<number>('config.nestPort')

	app.setGlobalPrefix('api/v1')

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	)

	app.enableCors()

	const config = new DocumentBuilder()
		.setTitle('Petcare API')
		.setDescription('The Petcare API description')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	await app.listen(port)
	console.log(`Application is running on: http://localhost:${port}`)
}

bootstrap()
