// NestJS
import { Module } from '@nestjs/common'

// Modules
import { AppointmentsModule } from './appointments/appointments.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from '@nestjs/axios'
import { OwnersModule } from './owners/owners.module'
import { PetsModule } from './pets/pets.module'
import { UsersModule } from './users/users.module'
import { WorkspacesModule } from './workspaces/workspaces.module'

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
		AppointmentsModule,
		AuthModule,
		DatabaseModule,
		HttpModule,
		OwnersModule,
		PetsModule,
		UsersModule,
		WorkspacesModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
