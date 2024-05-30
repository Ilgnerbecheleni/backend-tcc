/* eslint-disable prettier/prettier */
// UsuarioExistsInterceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class UsuarioExistsInterceptor implements NestInterceptor {
  constructor(private readonly usuariosService: UsuariosService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { sub, name , picture } = request.user;
console.log(request.user)
    let usuario = await this.usuariosService.findBySub(sub);

    if (!usuario) {
      usuario = await this.usuariosService.create({ sub, nome: name , photoUrl :  picture  });
    }

    // Define o usuário criado ou encontrado na requisição
    request.usuario = usuario;

    return next.handle();
  }
}
