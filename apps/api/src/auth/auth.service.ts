import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateur.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly users: Repository<Utilisateur>,
    private readonly jwt: JwtService,
  ) {}

  private async passwordsMatch(plain: string, stored: string): Promise<boolean> {
    if (!stored) return false;
    if (stored.startsWith('$2')) {
      return bcrypt.compare(plain, stored);
    }
    return plain === stored;
  }

  async register(dto: RegisterDto) {
    const existing = await this.users.findOne({ where: { mail: dto.mail } });
    if (existing) {
      throw new ConflictException('Compte déjà existant');
    }
    const hash = await bcrypt.hash(dto.motDePasse, 10);
    const row = this.users.create({
      nom: dto.nom,
      prenom: dto.prenom,
      mail: dto.mail,
      sexe: dto.sexe,
      dateNaissance: dto.dateNaissance,
      motDePasse: hash,
    });
    await this.users.save(row);
    return { ok: true, message: 'Inscription réussie' };
  }

  async login(mail: string, motDePasse: string) {
    const user = await this.users.findOne({ where: { mail } });
    if (!user || !(await this.passwordsMatch(motDePasse, user.motDePasse))) {
      throw new UnauthorizedException('Mot de passe ou mail incorrect');
    }
    const payload: JwtPayload = { sub: user.id, mail: user.mail };
    return {
      access_token: await this.jwt.signAsync(payload),
      user: {
        id: user.id,
        mail: user.mail,
        nom: user.nom,
        prenom: user.prenom,
      },
    };
  }
}
