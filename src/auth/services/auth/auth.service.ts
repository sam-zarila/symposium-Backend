// src/auth/services/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Entities/UserEntity';
import { Organization } from 'src/Entities/OrganisationEntity';
import { RegisterDto } from 'src/DTOs/register';
;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Organization) private orgRepository: Repository<Organization>,
    private jwtService: JwtService,
  ) {}

  // Registration logic
  async register(data: RegisterDto) {
    const { name, email, password, orgName } = data;

    // Check if the organization exists
    const orgExists = await this.orgRepository.findOne({ where: { name: orgName } });
    if (orgExists) {
      throw new Error('Organization already exists.');
    }

    // Create the organization if it doesn't exist
    const organization = this.orgRepository.create({ name: orgName });
    await this.orgRepository.save(organization);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      organization,
    });

    await this.userRepository.save(user);

    return { message: 'Registration successful.' };
  }

  // Login logic
  async login(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['organization'],  // Include organization details
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = {
      id: user.id,
      email: user.email,
      orgId: user.organization.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      message: 'Login successful.',
    };
  }
}
