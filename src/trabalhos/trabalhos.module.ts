/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TrabalhosService } from './trabalhos.service';
import { TrabalhosController } from './trabalhos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { OwnerCheckInterceptor } from 'src/Interceptors/owner-check.interceptor';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports:[PrismaModule, FirebaseModule,UsuariosModule],
  controllers: [TrabalhosController],
  providers: [TrabalhosService,OwnerCheckInterceptor],
})
export class TrabalhosModule {}
