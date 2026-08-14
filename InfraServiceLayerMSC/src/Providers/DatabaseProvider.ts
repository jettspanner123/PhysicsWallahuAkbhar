import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseProvider extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    public constructor() {
        super();
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    public async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }
}
