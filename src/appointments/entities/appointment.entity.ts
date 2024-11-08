// TypeORM
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

// Class-validator
import { Matches } from 'class-validator'

// Entities
import { Pet } from 'src/pets/entities/pet.entity'
import { User } from 'src/users/entities/user.entity'

@Entity()
export class Appointment {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'date' })
	date: Date

	@Column({ type: 'time' })
	@Matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
		message: 'time must be in HH:MM format',
	})
	time: string

	@Column({ type: 'boolean', default: true })
	status: boolean

	@Column({ type: 'text', nullable: true })
	reason: string

	@ManyToOne(() => Pet, pet => pet.appointments)
	pet: Pet

	@ManyToOne(() => User, user => user.appointments)
	user: User

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

	get dateTime(): Date | null {
		if (!this.date || !this.time) return null
		return new Date(`${this.date}T${this.time}`)
	}
}
