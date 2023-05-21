import { extendType, nonNull, stringArg } from 'nexus';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { APP_SECRET } from '../../../../utils/constant';

export const loginWithPassword = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('loginWithPassword', {
      type: 'AuthPayLoad',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },

      async resolve(__, { email, password: passwordArg }, { prisma }, ___) {
        try {
          const user = await prisma.user.findFirstOrThrow({
            where: { email },
          });

          if (user.password === null) throw new Error('Password is null');

          const valid = await bcrypt.compare(passwordArg, user.password);

          if (!valid) throw new Error('Wrong password');

          const token = jwt.sign({ userId: user.id }, APP_SECRET);

          return { token };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
