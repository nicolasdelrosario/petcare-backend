// TypeORM
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'

// Entities
import { User } from 'src/users/entities/user.entity'

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	name: string

	@ManyToMany(() => User, user => user.roles)
	users: User[]
}
