import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrabalhosService } from './trabalhos.service';
import { CreateTrabalhoDto } from './dto/create-trabalho.dto';
import { UpdateTrabalhoDto } from './dto/update-trabalho.dto';

@Controller('trabalhos')
export class TrabalhosController {
  constructor(private readonly trabalhosService: TrabalhosService) {}

  @Post()
  create(@Body() createTrabalhoDto: CreateTrabalhoDto) {
    return this.trabalhosService.create(createTrabalhoDto);
  }

  @Get()
  findAll() {
    return this.trabalhosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trabalhosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrabalhoDto: UpdateTrabalhoDto) {
    return this.trabalhosService.update(+id, updateTrabalhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trabalhosService.remove(+id);
  }
}
