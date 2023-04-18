import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { BookingsDto, BookingsSignUp } from './Dto/bookings.dto';

@Injectable()
export class BookingsService {
  private prisma: PrismaClient = new PrismaClient();

  getBookingsAll(): Promise<BookingsDto[]> {
    try {
      return this.prisma.bookings.findMany();
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  // Booking
  async postBookings(body: BookingsSignUp) {
    try {
      const Date_in = new Date(body.checkIn_date);
      const Date_out = new Date(body.checkOut_date);

      // Check in date must be greater than now.
      if (Date_in < new Date(Date.now())) {
        return 'Your booking is not valid.';
      }

      // Check all the dates the room being booked
      const occupiedDates: BookingsSignUp[] =
        await this.prisma.bookings.findMany({
          where: {
            room_id: body.room_id,
          },
        });

      // Check new booking against occupiedDates
      if (occupiedDates.length) {
        for (let obj of occupiedDates) {
          let o_in = new Date(obj.checkIn_date);
          let o_out = new Date(obj.checkOut_date);

          if (!(o_out <= Date_in || Date_out <= o_in)) {
            return 'Your booking is not available.  The room already booked';
          }
        }
      }
      // Book the room if the dates are available.
      const Booking = await this.prisma.bookings.create({
        data: {
          ...body,
          checkIn_date: Date_in,
          checkOut_date: Date_out,
        },
      });
      return { status: HttpStatus.OK, data: [Booking] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  async delBooking(id: string) {
    try {
      const Booking = await this.prisma.bookings.delete({
        where: {
          booking_id: Number(id),
        },
      });
      return { status: HttpStatus.OK, data: [Booking] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  getBookingByBookingId(id: string): Promise<BookingsDto> {
    try {
      return this.prisma.bookings.findFirst({
        where: {
          booking_id: Number(id),
        },
      });
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  getBookingByUserId(id: string): Promise<BookingsDto[]> {
    try {
      return this.prisma.bookings.findMany({
        where: {
          user_id: Number(id),
        },
      });
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  async updateBooking(body: BookingsSignUp, id: string) {
    try {
      const Date_in = new Date(body.checkIn_date);
      const Date_out = new Date(body.checkOut_date);

      // Check in date must be greater than now.
      if (Date_in < new Date(Date.now())) {
        return 'Your booking is not valid.';
      }

      // Check all the dates the room being booked
      const occupiedDates: BookingsSignUp[] =
        await this.prisma.bookings.findMany({
          where: {
            room_id: body.room_id,
          },
        });

      // Check new booking against occupiedDates
      if (occupiedDates.length) {
        for (let obj of occupiedDates) {
          let o_in = new Date(obj.checkIn_date);
          let o_out = new Date(obj.checkOut_date);

          if (!(o_out <= Date_in || Date_out <= o_in)) {
            return 'Your booking is not available.  The room already booked';
          }
        }
      }

      const Booking = await this.prisma.bookings.update({
        where: {
          booking_id: Number(id),
        },
        data: {
          ...body,
          checkIn_date: Date_in,
          checkOut_date: Date_out,
        },
      });
      return { status: HttpStatus.OK, data: [Booking] };
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }

  getBookingByRoomId(id: string): Promise<BookingsDto[]> {
    try {
      return this.prisma.bookings.findMany({
        where: {
          room_id: Number(id),
        },
      });
    } catch {
      throw new HttpException('BE fault', 500);
    }
  }
}
