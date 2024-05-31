/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComentariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateComentarioDto) {
    try {
      // Verifica se já existe um comentário do mesmo usuário para o mesmo trabalho
      const existingComentario = await this.prisma.comentarios.findFirst({
        where: {
          userSub: data.userSub,
          trabalhoId: data.trabalhoId,
        },
      });

      if (existingComentario) {
        throw new BadRequestException('Usuário já fez um comentário para este trabalho.');
      }

      return await this.prisma.comentarios.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException(`Erro ao criar comentário: ${error.message}`);
    }
  }
  async findAll() {
    try {
      return await this.prisma.comentarios.findMany({
        select: {
          comentario: true,
          user: {
            select: {
              nome: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(`Erro ao buscar comentários: ${error.message}`);
    }
  }
  async findOne(id: string) {
    try {
      const comentario = await this.prisma.comentarios.findUnique({
        where: { id },
      });
      if (!comentario) {
        throw new NotFoundException(`Comentário com ID ${id} não encontrado`);
      }
      return comentario;
    } catch (error) {
      throw new BadRequestException(`Erro ao buscar comentário: ${error.message}`);
    }
  }

  async findByTrabalhoId(trabalhoId: string) {
    try {
      const comentarios = await this.prisma.comentarios.findMany({
        where: { trabalhoId }, select: {
          comentario: true,
          user: {
            select: {
              nome: true,
            },
          },
        }
      });
      if (comentarios.length === 0) {
        throw new NotFoundException(`Nenhum comentário encontrado para trabalhoId ${trabalhoId}`);
      }
      return comentarios;
    } catch (error) {
      throw new BadRequestException(`Erro ao buscar comentários por trabalhoId: ${error.message}`);
    }
  }

  async update(id: string, data: UpdateComentarioDto) {
    try {
      const comentario = await this.prisma.comentarios.findUnique({
        where: { id },
      });
      if (!comentario) {
        throw new NotFoundException(`Comentário com ID ${id} não encontrado`);
      }
      return await this.prisma.comentarios.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(`Erro ao atualizar comentário: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const comentario = await this.prisma.comentarios.findUnique({
        where: { id },
      });
      if (!comentario) {
        throw new NotFoundException(`Comentário com ID ${id} não encontrado`);
      }
      return await this.prisma.comentarios.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(`Erro ao deletar comentário: ${error.message}`);
    }
  }
}
