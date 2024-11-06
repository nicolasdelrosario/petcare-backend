// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Modules
import { PetModule } from 'src/pet/pet.module'
import { UserModule } from 'src/user/user.module'

// Controllers
import { AppointmentController } from './appointment.controller'

// Services
import { AppointmentService } from './appointment.service'

// Entities
import { Appointment } from './entities/appointment.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Appointment]), PetModule, UserModule],
	controllers: [AppointmentController],
	providers: [AppointmentService],
})
export class AppointmentModule {}
