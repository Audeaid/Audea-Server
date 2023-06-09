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
        { resend, clerkUserId, prisma },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const link = `https://kontolmemek.com/signup?email=${email}&firstName=${firstName}&lastName=${lastName}&userId=${user.id}`;

          const furqonHtml = `<p>Heyy ${firstName} ${lastName}👋🏼!</p>

          <p>My name is Furqon and I'm one of the co-founders of Audea.</p>

          <p>${user.firstName} is inviting you to try Audea KONTOL! 🎉</p>

          <a href="${link}">Try now!</a>`;

          const bontelHtml = `<p>Heyy ${firstName} ${lastName}👋🏼!</p>

          <p>My name is Rizqy and I'm one of the co-founders of Audea.</p>

          <p>${user.firstName} is inviting you to try Audea KONTOL! 🎉</p>

          <a href="${link}">Try now!</a>`;

          const randomGenerator = Math.round(Math.random()); // 0 or 1

          let sendEmailData = {} as SendEmailData;

          if (randomGenerator === 1) {
            // from furqon
            sendEmailData.from = 'Furqon @ Audea <furqon@kudoku.id>';
            sendEmailData.to = email;
            sendEmailData.subject = `${user.firstName} is inviting you to try Audea! 🍙`;
            sendEmailData.html = furqonHtml;
          } else {
            // from bontel
            sendEmailData.from = 'Rizqy from Audea <rizqy@kudoku.id>';
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
