import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

import { getEnvVariables } from '../../config/src/helpers';
import { RabbitMqService } from './rabbit-mq.service';

interface RabbitMqModuleOptions {
  name: string
}

@Module({
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
  static register ({ name }: RabbitMqModuleOptions): DynamicModule {
    const env = getEnvVariables();
    
    return {
      module: RabbitMqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: () => ({
              transport: Transport.RMQ,
              options: {
                urls: [env.RABBIT_MQ_URI],
                queue: env[`RABBIT_MQ_${name}_QUEUE`]
              }
            })
          }
        ]),
      ],
      exports: [ClientsModule]
    }
  }
}
