import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './models/posts.model';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private readonly postsModel: Model<Post>,
  ) {}

  public async feed(): Promise<Post[]> {
    return this.postsModel.find();
  }

  public async findOneById(id: string): Promise<Post> {
    const postExists = await this.postsModel.findById(id);

    if (!postExists) {
      throw new NotFoundException('Post não existe');
    }

    return this.postsModel.findById(id);
  }

  public async newPost(postDto: PostDto): Promise<Post> {
    const post = new this.postsModel(postDto);

    return post.save();
  }

  public async update(id: string, updatePost: Post): Promise<Post> {
    return await this.postsModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: updatePost,
      },
      {
        new: true,
      },
    );
  }

  public async delete(id: string): Promise<Post> {
    const postExists = await this.postsModel.findById(id);

    if (!postExists) {
      throw new NotFoundException('Post não existe');
    }

    return this.postsModel.findByIdAndDelete(id);
  }
}
