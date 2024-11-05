// NestJS
import { Module } from '@nestjs/common'

// Modules
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from '@nestjs/axios'

// Controllers
import { AppController } from './app.controller'

// Config
import { enviroments } from './config/enviroments'
import config from './config/config'
import configSchema from './config/configSchema'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: enviroments[process.env.NODE_ENV] || '.env',
			load: [config],
			isGlobal: true,
			validationSchema: configSchema,
		}),
		HttpModule,
		DatabaseModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
