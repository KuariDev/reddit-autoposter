import { Module } from '@nestjs/common'
import { PrismaProviderModule } from './database/prisma/provider.module'

@Module({
  imports: [PrismaProviderModule],
  exports: [PrismaProviderModule]
})
export class ProvidersModule {}