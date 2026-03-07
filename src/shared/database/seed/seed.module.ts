import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from '@/shared/config';
import { Category } from '@/shared/database/entities/category.entity';
import { Role } from '@/shared/database/entities/role.entity';
import { User } from '@/shared/database/entities/user.entity';
import { TypeOrmConfigService } from '@/shared/database/typeorm/typeorm.service';
import { Color } from '../entities/color.entity';
import { Country } from '../entities/country.entity';
import { Currency } from '../entities/currency.entity';
import { Size } from '../entities/size.entity';
import { SeedService } from './seed.service';
import { AdminSeeder } from './seeders/admin.seeder';
import { CategorySeeder } from './seeders/category.seeder';
import { ColorSeeder } from './seeders/color.seeder';
import { CountrySeeder } from './seeders/country.seeder';
import { CurrencySeeder } from './seeders/currency.seeder';
import { RolesSeeder } from './seeders/role.seeder';
import { SizeSeeder } from './seeders/size.seeder';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([
      Role,
      User,
      Category,
      Size,
      Color,
      Country,
      Currency,
    ]),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [],
  providers: [
    SeedService,
    RolesSeeder,
    AdminSeeder,
    CategorySeeder,
    SizeSeeder,
    ColorSeeder,
    CountrySeeder,
    CurrencySeeder,
  ],
})
export class SeedModule {}
