/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { TrabalhosService } from './trabalhos.service';
import { CreateTrabalhoDto } from './dto/create-trabalho.dto';
import { UpdateTrabalhoDto } from './dto/update-trabalho.dto';
import { UsuarioExistsInterceptor } from 'src/Interceptors/UsuarioExistsInterceptor';
import { FirebaseAuthGuard } from 'src/Guards/firebase-auth.guard';
import { OwnerCheckInterceptor } from 'src/Interceptors/owner-check.interceptor';

@Controller('trabalhos')
export class TrabalhosController {
  constructor(private readonly trabalhosService: TrabalhosService) {}

  
  @Post()
  @UseGuards(FirebaseAuthGuard)
  @UseInterceptors(UsuarioExistsInterceptor) // Aplica o interceptor
  async create(@Body() createTrabalhoDto: CreateTrabalhoDto, @Request() req) {
    const { usuario } = req;
    const { sub } = usuario;
    console.log(usuario); // Adicione logs para depuração
    return this.trabalhosService.create(createTrabalhoDto, sub);
  }

  @Get()
  findAll() {
    return this.trabalhosService.findAll();
  }
  @Get(':id')
  @UseGuards(FirebaseAuthGuard) // Protege o método com FirebaseAuthGuard
  findOne(@Param('id') id: string) {
    return this.trabalhosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard)
  @UseInterceptors(UsuarioExistsInterceptor) // Aplica o interceptor
  @UseInterceptors(OwnerCheckInterceptor) // Aplica o interceptor
  update(@Param('id') id: string, @Body() updateTrabalhoDto: UpdateTrabalhoDto, @Request() req) {
    const { user } = req;
    const { sub } = user;
    return this.trabalhosService.update(id, updateTrabalhoDto, sub);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @UseInterceptors(UsuarioExistsInterceptor) // Aplica o interceptor
  @UseInterceptors(OwnerCheckInterceptor) // Aplica apenas o interceptor OwnerCheckInterceptor
  remove(@Param('id') id: string, @Request() req) {
    return this.trabalhosService.remove(id, req.usuario.sub);
  }
}
