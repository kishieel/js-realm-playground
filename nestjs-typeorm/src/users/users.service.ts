import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return await this.usersRepository.findOneByOrFail({ id });
    }

    async findMany(ids: number[]): Promise<User[]> {
        return await this.usersRepository.findBy({ id: In(ids) });
    }

    async create(dto: CreateUserDto) {
        const user = this.usersRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            isActive: dto.isActive,
        });
        return await this.usersRepository.save(user);
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.findOne(id);
        return await this.usersRepository.save({
            ...user,
            firstName: dto.firstName ?? user.firstName,
            lastName: dto.lastName ?? user.lastName,
            isActive: dto.isActive ?? user.isActive,
        });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
