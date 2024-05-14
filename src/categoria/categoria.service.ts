/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      return await this.prisma.categoria.create({
        data: createCategoriaDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create categoria');
    }
  }

  async findAll() {
    try {
      return await this.prisma.categoria.findMany();
    } catch (error) {
      throw new BadRequestException('Failed to fetch categorias');
    }
  }

  async findOne(id: string) {
    try {
      const categoria = await this.prisma.categoria.findUnique({
        where: { id },
      });
      if (!categoria) {
        throw new NotFoundException(`Categoria with ID ${id} not found`);
      }
      return categoria;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch categoria');
    }
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const categoria = await this.prisma.categoria.findUnique({
        where: { id },
      });
      if (!categoria) {
        throw new NotFoundException(`Categoria with ID ${id} not found`);
      }
      return await this.prisma.categoria.update({
        where: { id },
        data: updateCategoriaDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update categoria');
    }
  }

  async remove(id: string) {
    try {
      const categoria = await this.prisma.categoria.findUnique({
        where: { id },
      });
      if (!categoria) {
        throw new NotFoundException(`Categoria with ID ${id} not found`);
      }
      return await this.prisma.categoria.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete categoria');
    }
  }
}
