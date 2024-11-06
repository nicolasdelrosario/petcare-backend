// TypeORM
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

// Entities
import { Appointment } from 'src/appointment/entities/appointment.entity'
import { Owner } from 'src/owner/entities/owner.entity'

@Entity()
export class Pet {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255 })
	name: string

	@Column({ type: 'varchar', length: 100, nullable: true })
	type: string

	@Column({ type: 'boolean', nullable: true })
	gender: boolean

	@Column({ type: 'varchar', length: 100, nullable: true })
	weight: string

	@Column({ type: 'varchar', length: 100, nullable: true })
	age: string

	@Column({ type: 'varchar', length: 100, nullable: true })
	color: string

	@Column({ type: 'text', nullable: true })
	characteristics: string

	@Column({ type: 'boolean', default: true })
	isAlive: boolean

	@ManyToOne(() => Owner, owner => owner.pets)
	owner: Owner

	@OneToMany(() => Appointment, appointment => appointment.pet)
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
