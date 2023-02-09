import { Injectable } from '@nestjs/common';
import { RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

import { getEnvVariables } from '../../config/src/helpers';

@Injectable()
export class RabbitMqService {
  private env;
  constructor () {
    this.env = getEnvVariables();
  }

  getOptions (queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.env.RABBIT_MQ_URI],
        queue: this.env[`RABBIT_MQ_${queue}_QUEUE`],
        noAck,
        persistent: true,
      }
    }
  }
}
