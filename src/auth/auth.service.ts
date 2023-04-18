import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BodyLogin, BodySignUp } from './Dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  private prisma: PrismaClient = new PrismaClient();

  async signup(body: BodySignUp) {
    // xử lý signup
    try {
      
      let checkEmail = await this.prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });

      if (checkEmail) {
        throw new HttpException('Email already existed', 400);
      }

      let modelUser = {
        ...body,
        pass_word: bcrypt.hashSync(body.pass_word, 10),
      };
      
      const Users = await this.prisma.users.create({
        data: modelUser,
      });    
      return { status: HttpStatus.OK, data: [Users] }

    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  async login(body: BodyLogin): Promise<string>{
    try {
      let { email, pass_word } = body;

      let checkEmail = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (checkEmail) {
        let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);
        if (checkPass) {
          let jwtToken = this.jwtService.sign(
            { data: { checkEmail } },
            { secret: this.config.get("SECRET_KEY"), expiresIn: '30m' },
          );
          return jwtToken;
        } else {
          throw new HttpException('Wrong password', 400);
        }
      } else {
        throw new HttpException('Wrong Email', 400);
      }
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }
}
