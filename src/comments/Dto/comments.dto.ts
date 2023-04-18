import { ApiProperty } from '@nestjs/swagger';
import { Readable } from 'stream';

export interface CommentsDto {
    comment_id: number,
    room_id: number,
    user_id: number,
    comment_date: Date,
    comment_body: string,
    num_stars: number
}

export class CommentsSignUp {
    // @ApiProperty({ description: "booking_id", type: Number })
    // booking_id: number
    @ApiProperty({ description: 'room_id', type: Number })
    room_id: number;
    @ApiProperty({ description: 'user_id', type: Number })
    user_id: number;
    @ApiProperty({ description: 'comment_date', type: Date })
    comment_date: Date;
    @ApiProperty({ description: 'comment_body', type: String })
    comment_body: string;
    @ApiProperty({ description: 'num_stars', type: Number })
    num_stars: number;
  }
