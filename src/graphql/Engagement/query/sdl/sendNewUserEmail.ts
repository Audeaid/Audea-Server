import { nonNull, stringArg, extendType } from 'nexus';
import { SendEmailData } from 'resend';

export const sendNewUserEmail = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('sendNewUserEmail', {
      type: 'ResponseMessage',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },

      async resolve(__, { email, name }, { resend }, ___) {
        try {
          const slackLink =
            'https://join.slack.com/t/audeance/shared_invite/zt-1vn35z04j-OU8FpGdh45LrxgM3r0jESA';

          const furqonHtml = `<p>Heyy ${name}👋🏼!</p>

          <p>Thank you for joining Audea, and welcome aboard! 🎉</p>
          
          <p>I'm Furqon, one of the founders of Audea, and I wanted to personally reach out and express my gratitude for becoming a part of our community. As we embark on this exciting journey together, I wanted to let you know that Audea is still in its early days, but we have big plans ahead!</p>
          
          <p>We truly value your input and want to build this product hand in hand with you, our amazing users. That's why I invite you to join our Slack channel, <a href="${slackLink}">Audeance</a>, where you can collaborate with us in shaping the future of Audea.</p>
          
          <p>Oh, and here's a little secret: I make it a point to read every single email that comes my way, so please feel free to reach out to me about anything at all! Your feedback and ideas are crucial to our growth and success.</p>
          
          
          <p>Furqon,<br>Co-founder Audea</p>`;

          const bontelHtml = `<p>Hey, ${name}<br>Massive thanks for signing up for Audea 🤩</p>
          
          <p>Since you signed up early, you're categorized as <strong>early adopter</strong> 🥳.<br>Because you're an early adopter, you can use Audea for free. And we hope you can join our Slack community and help us shape Audea for better.</p>
          
          <p>Click this link to join <strong>Audea early adopter community</strong><br><a href="${slackLink}">${slackLink}</a></p>
          
          <p>Anyway, just want to give a quick tour about Audea.<br>Audea is a note generator that rewrite your voice notes and extract the most important part from it.</p>     
          
          <p>You can say any ideas, thoughts, even random theories, and Audea will give a structured note from your voice.</p>
          
          <p>Once again, thanks for signing up!<br>Need to talk? Shoot me back an email or see you in Slack community ~</p>
          
          <p>See you around 🥂<br>Rizqy</p>`;

          const randomGenerator = Math.round(Math.random()); // 0 or 1

          let sendEmailData = {} as SendEmailData;

          if (randomGenerator === 1) {
            // from furqon
            sendEmailData.from = 'Furqon @ Audea <furqon@kudoku.id>';
            sendEmailData.to = email;
            sendEmailData.subject = 'Welcome to Audea! 🌟';
            sendEmailData.html = furqonHtml;
          } else {
            // from bontel
            sendEmailData.from = 'Rizqy from Audea <rizqy@kudoku.id>';
            sendEmailData.to = email;
            sendEmailData.subject = 'Welcome to Audea! 🌟';
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
