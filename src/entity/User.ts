import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    Unique
} from 'typeorm';
import bcrypt from 'bcrypt';
import {
    Length,
    IsAscii,
    HasNoWhiteSpace,
    IsWord,
    IsUniqueUsername,
    IsMessageIdExists,
    IsInt
} from '../validation';

@Entity('users')
@Unique(['username'])
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 10 })
    @IsUniqueUsername()
    @IsWord()
    @Length(5, 10)
    username!: string;

    @Column('char', { length: 60 })
    @HasNoWhiteSpace()
    @IsAscii()
    @Length(8, 128)
    password!: string;

    @Column('int', { default: null })
    @IsMessageIdExists()
    @IsInt()
    lastReadMessageId!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @BeforeInsert()
    private async hashPassword(): Promise<void> {
        const { password } = this;
        const saltRounds = 10;

        const hash = await bcrypt.hash(password, saltRounds);

        this.password = hash;
    }
}
