import { ApiProperty } from '@nestjs/swagger';


export interface BookingsDto {
  booking_id: number;
  room_id: number;
  checkIn_date: Date;
  checkOut_date: Date;
  num_guess: number;
  user_id: number;
}

export class BookingsSignUp {
  // @ApiProperty({ description: "booking_id", type: Number })
  // booking_id: number
  @ApiProperty({ description: 'room_id', type: Number })
  room_id: number;
  @ApiProperty({ description: 'checkIn_date', type: Date })
  checkIn_date: Date;
  @ApiProperty({ description: 'checkOut_date', type: Date })
  checkOut_date: Date;
  @ApiProperty({ description: 'num_guess', type: Number })
  num_guess: number;
  @ApiProperty({ description: 'user_id', type: Number })
  user_id: number;
}
