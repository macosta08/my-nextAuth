/* eslint-disable no-var */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client';

declare global {
  var prismaGlobal: PrismaClient;
}

let prisma: PrismaClient;
// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
  prisma = global.prismaGlobal;
}
// eslint-disable-next-line import/no-default-export
export default prisma;
