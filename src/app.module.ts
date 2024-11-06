// Modules
import { Module } from '@nestjs/common'
import { VetModule } from './vet/vet.module'
import { PetModule } from './pet/pet.module'
import { OwnerModule } from './owner/owner.module'
import { AppointmentModule } from './appointment/appointment.module'
import { UserModule } from './user/user.module'
import { VeterinarianModule } from './veterinarian/veterinarian.module'
import { DatabaseModule } from './database/database.module'

// Controllers
import { AppController } from './app.controller'

// Config
import { ConfigModule } from '@nestjs/config'
import { enviroments } from './config/enviroments'
import { HttpModule } from '@nestjs/axios'
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
		VetModule,
		PetModule,
		OwnerModule,
		AppointmentModule,
		UserModule,
		DatabaseModule,
		VeterinarianModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
