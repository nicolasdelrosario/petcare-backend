// NestJS
import { Module } from '@nestjs/common'

// Controllers
import { AppController } from './app.controller'

@Module({
	imports: [],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
