import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CommentsDto, CommentsSignUp } from './Dto/comments.dto';

@Injectable()
export class CommentsService {
    private jwtService: JwtService = new JwtService();
    private prisma: PrismaClient = new PrismaClient();

    async getCommentsAll(): Promise<CommentsDto[]> {
        try {
          return await this.prisma.comments.findMany();
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }
    
      async postComment(body: CommentsSignUp) {
        try {
          const Comment = await this.prisma.comments.create({
            data: {...body, comment_date: new Date(body.comment_date)}
          });
          return { status: HttpStatus.OK, data: [Comment] };
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }

      async delComment(id: string) {
        try {
          const Comment = await this.prisma.comments.delete({
            where: {
              comment_id: Number(id),
            },
          });
          return { status: HttpStatus.OK, data: [Comment] };
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }

      async updateComment(body: CommentsSignUp, id: string) {
        try {
          const Comment = await this.prisma.comments.update({
            where: {
              comment_id: Number(id),
            },
            data: {
              ...body, comment_date: new Date(body.comment_date)
            },
          });
          return { status: HttpStatus.OK, data: [Comment] };
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }
      async getCommentsByRoomId(id: string): Promise<CommentsDto[]> {
        try {
          return await this.prisma.comments.findMany({
            where: {
              room_id: Number(id),
            },
          });
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }
}
