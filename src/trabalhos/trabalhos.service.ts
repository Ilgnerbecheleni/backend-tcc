import { Injectable } from '@nestjs/common';
import { CreateTrabalhoDto } from './dto/create-trabalho.dto';
import { UpdateTrabalhoDto } from './dto/update-trabalho.dto';

@Injectable()
export class TrabalhosService {
  create(createTrabalhoDto: CreateTrabalhoDto) {
    return 'This action adds a new trabalho';
  }

  findAll() {
    return `This action returns all trabalhos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trabalho`;
  }

  update(id: number, updateTrabalhoDto: UpdateTrabalhoDto) {
    return `This action updates a #${id} trabalho`;
  }

  remove(id: number) {
    return `This action removes a #${id} trabalho`;
  }
}
