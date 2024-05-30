/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    nome: string;
    @IsString()
    telefone?: string;
    @IsString()
    sub: string;
    @IsString()
    photoUrl: string;
}
