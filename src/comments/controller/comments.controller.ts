import { Controller, Get, Param, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { CommentsService } from '../service/comments.service';

@Controller('comments')
export class CommentsController {
  constructor (private readonly commentsService: CommentsService) {}

  @Get('all')
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
    ) {
    return this.commentsService.createComment(id, body);
  }

  @Patch(':id')
  async plusLike( @Param('id') id: string ) {
    return this.commentsService.plusLike(id);
  }
}
