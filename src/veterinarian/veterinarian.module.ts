// src/veterinarian/veterinarian.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VeterinarianService } from './veterinarian.service'
import { VeterinarianController } from './veterinarian.controller'
import { Veterinarian } from './entities/veterinarian.entity'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/user/entities/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Veterinarian]), User, UserModule],
	controllers: [VeterinarianController],
	providers: [VeterinarianService],
	exports: [VeterinarianService],
})
export class VeterinarianModule {}
