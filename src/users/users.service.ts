import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserDto, FileDto, IGetAllQuery } from './Dto/users.dto';
import { BodySignUp } from '../auth/Dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private jwtService: JwtService = new JwtService();
  private prisma: PrismaClient = new PrismaClient();

  getUserAll(): Promise<UserDto[]> {
    try {
      return this.prisma.users.findMany();
    } catch (e) {
      throw new HttpException('BE fault', 500);
    }
  }

  async postUser(body: BodySignUp) {
    try {
      let modelUser = {
        ...body,
        pass_word: bcrypt.hashSync(body.pass_word, 10),
      };

      const Users = await this.prisma.users.create({
        data: modelUser,
      });
      return { status: HttpStatus.OK, data: [Users] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  async delUser(id: string) {
    try {
      const Users = await this.prisma.users.delete({
        where: {
          user_id: Number(id),
        },
      });
      return { status: HttpStatus.OK, data: [Users] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  getUserById(id: string): Promise<UserDto> {
    try {
      return this.prisma.users.findFirst({
        where: {
          user_id: Number(id),
        },
      });
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  async updateUserById(body: BodySignUp, id: string) {
    try {
      const Users = await this.prisma.users.update({
        where: {
          user_id: Number(id),
        },
        data: {
          ...body,
        },
      });
      return { status: HttpStatus.OK, data: [Users] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  searchUserByName(searchName: string): Promise<UserDto[]> {
    try {
      return this.prisma.users.findMany({
        where: {
          full_name: {
            contains: searchName,
          },
        },
      });
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  getUserPagination(query: IGetAllQuery): Promise<UserDto[]> {
    try {
      return this.prisma.users.findMany({
        skip: (Number(query.page)-1)*Number(query.limit),
        take: Number(query.limit),
        where: 
          {full_name: {
            contains: query.search,
          }},          
      });
    } catch (e) {
      throw new HttpException('BE fault', 500);
    }
  }

  async upload(file: FileDto, token: string) {
    try {
      const arr = token.split(' ');
      const decodedToken: string | any = this.jwtService.decode(arr[1], {
        complete: true,
      });
      const userData = decodedToken.payload.data.checkEmail;

      const Users = await this.prisma.users.update({
        where: {
          user_id: userData.user_id,
        },
        data: {
          avatar: process.cwd() + '/public/img/avatar/' + file.filename,
        },
      });

      return { status: HttpStatus.OK, data: [Users.avatar] };
    } catch (e) {
      console.log(e);
      throw new HttpException('BE fault', 500);
    }
  }
}
