/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FirebaseAuthGuard } from 'src/Guards/firebase-auth.guard';
import { UsuarioExistsInterceptor } from 'src/Interceptors/UsuarioExistsInterceptor';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
 async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const {sub} = createUsuarioDto;
    const user = await this.usuariosService.findBySub(sub);
    console.log(user);
    if (user) {
      return {
        message: 'Usuário já cadastrado'
      };
    }
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  @UseInterceptors(UsuarioExistsInterceptor) // Aplica o interceptor
  findAll() {
    try {
      return this.usuariosService.findAll();
    } catch (error) {
      
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }



  @Get('count')
  count() {
    return this.usuariosService.count();
  }


}
