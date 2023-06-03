import { extendType, nonNull, stringArg } from 'nexus';

export const getEmailOtp = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getEmailOtp', {
      type: 'ResponseMessage',

      args: {
        email: nonNull(stringArg()),
      },

      async resolve(__, { email }, { twilioClient }, ___) {
        try {
          const response = await twilioClient.verify.v2
            .services(process.env.TWILIO_SERVICE_SID as string)
            .verifications.create({
              to: email,
              channel: 'email',
              locale: 'en',
            });

          return { response: JSON.stringify(response) };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
