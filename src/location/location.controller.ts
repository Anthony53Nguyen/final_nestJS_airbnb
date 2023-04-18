import { Controller,
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
    Query, } from '@nestjs/common';
    import { LocationDto, LocationPost, IGetAllQuery, FileDto,FileUploadDto } from './Dto/location.dto';
    import { LocationService } from './location.service';
    import { ConfigService } from '@nestjs/config';
    import { AuthGuard } from '@nestjs/passport';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    
    import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
    
    
@ApiTags('Location')
@Controller('api/location')
export class LocationController {
    constructor(
        private LocationService: LocationService,
        private configService: ConfigService,
      ) {}

      @Get('/getLocationAll')
      getLocationAll(): Promise<LocationDto[]> {
        return this.LocationService.getLocationAll();
      }

      @ApiBearerAuth()
      @UseGuards(AuthGuard('jwt'))
      @Post('/postLocation')
      postRoom(@Body() body: LocationPost,
      @Headers('Authorization') Authorization: string,) {
        return this.LocationService.postLocation(body);
      }

      @ApiBearerAuth()
      @UseGuards(AuthGuard('jwt'))
      @Delete('/delLocation/:id')
      delLocation(@Param('id') id: string, 
      @Headers('Authorization') Authorization: string,) {
      return this.LocationService.delLocation(id);
    }

    @Get('/getLocationById/:id')
    getLocationById(@Param('id') id: string): Promise<LocationDto> {
      return this.LocationService.getLocationById(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put('/updateLocationById/:id')
    updateLocationById(@Body() body: LocationPost, @Param('id') id: string, 
    @Headers('Authorization') Authorization: string,) {
      return this.LocationService.updateLocationById(body, id);
    }

    @Get('/getLocationPagination')
    getUserPagination(@Query() query: IGetAllQuery): Promise<LocationDto[]> {
      return this.LocationService.getLocationPagination(query);
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
          destination: process.cwd() + '/public/img/loc',
          filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
        }),
      }),
    )
    @Post('/uploadLocPic')
    uploadLocPic(
      @Headers('Authorization') Authorization: string,     
      @Query("loc_id") id: string,
      @UploadedFile() file: FileDto,
    ) {
      return this.LocationService.uploadLocPic(file, id);
    }
}
