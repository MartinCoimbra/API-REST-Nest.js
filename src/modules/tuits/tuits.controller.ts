import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTuitsDtos, PaginationQueryDto, UpdateTuitsDtos } from './dtos';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitService: TuitsService) {}

  @Get()
  getTuits(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> {
    /* getTuits(@Query() filterQuery): Tuit[] { */
    /* const { searchTerm, orderBy } = filterQuery; */
    /* {{HOST}}/tuits?orderBy=name&searchTerm=ahre */
    return this.tuitService.getTuits(pagination);
  }

  @Get(':id')
  getTuit(@Param('id') id: number): Promise<Tuit> {
    return this.tuitService.getTuit(id);
  }

  /* no le ponems Tuit or Tuit [] pq no retorna nada */
  @Post()
  createTuit(@Body() message: CreateTuitsDtos): Promise<Tuit> {
    /* console.log(message instanceof CreateTuitsDtos); */
    return this.tuitService.createTuit(message);
  }

  @Patch(':id')
  /* sacamos la propiedad menssage y se la asignamos a tuit (@Body('menssage') tuit) */
  updateTuit(
    @Param('id') id: number,
    @Body() tuit: UpdateTuitsDtos,
  ): Promise<Tuit> {
    return this.tuitService.updateTuit(id, tuit);
  }

  @Delete(':id')
  removeTuit(@Param('id') id: number): Promise<void> {
    return this.tuitService.removeTuit(id);
  }
}
