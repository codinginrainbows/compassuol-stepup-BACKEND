import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  // @UseG  uards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOneById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async newPost(@Body() commentsDto: CommentDto): Promise<Comment> {
    return this.commentsService.newComment(commentsDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.delete(id);
  }
}
