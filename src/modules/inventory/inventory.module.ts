import { Module } from '@nestjs/common';
import { InventoryService } from './application/services/inventory.service';

@Module({
    providers: [InventoryService],
    exports: [InventoryService],
})
export class InventoryModule { }