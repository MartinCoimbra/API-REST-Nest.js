import { IsObject, IsString } from 'class-validator';
import { User } from 'src/modules/users/entities';

/* con esto validamos que sea de tipo string y existe la propiedad menssage */
export class CreateTuitsDtos {
  @IsString()
  readonly message: string;
  @IsObject()
  /* Partial nos sirve para indicar que no necesariamente tenemos que tener todas las propiedades de un User para poder crearlo */
  readonly user: Partial<User>;
}
