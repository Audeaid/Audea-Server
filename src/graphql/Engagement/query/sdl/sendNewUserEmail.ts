import { nonNull, stringArg, extendType } from 'nexus';

export const sendNewUserEmail = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('sendNewUserEmail', {
      type: 'ResponseMessage',
      args: {
        email: nonNull(stringArg()),
      },

      async resolve(__, { email }, { resend }, ___) {
        try {
          const response = await resend.sendEmail({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'hello world',
            html: '<strong>it works!</strong>',
          });

          return { response: JSON.stringify(response) };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
