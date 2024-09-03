import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services/users.service';
import { PayloadToken } from '../../../common';
import { config } from '../../../configs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
  ) {}

  async validateUser(username: string, password: string) {
    const user: {
      password: string;
      id: number;
      role: string;
    } = await this.usersService.findByUsername(username);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null;
  }

  async login(user: PayloadToken) {
    const { accessToken } = this.jwtToken(user);
    const refreshToken = this.jwtRefreshToken(user);
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  jwtToken(user: PayloadToken) {
    const payload: PayloadToken = { role: user.role, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  jwtRefreshToken(user: PayloadToken) {
    const payload = { role: user.role, id: user.id };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwt.jwtRefreshSecret,
      expiresIn: `${this.configService.jwt.refreshTokenExpiration}`,
    });

    return refreshToken;
  }

  async logout(user: PayloadToken) {
    return await this.usersService.removeRefreshToken(user.id);
  }

  async createAccessTokenFromRefreshToken(user: PayloadToken) {
    return this.jwtToken(user);
  }
}
