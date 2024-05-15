/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioExistsInterceptor } from 'src/Interceptors/UsuarioExistsInterceptor';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { SubToIdInterceptor } from 'src/Interceptors/sub-to-id.interceptor';

@Module({
  imports:[PrismaModule,UsuariosModule ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService,UsuarioExistsInterceptor,SubToIdInterceptor],
})
export class AvaliacaoModule {}
