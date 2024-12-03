// TypeORM
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

// Entities
import { Workspace } from 'src/workspaces/entities/workspace.entity'
import { Appointment } from 'src/appointments/entities/appointment.entity'

// Enums
import { Role } from '../../common/enums/role.enum'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true, nullable: false })
	email: string

	@Column({ nullable: false, select: false })
	password: string

	@Column({ nullable: true })
	name: string

	@Column({ nullable: true, unique: true })
	dni: string

	@Column({ nullable: true, unique: true })
	phone: string

	@ManyToOne(() => Workspace, workspace => workspace.users)
	workspace: Workspace

	@Column({ type: 'enum', default: Role.USER, enum: Role })
	role: string

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

	@DeleteDateColumn()
	deletedAt: Date
}
