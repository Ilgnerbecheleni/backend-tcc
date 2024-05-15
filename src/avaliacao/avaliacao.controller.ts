/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { FirebaseAuthGuard } from 'src/Guards/firebase-auth.guard';
import { UsuarioExistsInterceptor } from 'src/Interceptors/UsuarioExistsInterceptor';
import { SubToIdInterceptor } from 'src/Interceptors/sub-to-id.interceptor';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post(':avaliadoId')
  @UseGuards(FirebaseAuthGuard)
  @UseInterceptors(UsuarioExistsInterceptor)
  @UseInterceptors(SubToIdInterceptor)
  async createOrUpdate(@Param('avaliadoId') avaliadoId: string, @Body() createClassificacaoDto: CreateAvaliacaoDto, @Request() req) {
    const userId = req.userId;
    console.log(userId)
    return await this.avaliacaoService.createOrUpdate(createClassificacaoDto, userId, avaliadoId);
  }
  @Get()
  findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avaliacaoService.findOne(id);
  }


}
