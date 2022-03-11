/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities';

@Entity()
export class Tuit {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  message: string;

  /* Va a ser de type User */
  /* Seg Param: La relacion va a ser de la clase User de la propiedad tuits */
  /* Pq en la clase user.entity.ts declaramos una propiedad tuits */
  @ManyToOne((type) => User, (user) => user.tuits, { cascade: true })
  /* Grcias a esto en la tabla Tuit la propiedad user va a decir user_id */
  @JoinColumn({name: "user_id"})
  user: User;
}
