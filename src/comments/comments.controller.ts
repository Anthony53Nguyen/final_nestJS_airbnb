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
import { CommentsDto, CommentsSignUp } from './Dto/comments.dto';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('api/comments')
export class CommentsController {
  constructor(private CommentsService: CommentsService) {}

  @Get('/getCommentsAll')
  getCommentsAll(): Promise<CommentsDto[]> {
    return this.CommentsService.getCommentsAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/postComment')
  postComment(
    @Body() body: CommentsSignUp,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.CommentsService.postComment(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delComment/:id')
  delComment(
    @Param('id') id: string,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.CommentsService.delComment(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/updateComment/:id')
  updateComment(
    @Body() body: CommentsSignUp,
    @Param('id') id: string,
    @Headers('Authorization') Authorization: string,
  ) {
    return this.CommentsService.updateComment(body, id);
  }

  @Get('/getCommentsByRoomId/:id')
  getCommentsByRoomId(@Param('id') id: string): Promise<CommentsDto[]> {
    return this.CommentsService.getCommentsByRoomId(id);
  }
}
