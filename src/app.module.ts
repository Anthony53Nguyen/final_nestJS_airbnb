import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { RoomModule } from './room/room.module';
import { BookingsModule } from './bookings/bookings.module';
import { CommentsModule } from './comments/comments.module';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, AuthModule, LocationModule, RoomModule, BookingsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
