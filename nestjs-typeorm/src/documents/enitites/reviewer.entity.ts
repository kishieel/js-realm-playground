import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('documentReviewers')
export class Reviewer {
    @Column()
    @PrimaryColumn()
    userId: number;

    @Column()
    @PrimaryColumn()
    documentId: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
