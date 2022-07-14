import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  title: string;

  @Column({nullable:true})
  text: string;

  @Column({nullable:true})
  author: string;
}
