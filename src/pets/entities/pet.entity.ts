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

// Class-transformer
import { Expose } from 'class-transformer'

// Entities
import { Appointment } from 'src/appointments/entities/appointment.entity'
import { Owner } from 'src/owners/entities/owner.entity'
import { Workspace } from 'src/workspaces/entities/workspace.entity'

@Entity()
export class Pet {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 40 })
	name: string

	@Column({ type: 'varchar', length: 20, nullable: true })
	species: string

	@Column({ type: 'varchar', length: 20, nullable: true })
	breed: string

	@Column({ type: 'boolean', nullable: true })
	sex: boolean

	@Column({ type: 'varchar', length: 10, nullable: true })
	weight: string

	@Column({ type: 'date', nullable: true })
	birthDate: Date

	@Column({ type: 'varchar', length: 20, nullable: true })
	color: string

	@Column({ type: 'text', nullable: true })
	characteristics: string

	@Column({ type: 'boolean', default: true })
	isAlive: boolean

	@ManyToOne(() => Owner, owner => owner.pets)
	owner: Owner

	@OneToMany(() => Appointment, appointment => appointment.pet)
	appointments: Appointment[]

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

	@Expose()
	get age(): string | null {
		if (!this.birthDate) return null

		const now = new Date()
		const birthDate = new Date(this.birthDate)

		let years = now.getFullYear() - birthDate.getFullYear()
		let months = now.getMonth() - birthDate.getMonth()
		let days = now.getDate() - birthDate.getDate()

		// Ajuste de días y meses para calcular correctamente
		if (days < 0) {
			months -= 1
			days += this.getDaysInMonth(now.getFullYear(), now.getMonth())
		}

		if (months < 0) {
			years -= 1
			months += 12
		}

		return this.formatAge(years, months, days)
	}

	// Método auxiliar para obtener la cantidad de días en un mes
	private getDaysInMonth(year: number, month: number): number {
		return new Date(year, month + 1, 0).getDate()
	}

	// Método auxiliar para formatear la edad como un string
	private formatAge(years: number, months: number, days: number): string {
		if (years > 0) {
			return `${years} año${years > 1 ? 's' : ''}, ${months} mes${months > 1 ? 'es' : ''}`
		} else if (months > 0) {
			return `${months} mes${months > 1 ? 'es' : ''}, ${days} día${days > 1 ? 's' : ''}`
		} else {
			return `${days} día${days > 1 ? 's' : ''}`
		}
	}
}
