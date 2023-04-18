import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LocationDto, LocationPost, IGetAllQuery, FileDto } from './Dto/location.dto';

@Injectable()
export class LocationService {
    private jwtService: JwtService = new JwtService();
    private prisma: PrismaClient = new PrismaClient();

    getLocationAll(): Promise<LocationDto[]> {
        try {
          return this.prisma.location.findMany();
        } catch (e) {
          throw new HttpException('BE fault', 500);
        }
      }

      async postLocation(body: LocationPost) {
        try {
          const Location: LocationDto = await this.prisma.location.create({
            data: body           
          });
          return { status: HttpStatus.OK, data: [Location] };
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }

      async delLocation(id: string) {
        try {
          const Location: LocationDto = await this.prisma.location.delete({
            where: {
              location_id: Number(id),
            },
          });
          return { status: HttpStatus.OK, data: [Location] };
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }
      getLocationById(id: string): Promise<LocationDto> {
        try {
          return this.prisma.location.findFirst({
            where: {
              location_id: Number(id),
            },
          });
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }
      async updateLocationById(body: LocationPost, id: string) {
        try {
            
          const Location = await this.prisma.location.update({
            where: {
              location_id: Number(id),
            },
            data: body,
          });
          return { status: HttpStatus.OK, data: [body] };
        } catch {
          throw new HttpException('BE fault', 500);
        }
      }

      getLocationPagination(query: IGetAllQuery): Promise<LocationDto[]> {
        try {
          return this.prisma.location.findMany({
            skip: (Number(query.page)-1)*Number(query.limit),
            take: Number(query.limit),
            where: {
              OR: [
                {
                  address: {
                    contains: query.search,
                  },
                },
                {
                  province_city: {
                    contains: query.search,
                  },
                },
                {
                  country: {
                    contains: query.search
                  },
                },
              ],
            },         
          });
        } catch (e) {
          throw new HttpException('BE fault', 500);
        }
      }

      async uploadLocPic(file: FileDto, id: string) {
        try {   
          const Location: LocationDto = await this.prisma.location.update({
            where: {
              location_id: Number(id),
            },
            data: {
              loc_image: process.cwd() + '/public/img/loc/' + file.filename,
            },
          });
    
          return { status: HttpStatus.OK, data: [Location.loc_image] };
        } catch (e) {
          console.log(e);
          throw new HttpException('BE fault', 500);
        }
      }



}
