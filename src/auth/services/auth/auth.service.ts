import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Entities/UserEntity';
import { Organization } from 'src/Entities/OrganisationEntity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
    private jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string; orgName: string }) {
    const { name, email, password, orgName } = data;

    // Check if organization exists
    const orgExists = await this.orgRepository.findOne({ where: { name: orgName } });
    if (orgExists) {
      throw new Error('Organization already exists.');
    }

    // Create organization
    const organization = this.orgRepository.create({ name: orgName });
    await this.orgRepository.save(organization);

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      organization,
    });

    await this.userRepository.save(user);

    return { message: 'Registration successful.' };
  }

  async login(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['organization'],
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
