import { ApiProperty } from "@nestjs/swagger";
import { Readable } from "stream";

export interface RoomDto {
    room_id: number,
    room_name: string,
    max_guess: number,
    bedrooms: number,
    num_beds: number,
    bathrooms: number,
    description: string,
    price: number,
    washing_machine: boolean,
    iron: boolean,
    tivi: boolean,
    air_condition: boolean,
    wifi: boolean,
    kitchen: boolean,
    parking: boolean,
    swimming: boolean,
    iron_table: boolean,
    location_id: number,
    room_pic: string
}

export class RoomSignUp {
  @ApiProperty({ description: "room_id", type: Number })
  room_id: number
    @ApiProperty({ description: "room_name", type: String })
    room_name: string
    @ApiProperty({ description: "max_guess", type: Number })
    max_guess: number
    @ApiProperty({ description: "bedrooms", type: Number })
    bedrooms: number
    @ApiProperty({ description: "num_beds", type: Number })
    num_beds: number
    @ApiProperty({ description: "bathrooms", type: Number })
    bathrooms: number
    @ApiProperty({ description: "description", type: String })
    description: string
    @ApiProperty({ description: "price", type: Number })
    price: number
    @ApiProperty({ description: "washing_machine", type: Boolean })
    washing_machine: boolean
    @ApiProperty({ description: "iron", type: Boolean })
    iron: boolean
    @ApiProperty({ description: "tivi", type: Boolean })
    tivi: boolean
    @ApiProperty({ description: "air_condition", type: Boolean })
    air_condition: boolean
    @ApiProperty({ description: "wifi", type: Boolean })
    wifi: boolean
    @ApiProperty({ description: "kitchen", type: Boolean })
    kitchen: boolean
    @ApiProperty({ description: "parking", type: Boolean })
    parking: boolean
    @ApiProperty({ description: "swimming", type: Boolean })
    swimming: boolean
    @ApiProperty({ description: "iron_table", type: Boolean })
    iron_table: boolean
    @ApiProperty({ description: "location_id", type: Number })
    location_id: number
    @ApiProperty({ description: "room_pic", type: String })
    room_pic: string
  }
  export class IGetAllQuery {

    @ApiProperty({ description: "search", type: String })
    search: string 
    @ApiProperty({ description: "page", type: Number })
    page: number
    @ApiProperty({ description: "limit", type: Number })
    limit: number
  }
  
export interface FileDto {

    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    stream: Readable;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    fileUpload: any;
}