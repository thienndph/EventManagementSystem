import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'], 
    });
  }


async validate(
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: VerifyCallback,
): Promise<any> {
  // console.log('profile->>', profile);

  const { name, emails, id } = profile;
  const user: {
    id: number;
    email: string; 
    name: string;
    idGoogle: string;
    age: number | null;
    gender: string | null;
    dateOfBirth: Date | null;
    address: string | null;
    phoneNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
  } = {
    id: parseInt(id) || 0,
    email: emails[0]?.value || '',
    name: `${name.givenName} ${name.familyName}`,
    age: null,
    gender: null,
    dateOfBirth: null,
    address: null,
    phoneNumber: null,
    idGoogle: id, 
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const validatedUser = await this.authService.validateUser(user);
  done(null, validatedUser);
  }
}