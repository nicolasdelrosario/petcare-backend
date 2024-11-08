// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { AppointmentsController } from './appointments.controller'

// Services
import { AppointmentsService } from './appointments.service'

// Entities
import { Appointment } from './entities/appointment.entity'
import { User } from 'src/users/entities/user.entity'
import { Pet } from 'src/pets/entities/pet.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Appointment, User, Pet])],
	controllers: [AppointmentsController],
	providers: [AppointmentsService],
	exports: [TypeOrmModule],
})
export class AppointmentsModule {}
