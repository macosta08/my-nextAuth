import NextAuth, { NextAuthOptions } from 'next-auth';
// import EmailProvider, {
//   SendVerificationRequestParams,
// } from 'next-auth/providers/email';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/config/prisma';
// import { sendLoginEmail } from '@/utils/sendEmail';

const options: NextAuthOptions = {
  callbacks: {
    async signIn({ user }) {
      console.log('user :>> ', user);
      return user?.enabled ?? false;
    },

    async session({ session }) {
      console.log('session :>> ', session);
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
          role: {
            select: {
              id: true,
              name: true,
            },
          },
          sessions: {
            take: 1,
            orderBy: {
              expires: 'desc',
            },
            select: {
              sessionToken: true,
            },
          },
          id: true,
          email: true,
          name: true,
          enabled: true,
        },
      });

      if (user) {
        session.user = user;

        if (user.session && user.session.length > 0) {
          session.sessionToken = user?.session[0].sessionToken;
        }
      }
      return session;
    },
  },
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: 465,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //     from: process.env.EMAIL_FROM,
    //   },
    //   from: process.env.EMAIL_FROM,
    //   sendVerificationRequest: sendLoginEmail as
    //     | ((params: SendVerificationRequestParams) => Awaitable<void>)
    //     | undefined,
    // }),
    Auth0Provider({
      wellKnown: `https://${process.env.AUTH0_DOMAIN}/`,
      issuer: process.env.AUTH0_DOMAIN,
      authorization: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`,
      clientId: `${process.env.AUTH0_CLIENT_ID}`,
      clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
    }),
  ],
  secret: process.env.AUTH0_CLIENT_SECRET,
  adapter: PrismaAdapter(prisma),
};

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default handler;
