import {ApiProperty } from '@nestjs/swagger';


export class BodyLogin {

    @ApiProperty({ description: "email", type: String })
    email: string 
    @ApiProperty({ description: "pass_word", type: String })
    pass_word: string
  }

  export class BodySignUp {
    @ApiProperty({ description: "full_name", type: String })
    full_name: string
    @ApiProperty({ description: "email", type: String })
    email: string
    @ApiProperty({ description: "pass_word", type: String })
    pass_word: string
    @ApiProperty({ description: "phone", type: String })
    phone: string
    @ApiProperty({ description: "birth_day", type: String })
    birth_day: string
    @ApiProperty({ description: "gender", type: String })
    gender: string
    // @ApiProperty({ description: "avatar", type: String })
    // avatar: string
    @ApiProperty({ description: "role", type: String })
    role: string
  }
