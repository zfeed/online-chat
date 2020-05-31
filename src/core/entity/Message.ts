import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import { Length, NotFullyWhiteSpace } from '../../common/validation';
import User from './User';

@Entity('messages')
export default class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 4096 })
    @NotFullyWhiteSpace()
    @Length(1, 4096)
    text!: string;

    @ManyToOne(() => User)
    fromUser!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @BeforeInsert()
    private handleText(): void {
        this.text = this.text.trim();
    }
}
