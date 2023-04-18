import { ApiProperty } from "@nestjs/swagger";
import { Readable } from "stream";

export interface UserDto {
    user_id: number,
    full_name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    avatar: string,
    role: string
}

export class IGetAllQuery {

    @ApiProperty({ description: "search", type: String })
    search: string 
    @ApiProperty({ description: "page", type: Number })
    page: number
    @ApiProperty({ description: "limit", type: Number })
    limit: number
  }

// export interface IGetAllQuery {
//     search: string;
//     page: number;
//     limit: number;
//   } 
  
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

// swagger
export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    fileUpload: any;
}