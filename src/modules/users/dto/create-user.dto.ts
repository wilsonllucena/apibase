export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  remember_me_token?: string;
}
