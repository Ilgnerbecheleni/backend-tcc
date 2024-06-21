/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioExistsInterceptor } from 'src/Interceptors/UsuarioExistsInterceptor';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { SubToIdInterceptor } from 'src/Interceptors/sub-to-id.interceptor';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports:[PrismaModule,UsuariosModule,FirebaseModule ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService,UsuarioExistsInterceptor,SubToIdInterceptor],
})
export class AvaliacaoModule {}
