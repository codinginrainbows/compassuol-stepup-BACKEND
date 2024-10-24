import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment')
    private readonly commentsModel: Model<Comment>,
  ) {}

  public async findAll(): Promise<Comment[]> {
    return this.commentsModel.find();
  }

  public async findOneById(id: string): Promise<Comment> {
    const commentExists = await this.commentsModel.findById(id);

    if (!commentExists) {
      throw new NotFoundException('Comment not found');
    }

    return this.commentsModel.findById(id);
  }

  public async newComment(commentDto: CommentDto): Promise<Comment> {
    const comment = new this.commentsModel(commentDto);

    return comment.save();
  }

  public async delete(id: string): Promise<Comment> {
    const commentExists = await this.commentsModel.findById(id);

    if (!commentExists) {
      throw new NotFoundException('Comment not found');
    }

    return this.commentsModel.findByIdAndDelete(id);
  }
}
