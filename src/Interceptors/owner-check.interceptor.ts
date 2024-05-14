/* eslint-disable prettier/prettier */
// src/interceptors/owner-check.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnerCheckInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.usuario.sub; // Assumindo que o sub do usuário está disponível na requisição

    if (!userId) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const trabalhoId = request.params.id; // Assumindo que o ID do trabalho está presente nos parâmetros da requisição

    if (!trabalhoId) {
      throw new ForbiddenException('ID do trabalho não fornecido');
    }

    const trabalho = await this.prisma.trabalho.findUnique({
      where: { id: trabalhoId },
      select: { usuarioSub: true },
    });

    if (!trabalho) {
      throw new ForbiddenException('Trabalho não encontrado');
    }

    if (trabalho.usuarioSub !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este trabalho');
    }

    return next.handle();
  }
}
