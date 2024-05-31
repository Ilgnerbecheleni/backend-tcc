/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TrabalhosModule } from './trabalhos/trabalhos.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';
import { ComentariosModule } from './comentarios/comentarios.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuariosModule,
    TrabalhosModule,
    AvaliacaoModule,
    PrismaModule,
    CategoriaModule,
    ComentariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
