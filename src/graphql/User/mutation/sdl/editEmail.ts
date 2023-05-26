import { extendType, nonNull } from 'nexus';
import { stringArg } from 'nexus';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { APP_SECRET, OTP_SECRET } from '../../../../utils/constant';
import { OtpTokenPayload } from '../../../../utils/auth';

export const editEmail = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('editEmail', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        jwtToken: nonNull(stringArg()),
      },

      async resolve(
        __,
        { email: emailArg, jwtToken },
        { prisma, notionInternal, userId },
        ___
      ) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const { email } = jwt.verify(
            jwtToken,
            OTP_SECRET
          ) as unknown as OtpTokenPayload;

          if (emailArg !== email)
            throw new Error('Email mismatch from JWT Token.');

          const response = await prisma.user.update({
            where: { id: user.id },
            data: { email },
          });

          const pageId = user.notionPageId;

          if (!pageId) throw new Error('notionPageId is null');

          await notionInternal.pages.update({
            page_id: pageId,
            properties: {
              Email: {
                email: email,
              },
            },
          });

          return { ...response };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});
