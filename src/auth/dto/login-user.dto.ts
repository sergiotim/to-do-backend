import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'meuemail@exemplo.com',
  })
  @IsEmail({}, { message: 'Por favor, forneça um endereço de e-mail válido.' })
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'suaSenhaSecreta123',
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  password: string;
}
