// TypeORM
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

// Entities
import { Pet } from 'src/pet/entities/pet.entity'
import { User } from 'src/user/entities/user.entity'
import { Veterinarian } from 'src/veterinarian/entities/veterinarian.entity'

@Entity()
export class Appointment {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'timestamptz' })
	date: Date

	@Column({ type: 'boolean', default: true })
	status: boolean

	@Column({ type: 'text', nullable: true })
	reason: string

	@ManyToOne(() => Pet, pet => pet.appointments)
	pet: Pet

	@ManyToOne(() => User, user => user.appointments)
	user: User

	@ManyToOne(() => Veterinarian, veterinarian => veterinarian.appointments)
	veterinarian: Veterinarian

	@CreateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date

	@UpdateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date

	@Column({
		type: 'timestamptz',
		default: () => 'NULL',
		nullable: true,
	})
	deletedAt: Date
}
