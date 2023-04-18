import { ApiProperty } from "@nestjs/swagger";
import { Readable } from "stream";

export interface LocationDto {
    location_id: number,
    address: string,
    province_city: string,
    country: string,
    loc_image: string
}

export class LocationPost {
    @ApiProperty({ description: "address", type: String })
    address: string 
    @ApiProperty({ description: "province_city", type: String })
    province_city: string
    @ApiProperty({ description: "country", type: String })
    country: string 
    @ApiProperty({ description: "loc_image", type: String })
    loc_image: string 
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