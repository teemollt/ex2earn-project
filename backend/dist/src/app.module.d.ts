import { MiddlewareConsumer, NestModule, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AppModule implements NestModule, OnModuleInit {
    private readonly configService;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    configure(consumer: MiddlewareConsumer): void;
}
