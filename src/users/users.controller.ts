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
import { FileDto, UserDto, FileUploadDto, IGetAllQuery } from './Dto/users.dto';
import { UsersService } from './users.service';
import { BodySignUp } from '../auth/Dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/getUserAll')
  getUserAll(): Promise<UserDto[]> {
    return this.usersService.getUserAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/postUser')
  postUser(
    @Body() body: BodySignUp,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.usersService.postUser(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delUser/:id')
  delUser(
    @Param('id') id: string,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.usersService.delUser(id);
  }

  @Get('/getUser/:id')
  getUserById(@Param('id') user_id: string): Promise<UserDto> {
    return this.usersService.getUserById(user_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/updateUser/:id')
  updateUserById(
    @Body() body: BodySignUp,
    @Param('id') id: string,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.usersService.updateUserById(body, id);
  }

  @Get('/search/:searchName')
  searchUserByName(@Param('searchName') hoTen: string): Promise<UserDto[]> {
    return this.usersService.searchUserByName(hoTen);
  }

  @Get('/getUserPagination')
  getUserPagination(@Query() query: IGetAllQuery): Promise<UserDto[]> {
    return this.usersService.getUserPagination(query);
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
        destination: process.cwd() + '/public/img/avatar',
        filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
      }),
    }),
  )
  @Post('/upload-avatar')
  upload(
    @UploadedFile() file: FileDto,
    @Headers('Authorization') token: string,
  ) {
    return this.usersService.upload(file, token);
  }
}
