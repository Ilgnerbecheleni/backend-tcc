/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {
  
 constructor(private readonly prismaService:PrismaService){}
  
  create(createUsuarioDto: CreateUsuarioDto) {
     try {
      const user = this.prismaService.usuarios.create({
        data :{...createUsuarioDto},
      });
       return user


    } catch (error) {
      throw new BadRequestException("Falha ao criar usuarios");
    }
  }

  async findAll() {
   try {
    const users = await this.prismaService.usuarios.findMany();
    return users
   } catch (error) {
    throw new BadRequestException("Falha ao buscar usuarios");
   }
  }

  findOne(id: string) {
    return `This action returns a #${id} usuario`;
  }

  async findBySub(usersub:string){
try {
  const user = this.prismaService.usuarios.findFirst({where:{sub:usersub}});
  return user
} catch (error) {
  throw new BadRequestException("Falha ao buscar usuario");
}


  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: string) {
    return `This action removes a #${id} usuario`;
  }
}
