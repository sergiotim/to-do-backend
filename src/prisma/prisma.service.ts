import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { log } from 'console';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(){
        super({
            log:['query','info','warn', 'error']
        })
    }

    async onModuleInit() {
        await this.$connect()
        console.log('Prisma conectado ao db')
    }

    async onModuleDestroy() {
        await this.$disconnect()
        console.log('Prisma desconectado ao db')
    }

}
