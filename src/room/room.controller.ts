import {
    Controller,
    Get,
    Param,
    Body,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Post,
    Put,
    Headers,
    Delete,
    Query,
  } from '@nestjs/common';
  import { FileDto, RoomDto, RoomSignUp, FileUploadDto, IGetAllQuery } from './Dto/room.dto';
  import { RoomService } from './room.service';
  import { ConfigService } from '@nestjs/config';
 
  import { AuthGuard } from '@nestjs/passport';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  
  import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
  
@ApiTags('Room')
@Controller('api/room')
export class RoomController {
    constructor(
      private RoomService: RoomService,
      private configService: ConfigService,
    ) {}

    @Get('/getRoomAll')
    getRoomAll(): Promise<RoomDto[]> {
      return this.RoomService.getRoomAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/postRoom')
    postRoom(@Body() body: RoomSignUp, @Headers("Authorization") Authorization: string) {
      return this.RoomService.postRoom(body);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delRoom/:id')
    delRoom(@Param('id') id: string, @Headers("Authorization") Authorization: string) {
      return this.RoomService.delRoom(id);
    }

    @Get('/getRoomByRoomId/:id')
    getRoomByRoomId(@Param('id') id: string): Promise<RoomDto> {
      return this.RoomService.getRoomByRoomId(id);
    }

    @Get('/getRoomByLocId/:id')
    getRoomByLocId(@Param('id') id: string): Promise<RoomDto[]> {
      return this.RoomService.getRoomByLocId(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put('/updateRoomById/:id')
    updateRoomById(@Body() body: RoomSignUp, @Headers("Authorization") Authorization: string) {
      return this.RoomService.updateRoomById(body);
    }

    @Get('/getRoomPagination')
    getRoomPagination(@Query() query: IGetAllQuery): Promise<RoomDto[]> {
      return this.RoomService.getRoomPagination(query);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'File',
      type: FileUploadDto,
    })
    @UseInterceptors(
      FileInterceptor('fileUpload', {
        storage: diskStorage({
          destination: process.cwd() + '/public/img/room',
          filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
        }),
      }),
    )
    @Post('/uploadRoomPic')
    uploadRoomPic(
      @UploadedFile() file: FileDto,
      @Query("room_id") id: string,
      @Headers("Authorization") Authorization: string,
    ) {
      return this.RoomService.uploadRoomPic(file, id);
    }

}
