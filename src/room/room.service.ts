import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RoomDto, RoomSignUp, FileDto, IGetAllQuery } from './Dto/room.dto';

@Injectable()
export class RoomService {
  private jwtService: JwtService = new JwtService();
  private prisma: PrismaClient = new PrismaClient();

  getRoomAll(): Promise<RoomDto[]> {
    try {
      return this.prisma.room.findMany();
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  async postRoom(body: RoomSignUp) {
    try {
      const Room = await this.prisma.room.create({
        data: body,
      });
      return { status: HttpStatus.OK, data: [Room] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  async delRoom(id: string) {
    try {
      const Room = await this.prisma.room.delete({
        where: {
          room_id: Number(id),
        },
      });
      return { status: HttpStatus.OK, data: [Room] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  getRoomByRoomId(id: string): Promise<RoomDto> {
    try {
      return this.prisma.room.findFirst({
        where: {
          room_id: Number(id),
        },
      });
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  getRoomByLocId(id: string): Promise<RoomDto[]> {
    try {
      return this.prisma.room.findMany({
        where: {
          location_id: Number(id),
        },
      });
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  async updateRoomById(body: RoomSignUp) {
    try {
      const Room = await this.prisma.room.update({
        where: {
          room_id: body.room_id,
        },
        data: {
          ...body,
        },
      });
      return { status: HttpStatus.OK, data: [Room] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }
  getRoomPagination(query: IGetAllQuery): Promise<RoomDto[]> {
    try {
      return this.prisma.room.findMany({
        skip: (Number(query.page)-1)*Number(query.limit),
        take: Number(query.limit),
        where: {
          OR: [
            {
              room_name: {
                contains: query.search,
              },
            },
            {
              description: {
                contains: query.search,
              },
            },
          ],
        },
      });
    } catch (e) {
      throw new HttpException('BE fault', 500);
    }
  }
  async uploadRoomPic(file: FileDto, id: string) {
    try {   
      const Room: RoomDto = await this.prisma.room.update({
        where: {
          room_id: Number(id),
        },
        data: {
          room_pic: process.cwd() + '/public/img/room/' + file.filename,
        },
      });

      return { status: HttpStatus.OK, data: [Room.room_pic] };

    } catch (e) {
      console.log(e);
      throw new HttpException('BE fault', 500);
    }
  }
}
