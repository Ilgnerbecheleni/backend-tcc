/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException  } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvaliacaoService {
  
  constructor(private readonly prisma: PrismaService) {}

  
  async createOrUpdate(createClassificacaoDto: CreateAvaliacaoDto, autorId: string, avaliadoId: string) {
    try {
      // Verifica se o usuário avaliado existe
      const avaliado = await this.prisma.usuarios.findUnique({
        where: { id: avaliadoId },
      });

      if (!avaliado) {
        throw new NotFoundException(`Usuário com ID ${avaliadoId} não encontrado`);
      }

      // Verifica se o autor já fez uma avaliação para este avaliado
      const classificacaoExistente = await this.prisma.classificacao.findFirst({
        where: {
          autorId: autorId,
          avaliadoId: avaliadoId,
        },
      });

      if (classificacaoExistente) {
        // Atualiza a avaliação existente
        return await this.prisma.classificacao.update({
          where: {
            id: classificacaoExistente.id,
          },
          data: {
            classificacao: createClassificacaoDto.classificacao,
          },
        });
      } else {
        // Cria uma nova avaliação
        return await this.prisma.classificacao.create({
          data: {
            classificacao: createClassificacaoDto.classificacao,
            autorId,
            avaliadoId,
          },
        });
      }
    } catch (error) {
      throw new BadRequestException({ message: 'Falha ao criar ou atualizar classificação', erro: error.message });
    }
  }

  findAll() {
    return `This action returns all avaliacao`;
  }

  async findOne(userId: string) {
    try {
      const avaliacoes = await this.prisma.classificacao.findMany({
        where: {
          avaliadoId: userId,
        },
      });

      if (!avaliacoes || avaliacoes.length === 0) {
        const totalAvaliacoes = avaliacoes.length;
        const mediaAvaliacoes = 0;
        return { totalAvaliacoes, mediaAvaliacoes };
      }

      // Calcular a média das avaliações
      const totalAvaliacoes = avaliacoes.length;
      const somaAvaliacoes = avaliacoes.reduce((sum, avaliacao) => sum + avaliacao.classificacao, 0);
      const mediaAvaliacoes = somaAvaliacoes / totalAvaliacoes;

      return { totalAvaliacoes, mediaAvaliacoes };
    } catch (error) {
      throw new NotFoundException(`Erro ao buscar avaliações para o usuário com ID ${userId}: ${error.message}`);
    }
  }
  }

 

