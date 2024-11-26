// TypeORM
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

// Entities
import { Pet } from 'src/pets/entities/pet.entity'

@Entity()
export class Owner {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 50 })
	name: string

	@Column({ type: 'varchar', length: 10, unique: true, nullable: true })
	dni: string

	@Column({ type: 'varchar', length: 70, unique: true, nullable: true })
	email: string

	@Column({ type: 'varchar', length: 20, unique: true, nullable: true })
	phone: string

	@Column({ type: 'varchar', length: 100, nullable: true })
	address: string

	@OneToMany(() => Pet, pet => pet.owner, { nullable: true })
	pets: Pet[]

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
