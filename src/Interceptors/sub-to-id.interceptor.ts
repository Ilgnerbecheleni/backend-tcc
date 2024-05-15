/* eslint-disable prettier/prettier */
// sub-to-id.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubToIdInterceptor implements NestInterceptor {
  constructor(private readonly prismaService: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { sub } = request.user;

    // Aqui você pode usar o Prisma para buscar o ID do usuário pelo sub
    const user = await this.prismaService.usuarios.findUnique({
      where: {
        sub: sub,
      },
    });

    // Se o usuário existir, definimos o ID na requisição
    if (user) {
      request.userId = user.id;
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
