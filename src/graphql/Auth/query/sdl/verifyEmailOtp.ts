import { extendType, nonNull, stringArg } from 'nexus';
import * as jwt from 'jsonwebtoken';
import { OTP_SECRET } from '../../../../utils/constant';

export const verifyEmailOtp = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('verifyEmailOtp', {
      type: 'AuthPayLoad',

      args: {
        email: nonNull(stringArg()),
        otp: nonNull(stringArg()), // String since OTP can start with the number 0
      },

      async resolve(__, { email, otp }, { twilioClient }, ___) {
        try {
          const response = await twilioClient.verify.v2
            .services(process.env.TWILIO_SERVICE_SID as string)
            .verificationChecks.create({ to: email, code: otp });

          if (!response.valid) throw new Error('Wrong OTP!');

          const token = jwt.sign({ email }, OTP_SECRET, {
            expiresIn: '30m',
          });

          return { token };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
