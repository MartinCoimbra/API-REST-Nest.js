import { IsString } from 'class-validator';

/* con esto validamos que sea de tipo string y existe la propiedad menssage */

export class UpdateTuitsDtos {
  @IsString()
  readonly message: string;
}
