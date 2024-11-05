// NestJS
import { Module, Global } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Database
import { Client } from 'pg'

// Config
import { ConfigType } from '@nestjs/config'
import config from 'src/config/config'

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [config.KEY],
			useFactory: (configService: ConfigType<typeof config>) => {
				const { user, host, database, password, port } = configService.postgres
				return {
					type: 'postgres',
					host,
					port,
					username: user,
					password,
					database,
					synchronize: true,
					autoLoadEntities: true,
				}
			},
		}),
	],
	providers: [
		{
			provide: 'PG',
			useFactory: (configService: ConfigType<typeof config>) => {
				const { user, host, database, password, port } = configService.postgres
				const client = new Client({
					user,
					host,
					database,
					password,
					port,
				})

				client.connect()
				return client
			},
			inject: [config.KEY],
		},
	],
	exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
