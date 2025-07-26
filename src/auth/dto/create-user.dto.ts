import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsEmail({},{message:'Por favor, forneça um endereço de e-mail válido.'})
    @IsNotEmpty({message:'O email não pode estar vazio.'})
    email:string


    @IsString({message:'A senha deve ser uma string.'})
    @IsNotEmpty({message:'A senha não pode estar vazia.'})
    @MinLength(6,{message:'A senha deve ter pelo menos 6 caracteres.'})
    password:string

}