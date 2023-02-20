import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      message: 'Server running',
      status: 200,
    };
  }
}
