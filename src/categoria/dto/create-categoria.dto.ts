/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    @IsNotEmpty()
    NomeServico: string;

}
