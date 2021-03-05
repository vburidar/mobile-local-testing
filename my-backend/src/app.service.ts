import { Injectable } from '@nestjs/common';

export interface MyHello {
  hello: string;
}

@Injectable()
export class AppService {
  getHello(): MyHello {
    return {hello: 'This Hello World was provided by the backend!'};
  }
}
