// TypeORM
import { DataSource } from 'typeorm'

// Config
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: ['src/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	migrationsTableName: 'migrations',
})
