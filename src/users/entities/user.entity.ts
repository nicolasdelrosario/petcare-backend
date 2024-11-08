// TypeORM
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToOne,
	ManyToMany,
	JoinTable,
} from 'typeorm'

// Entities
import { Workspace } from 'src/workspaces/entities/workspace.entity'
import { Role } from 'src/roles/entities/role.entity'
import { Appointment } from 'src/appointments/entities/appointment.entity'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column({ nullable: true })
	name: string

	@Column({ nullable: true, unique: true })
	dni: string

	@Column({ nullable: true, unique: true })
	phone: string

	@ManyToOne(() => Workspace, workspace => workspace.users)
	workspace: Workspace

	@ManyToMany(() => Role)
	@JoinTable()
	roles: Role[]

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
}
