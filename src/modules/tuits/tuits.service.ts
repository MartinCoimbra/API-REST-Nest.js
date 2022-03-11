import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities';
import { CreateTuitsDtos, PaginationQueryDto, UpdateTuitsDtos } from './dtos';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
  constructor(
    @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /* Leemos todos los tuits */
  /* getTuits(): Tuit[] {
    return this.tuits;
  } */

  /* Leemos todos los tuits desde la BD, le agregamos asyn y eso porque ya es una bd no es dato estaticos en memeoria */
  async getTuits({ limit, offset }: PaginationQueryDto): Promise<Tuit[]> {
    /* Aqui nos devuelve quienes hizieron el tuit */
    /* return await this.tuitRepository.find(); */
    return await this.tuitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    }); /* Aca nos devuelve todos los tuit pero quienes los hizieron */
  }

  /* Tuit esta sin  [] pq retorna 1 solo tuit */
  async getTuit(id: number): Promise<Tuit> {
    /* Buscamo un tuit en especifico */
    const tuit: Tuit = await this.tuitRepository.findOne(id, {
      /* Asi tenemos las relaciones de una entidad */
      relations: ['user'],
    });
    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }
    return tuit;
  }
  async createTuit({ message, user }: CreateTuitsDtos) {
    const tuit: Tuit = this.tuitRepository.create({ message, user });
    return this.tuitRepository.save(tuit);
  }

  async updateTuit(id: number, { message }: UpdateTuitsDtos) {
    /* Buscamos si el tuit existe y si existe lo actualiza, de lo contraro retorna un null */
    const tuit: Tuit = await this.tuitRepository.preload({ id, message });
    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }
    return tuit;
  }

  async removeTuit(id: number): Promise<void> {
    const tuit: Tuit = await this.tuitRepository.findOne(id);
    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }
    this.tuitRepository.remove(tuit);
  }
}
