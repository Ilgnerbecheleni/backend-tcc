/* eslint-disable prettier/prettier */
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrabalhoDto } from './dto/create-trabalho.dto';
import { UpdateTrabalhoDto } from './dto/update-trabalho.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrabalhosService {


  constructor(private readonly prisma: PrismaService) { }

  async create(createTrabalhoDto: CreateTrabalhoDto, sub: string) {
    try {
      // Verifica se já existe um trabalho com o mesmo sub
      const existingTrabalho = await this.prisma.trabalho.findFirst({
        where: { usuarioSub: sub },
      });

      if (existingTrabalho) {
        throw new BadRequestException('Já existe um trabalho criado para este usuário');
      }

      // Cria o novo trabalho
      const trabalho = await this.prisma.trabalho.create({
        data: {
          titulo: createTrabalhoDto.titulo,
          telefone: createTrabalhoDto.telefone,
          localizacao: createTrabalhoDto.localizacao,
          valorHora: createTrabalhoDto.valorHora,
          servicoId: createTrabalhoDto.servicoId,
          descricao: createTrabalhoDto.descricao,
          usuarioSub: sub,
        },
      });

      return trabalho;
    } catch (error) {
      throw new BadRequestException({ message: 'Falha ao criar trabalho', erro: error.message });
    }
  }

  async findAll() {
    try {
      return await this.prisma.trabalho.findMany({include:{
        usuario:{
          select:{id:true,nome:true, photoUrl:true}
        },
        servico:{
          select:{NomeServico:true}
        }
      }});
    } catch (error) {
      throw new BadRequestException({ message: 'Falha ao buscar trabalhos', erro: error.message });
    }
  }

  async findOne(id: string) {
    try {
      const trabalho = await this.prisma.trabalho.findUnique({
        where: { id },include:{
          usuario:{
            select:{id:true,nome:true, photoUrl:true,sub:true,createdAt:true}
          },
          servico:{
            select:{NomeServico:true}
          }
        }
      });

      if (!trabalho) {
        throw new NotFoundException(`Trabalho com ID ${id} não encontrado`);
      }

      return trabalho;
    } catch (error) {
      throw new BadRequestException({ message: 'Falha ao buscar trabalho', erro: error.message });
    }
  }

  async update(id: string, updateTrabalhoDto: UpdateTrabalhoDto, sub: string) {
    try {
      // Verifica se o trabalho existe
      const trabalho = await this.prisma.trabalho.findUnique({
        where: { id },
      });

      if (!trabalho) {
        throw new NotFoundException(`Trabalho com ID ${id} não encontrado`);
      }

      // Verifica se o usuário é o proprietário do trabalho
      const userId = trabalho.usuarioSub;
      if (userId !== sub) {
        throw new ForbiddenException('Você não tem permissão para editar este trabalho');
      }

      // Atualiza o trabalho
      return await this.prisma.trabalho.update({
        where: { id },
        data: updateTrabalhoDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException({ message: 'Falha ao atualizar trabalho', erro: error.message });
    }
  }

  async remove(id: string, sub: string) {
    try {
      // Verifica se o trabalho existe
      const trabalho = await this.prisma.trabalho.findUnique({
        where: { id },
      });

      if (!trabalho) {
        throw new NotFoundException(`Trabalho com ID ${id} não encontrado`);
      }

      // Verifica se o usuário é o proprietário do trabalho
      const userId = trabalho.usuarioSub;
      if (userId !== sub) {
        throw new ForbiddenException('Você não tem permissão para remover este trabalho');
      }

      // Remove o trabalho
      await this.prisma.trabalho.delete({
        where: { id },
      });

      return { message: `Trabalho com ID ${id} removido com sucesso` };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException({ message: 'Falha ao remover trabalho', erro: error.message });
    }
  }


  async count() {
    try {
      const count = await this.prisma.trabalho.count();
      return { count };
    } catch (error) {
      throw new BadRequestException('Failed to count trabalhos');
    }
  }


}
