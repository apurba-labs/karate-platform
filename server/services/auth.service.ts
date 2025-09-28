import { AuthRepository } from '@/repositories/auth.repository';
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { User, RegisterWithDojo, LoginInput  } from '@/types/auth.types'; 
import validator from 'validator';



export interface LoginResponse {
  user: Omit<User, 'password'>;
  token: string;
  expiresIn?: number;
}

function stripPassword<T extends { password?: string }>(u: T) {
  const { password, ...rest } = u as any;
  return rest as Omit<T, 'password'>;
}
export class AuthService {
    constructor(private authRepo: AuthRepository) {}
    // Fetch user either by email or ID
    async getUser(userId: number) {
        return this.authRepo.getUserById(userId);
    }
    async getUserByUsername(username: string) {
        return this.authRepo.getUserByUsername(username);
    }
    async getUserByEmail(email: string) {
        return this.authRepo.getUserByEmail(email);
    }
    // Register a new user
    async registerUser(data: RegisterWithDojo) {
      const username = String(data.username ?? '').trim();
      const password = String(data.password ?? '');
      if (!username) throw new Error('USERNAME_REQUIRED');
      if (password.length < 6) throw new Error('PASSWORD_TOO_SHORT');

      const emailNorm =typeof data.email === 'string' && data.email.trim() !== ''
      ? data.email.trim().toLowerCase()
      : null;

      const [byUsername, byEmail] = await Promise.all([
          this.authRepo.getUserByUsername(username),emailNorm ? this.authRepo.getUserByEmail(emailNorm) : Promise.resolve(null),
      ]);

      if (byUsername) throw new Error('USERNAME_TAKEN');
      if (byEmail) throw new Error('EMAIL_IN_USE');

      // Hash the password
      const hashedPassword = await hashPassword(password);

      const userData:any = {
          username,
          email: emailNorm,
          password: hashedPassword,
          firstName:data.firstName,
          lastName:data.lastName,
          dob: data.dob ? new Date(data.dob as any) : null,
          role: data.role ?? 'ATHLETE',
          phone:data.phone ?? null,
          country:data.country ?? null,
          bio:data.bio ?? null,
      };

      if (data.dojoId) {
        userData.dojos = {
          create: {
              dojoId: data.dojoId,
              role: 'STUDENT',
              since: data.since ? new Date(data.since) : new Date(),
              dateOfJoining: data.dateOfJoining ? new Date(data.dateOfJoining) : new Date(),
              isPrimary: true,
              internalBeltRank: data.internalBeltRank ?? null,
              emergencyContact: data.emergencyContact ?? null,
              notes: data.notes ?? null,
              parentId: data.parentId ?? null,
            },
        };
      }

      const user = await this.authRepo.createUser(userData);

      const token = generateToken(user.id, user.username, user.role);

      return { user, token };
  }

  async loginUser(data: LoginInput): Promise<LoginResponse> {
    try {
      const idRaw = String(data.identifier ?? data.username ?? data.email ?? '').trim();
      const pwRaw = String(data.password ?? '');

      if (!idRaw) throw new Error('IDENTIFIER_REQUIRED');
      if (!pwRaw) throw new Error('PASSWORD_REQUIRED');

      const isEmail = validator.isEmail(idRaw);
      const user = isEmail
        ? await this.getUserByEmail(idRaw.toLowerCase())
        : await this.getUserByUsername(idRaw);

      if (!user) throw new Error('INVALID_CREDENTIALS');

      const ok = await comparePassword(pwRaw, user.password);
      if (!ok) throw new Error('INVALID_CREDENTIALS');

      // Update last login
      //await this.updateLastLogin(user.id);

      const token = generateToken(user.id, user.username, user.role);
      
      return { 
        user: stripPassword(user), 
        token,
        //expiresIn: this.getTokenExpiration(process.env.JWT_EXPIRES_IN || '24h')
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async me(userId: number): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.getUser(userId);
      if (!user) throw new Error('NOT_FOUND');
      return stripPassword(user);
    } catch (error) {
      console.error('Me endpoint error:', error);
      throw error;
    }
  }
}
