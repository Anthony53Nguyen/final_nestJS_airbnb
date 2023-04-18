import { Controller, Get, Param, Query, Req, Body, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';



@ApiTags("app")
@Controller("/app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  
}
