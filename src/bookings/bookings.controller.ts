import {
  Controller,
  Get,
  Param,
  Body,
  UseGuards,
  Post,
  Put,
  Headers,
  Delete,
} from '@nestjs/common';
import { BookingsDto, BookingsSignUp } from './Dto/bookings.dto';
import { BookingsService } from './bookings.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('api/bookings')
export class BookingsController {
  constructor(
    private BookingsService: BookingsService,
  ) {}

  @Get('/getBookingsAll')
  getBookingsAll(): Promise<BookingsDto[]> {
    return this.BookingsService.getBookingsAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/postBookings')
  postBookings(
    @Body() body: BookingsSignUp,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.BookingsService.postBookings(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delBooking/:id')
  delBooking(
    @Param('id') id: string,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.BookingsService.delBooking(id);
  }

  @Get('/getBookingByBookingId/:id')
  getBookingByBookingId(@Param('id') id: string): Promise<BookingsDto> {
    return this.BookingsService.getBookingByBookingId(id);
  }

  @Get('/getBookingByUserId/:id')
  getBookingByUserId(@Param('id') id: string): Promise<BookingsDto[]> {
    return this.BookingsService.getBookingByUserId(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/updateBooking/:id')
  updateBooking(
    @Body() body: BookingsSignUp,
    @Param('id') id: string,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.BookingsService.updateBooking(body, id);
  }

  @Get('/getBookingByRoomId/:id')
  getBookingByRoomId(@Param('id') id: string): Promise<BookingsDto[]> {
    return this.BookingsService.getBookingByRoomId(id);
  }
}
