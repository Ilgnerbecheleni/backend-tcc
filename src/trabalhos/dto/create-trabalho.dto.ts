/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrabalhoDto {

@IsString()
titulo : string;
@IsString()
telefone: string;
@IsString()
localizacao:string;
@IsNumber()
valorHora:number;
@IsString()
servicoId:string;



}
