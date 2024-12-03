// TypeORM
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

// Entities
import { Pet } from 'src/pets/entities/pet.entity'
import { Workspace } from 'src/workspaces/entities/workspace.entity'

@Entity()
export class Owner {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 50 })
	name: string

	@Column({ type: 'varchar', length: 10, nullable: true })
	dni: string

	@Column({ type: 'varchar', length: 70, nullable: true })
	email: string

	@Column({ type: 'varchar', length: 20, nullable: true })
	phone: string

	@Column({ type: 'varchar', length: 100, nullable: true })
	address: string

	@OneToMany(() => Pet, pet => pet.owner, { nullable: true })
	pets: Pet[]

	@ManyToOne(() => Workspace)
	@JoinColumn({ name: 'workspaceId', referencedColumnName: 'id' })
	workspace: Workspace

	@Column()
	workspaceId: number

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
