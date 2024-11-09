// TypeORM
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

// Entities
import { User } from 'src/users/entities/user.entity'

@Entity()
export class Workspace {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	name: string

	@OneToMany(() => User, user => user.workspace)
	users: User[]

	@Column({
		type: 'timestamptz',
		default: () => 'NULL',
		nullable: true,
	})
	deletedAt: Date
}
