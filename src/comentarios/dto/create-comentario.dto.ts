/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateComentarioDto {
    @IsString()
    comentario: string;
    @IsString()
    userSub: string;
    @IsString()
    trabalhoId: string;
}
