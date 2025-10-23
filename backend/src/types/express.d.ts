import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}

export {};
