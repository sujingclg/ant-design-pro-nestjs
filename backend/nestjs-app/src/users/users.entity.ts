import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

class IUser {
  id: number;
  username: string;
  name: string;
  avatar: string;
}

@Entity({ name: 'users' })
export class User extends IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true })
  username: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  avatar: string;
}
