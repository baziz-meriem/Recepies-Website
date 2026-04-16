import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomBytes } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { resolveAssetsRoot } from '../assets-root';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const UPLOAD_SUBDIR = 'uploads';

@Controller('uploads')
export class UploadsController {
  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!/^image\/(jpeg|jpg|png|gif|webp)$/i.test(file.mimetype)) {
          cb(
            new BadRequestException(
              'Format non pris en charge (JPEG, PNG, WebP ou GIF).',
            ),
            false,
          );
          return;
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const root = resolveAssetsRoot();
          const dir = join(root, 'img', UPLOAD_SUBDIR);
          if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
          }
          cb(null, dir);
        },
        filename: (_req, file, cb) => {
          const raw = extname(file.originalname).toLowerCase().replace(/^\./, '');
          const safe = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(raw)
            ? raw === 'jpeg'
              ? 'jpg'
              : raw
            : 'jpg';
          cb(
            null,
            `${Date.now()}-${randomBytes(6).toString('hex')}.${safe}`,
          );
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File | undefined) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu.');
    }
    const path = `${UPLOAD_SUBDIR}/${file.filename}`;
    return {
      path,
      url: `/static/img/${path}`,
    };
  }
}
