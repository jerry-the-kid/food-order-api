import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto';
import { GeocodingService } from '../common/service/geocoding.service';

export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly repo: Repository<Account>,
    private geocodingService: GeocodingService,
  ) {}

  async createRestaurantAccount(dto: CreateRestaurantDto) {
    const [lng, lat] = await this.geocodingService.geocodeAddress(dto.address);
    const account = this.repo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      lng,
      lat,
      role: 'salesman',
    });

    return await this.repo.save(account);
  }
}
