// TypeORM
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm'

// Entities
import { Vet } from 'src/vet/entities/vet.entity'
import { Appointment } from 'src/appointment/entities/appointment.entity'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255, nullable: true, default: 'Vet' })
	name: string

	@Column({ type: 'char', length: 8, unique: true, nullable: true })
	dni: string

	@Column({ type: 'varchar', length: 255, unique: true })
	email: string

	@Column({ type: 'varchar', length: 20, unique: true, nullable: true })
	phone: string

	@Column({ type: 'varchar', select: false })
	password: string

	@Column({ type: 'varchar', array: true, default: ['user'] })
	roles: string[]

	@ManyToOne(() => Vet, vet => vet.users)
	vet: Vet

	@OneToMany(() => Appointment, appointment => appointment.user)
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

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.email = this.email.toLowerCase().trim()
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert()
	}
}
