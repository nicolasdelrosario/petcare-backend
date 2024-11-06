// TypeORM
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm'

// Entities
import { User } from 'src/user/entities/user.entity'

@Entity()
export class Vet {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255, unique: true })
	name: string

	@Column({ type: 'varchar', length: 255, nullable: true })
	address: string

	@Column({ type: 'varchar', length: 20, unique: true, nullable: true })
	phone: string

	@OneToMany(() => User, user => user.vet)
	users: User[]

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
