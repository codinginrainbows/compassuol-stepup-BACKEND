import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  post_id: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
