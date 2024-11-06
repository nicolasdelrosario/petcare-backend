import { Appointment } from 'src/appointment/entities/appointment.entity'

import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm'

@Entity()
export class Veterinarian {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255 })
	name: string

	@Column({ type: 'char', length: 8, unique: true, nullable: true })
	dni: string

	@Column({ type: 'varchar', length: 255, unique: true, nullable: true })
	email: string

	@Column({ type: 'varchar', length: 15, unique: true, nullable: true })
	phone: string

	@OneToMany(() => Appointment, appointment => appointment.veterinarian, {
		nullable: true,
	})
	appointments: Appointment[]

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
