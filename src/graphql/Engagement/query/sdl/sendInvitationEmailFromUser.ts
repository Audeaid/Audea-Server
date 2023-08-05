import { nonNull, stringArg, extendType } from 'nexus';
import { SendEmailData } from 'resend';

export const sendInvitationEmailFromUser = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('sendInvitationEmailFromUser', {
      type: 'ResponseMessage',

      args: {
        email: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
      },

      async resolve(
        __,
        { email, firstName, lastName },
        { resend, clerkUserId, prisma, jwtToken },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const link = `https://app.audea.id/signup?email=${email}&firstName=${firstName}&lastName=${lastName}&token=${jwtToken}`;

          const furqonHtml = `<p>Heyy ${firstName} ${lastName}👋🏼!</p>

          <p>My name is Furqon and I'm one of the co-founders of Audea.</p>

          <p>Your friend, ${user.firstName} has been using Audea to help them convert their messy thoughts to structured notes, and ${user.firstName} says you'll like it too!</p>

          <p>You can register with their referral link below:<br><a href="${link}">${link}</a></p>
          
          <img src="https://app.audea.id/og?firstName=${firstName}&lastName=${lastName}" alt="Invitation banner" width="600" height="315" >`;

          const bontelHtml = `<p>Heyy ${firstName} ${lastName}👋🏼!</p>

          <p>My name is Rizqy and I'm one of the co-founders of Audea.</p>

          <p>Your friend, ${user.firstName} has been using Audea to help them convert their messy thoughts to structured notes, and ${user.firstName} says you'll like it too!</p>

          <p>You can register with their referral link below:<br><a href="${link}">${link}</a></p>
          
          <img src="https://app.audea.id/og?firstName=${firstName}&lastName=${lastName}" alt="Invitation banner" width="600" height="315" >`;

          const randomGenerator = Math.round(Math.random()); // 0 or 1

          let sendEmailData = {} as SendEmailData;

          if (randomGenerator === 1) {
            // from furqon
            sendEmailData.from = 'Furqon @ Audea <furqon@durrrian.com>';
            sendEmailData.to = email;
            sendEmailData.subject = `${user.firstName} is inviting you to try Audea! 🍙`;
            sendEmailData.html = furqonHtml;
          } else {
            // from bontel
            sendEmailData.from = 'Rizqy from Audea <rizqy@durrrian.com>';
            sendEmailData.to = email;
            sendEmailData.subject = `${user.firstName} is inviting you to try Audea! 🍙`;
            sendEmailData.html = bontelHtml;
          }

          const response = await resend.sendEmail(sendEmailData);

          return { response: JSON.stringify(response) };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
