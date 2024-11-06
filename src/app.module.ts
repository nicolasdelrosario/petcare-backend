// NestJS
import { Module } from '@nestjs/common'

// Modules
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from '@nestjs/axios'
import { RolesModule } from './roles/roles.module'
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
		HttpModule,
		DatabaseModule,
		RolesModule,
		UsersModule,
		WorkspacesModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
