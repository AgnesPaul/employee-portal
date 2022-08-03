import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";

@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

    @Column({ nullable: false })
    public departmentId: string;

    @Column({ nullable: false })
    public role: string;

    @Column({ nullable: false })
    public experience: Number;

    @Column({ nullable: false })
    public status: string;

    @Column({ nullable: false })
    public dateOfJoining: string;

    @Column({ nullable: false})
    public username: string;
    
    @Column({ nullable: false})
    public password: string;
   

}

