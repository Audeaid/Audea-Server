import { extendType } from 'nexus';
import { nonNull, stringArg } from 'nexus';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { APP_SECRET, OTP_SECRET } from '../../../../utils/constant';
import { OtpTokenPayload } from '../../../../utils/auth';

export const changePassword = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('changePassword', {
      type: 'AuthPayLoad',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        jwtToken: nonNull(stringArg()),
      },

      async resolve(
        __,
        { email: emailArg, password: passwordArg, jwtToken },
        { prisma },
        ___
      ) {
        try {
          const { email } = jwt.verify(
            jwtToken,
            OTP_SECRET
          ) as unknown as OtpTokenPayload;

          if (emailArg !== email)
            throw new Error('Email mismatch from JWT Token.');

          const searchUser = await prisma.user.findFirstOrThrow({
            where: { email: emailArg },
          });

          const password = await bcrypt.hash(passwordArg, 10);

          const user = await prisma.user.update({
            where: { id: searchUser.id },
            data: { password },
          });

          const token = jwt.sign({ userId: user.id }, APP_SECRET);

          return { token };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});
