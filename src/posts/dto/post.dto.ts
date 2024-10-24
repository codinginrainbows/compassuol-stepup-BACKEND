import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  url_image: string;

  // @IsNumber()
  likes: string;
}
