// import { nonNull, stringArg, extendType } from 'nexus';

// export const test = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.field('test', {
//       type: 'ResponseMessage',

//       async resolve(__, ____, { notionInternal, prisma }, ___) {
//         try {
//           const user = await prisma.user.findMany({
//             where: {
//               NOT: [
//                 { email: 'fdwilogo@gmail.com' },
//                 { email: 'rizqyfachri@gmail.com' },
//                 { email: 'aldimegantaraa@gmail.com' },
//               ],
//             },
//           });

//           for (let i = 0; i < user.length; i++) {
//             const element = user[i];

//             const pageId = element.notionPageId;
//             await notionInternal.pages.update({
//               page_id: pageId ?? '',
//               properties: {
//                 Subscription: {
//                   select: {
//                     name: 'NO',
//                   },
//                 },
//               },
//             });
//           }

//           return { response: 'success' };
//         } catch (error) {
//           throw error;
//         }
//       },
//     });
//   },
// });

// import { nonNull, stringArg, extendType } from 'nexus';

// export const test = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.field('test', {
//       type: 'ResponseMessage',
//       async resolve(__, ____, { s3, prisma }, ___) {
//         try {
//           const content = await prisma.content.findMany();

//           const response = await s3
//             .listObjectsV2({ Bucket: 'audea-voice-note' })
//             .promise();

//           const filteredContent = content.filter(
//             ({ voiceNoteUrl }) => voiceNoteUrl !== null
//           );

//           const onlyUrl = filteredContent.map((val) => {
//             if (val.voiceNoteUrl) {
//               const url = val.voiceNoteUrl.split('/').pop();
//               if (url) {
//                 return url;
//               }
//             }
//           });

//           if (response.Contents) {
//             const allObjects = response.Contents.filter(
//               ({ Key }) => Key !== 'audea-logo-primary.png'
//             );

//             allObjects.forEach(({ Key }) => {
//               if (!onlyUrl.includes(Key)) {
//                 console.log(`${Key} does not have content`);
//               }
//             });
//           }

//           console.log('code already run');

//           return { response: 'success' };
//         } catch (error) {
//           throw error;
//         }
//       },
//     });
//   },
// });

// import { nonNull, stringArg, extendType } from 'nexus';

// export const test = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.field('test', {
//       type: 'ResponseMessage',
//       async resolve(__, ____, { s3, prisma }, ___) {
//         try {
//           const content = await prisma.content.findMany();

//           const response = await s3
//             .listObjectsV2({ Bucket: 'audea-voice-note' })
//             .promise();

//           const filteredContent = content.filter(
//             ({ voiceNoteUrl }) => voiceNoteUrl !== null
//           );

//           const onlyUrl = filteredContent.map((val) => {
//             if (val.voiceNoteUrl) {
//               const url = val.voiceNoteUrl.split('/').pop();
//               if (url) {
//                 return url;
//               }
//             }
//           });

//           if (response.Contents) {
//             const allObjects = response.Contents.filter(
//               ({ Key }) => Key !== 'audea-logo-primary.png'
//             );

//             allObjects.forEach(async ({ Key }) => {
//               if (Key) {
//                 if (!onlyUrl.includes(Key)) {
//                   console.log(`${Key} does not have content. Deleting...`);
//                   try {
//                     await s3
//                       .deleteObject({ Bucket: 'audea-voice-note', Key })
//                       .promise();
//                     console.log(`${Key} deleted successfully.`);
//                   } catch (error) {
//                     console.error(`Failed to delete ${Key}:`, error);
//                   }
//                 }
//               }
//             });
//           }

//           return { response: 'success' };
//         } catch (error) {
//           throw error;
//         }
//       },
//     });
//   },
// });

// import { nonNull, stringArg, extendType } from 'nexus';

// export const test = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.field('test', {
//       type: 'ResponseMessage',
//       async resolve(__, ____, { s3, prisma }, ___) {
//         try {
//           const content = await prisma.content.findMany();

//           const response = await s3
//             .listObjectsV2({ Bucket: 'audea-voice-note' })
//             .promise();

//           const filteredContent = content.filter(
//             ({ voiceNoteUrl }) => voiceNoteUrl !== null
//           );

//           const onlyUrl = filteredContent.map((val) => {
//             if (val.voiceNoteUrl) {
//               const url = val.voiceNoteUrl.split('/').pop();
//               if (url) {
//                 return url;
//               }
//             }
//           });

//           if (response.Contents) {
//             const allObjects = response.Contents.filter(
//               ({ Key }) => Key !== 'audea-logo-primary.png'
//             );

//             allObjects.forEach(({ Key }) => {
//               if (!onlyUrl.includes(Key)) {
//                 console.log(`${Key} does not have content`);
//               }
//             });
//           }

//           console.log('code already run');

//           return { response: 'success' };
//         } catch (error) {
//           throw error;
//         }
//       },
//     });
//   },
// });

import { nonNull, stringArg, extendType } from 'nexus';
import jwt from 'jsonwebtoken';
import { clerkGetVerified } from '../../../../utils/auth';

// export const test = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.field('test', {
//       type: 'ResponseMessage',
//       async resolve(__, ____, { s3, prisma, clerk }, ___) {
//         try {
//           //   const userList = await clerk.users.getUserList();

//           //   const sessionList = await clerk.sessions.getSessionList();

//           //   const verifyToken = await clerk.verifyToken(
//           //     'eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yUVhFR2FvT0Z1Umd0bjN5Unl3d0xSbjc5N3UiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3JhcmUtbW9yYXktNTkuYWNjb3VudHMuZGV2IiwiZXhwIjoxNjg1NTE3MzY0LCJpYXQiOjE2ODU1MTczMDQsImlzcyI6Imh0dHBzOi8vcmFyZS1tb3JheS01OS5jbGVyay5hY2NvdW50cy5kZXYiLCJuYmYiOjE2ODU1MTcyOTQsInNpZCI6InNlc3NfMlFZNGhmVE9DY25HcndTRlZqanRiaFFRSk9qIiwic3ViIjoidXNlcl8yUVkydTBVNEFTUkVhQm40Q0EzM0s5UjUyZTgifQ.gGvB6UWqps5dgS3n4Qrgm7m5U9XC1y5miJrL_G4tMcvQpc5F3Z_0fFI69nwCAzDGSiSCwtt9jEsnxDUuprcoc4Q7x1KT2niDg7E0YJdBgZ8vFV8E4i17em8Hd4euOoJMrhfeodeu_zFJSV6l52YXMv3nvZLlTulPK3ZoKVSgmMKODHS5zpiqZ8pWtsuS8XgkmgtxCVJOikPe2phhBRCA8FrsNI5i_kbjArK7SHVIaQJI5MUtkD1M5D80AoOuHyF0XKSA9ncNPSmGPyPcL2K2JXnJ3iee8uA_cLXhE0VLrWcu7N5hFRZFTkjQUUVEiXUSEwuk5Iw4QdV4XJmaMUwVgg'
//           //   );
//           //   //   clerk.sessions.verifySession()

//           const splitPem = process.env.CLERK_PEM_PUBLIC?.match(/.{1,64}/g);
//           const publicKey =
//             '-----BEGIN PUBLIC KEY-----\n' +
//             splitPem?.join('\n') +
//             '\n-----END PUBLIC KEY-----';

//           const jwtToken =
//             'eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yUVhFR2FvT0Z1Umd0bjN5Unl3d0xSbjc5N3UiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3JhcmUtbW9yYXktNTkuYWNjb3VudHMuZGV2IiwiZXhwIjoxNjg1NTE4NTMxLCJpYXQiOjE2ODU1MTg0NzEsImlzcyI6Imh0dHBzOi8vcmFyZS1tb3JheS01OS5jbGVyay5hY2NvdW50cy5kZXYiLCJuYmYiOjE2ODU1MTg0NjEsInNpZCI6InNlc3NfMlFZNzRKeDZqclRaOXY3UlNIQVJKV0xZRlNPIiwic3ViIjoidXNlcl8yUVkydTBVNEFTUkVhQm40Q0EzM0s5UjUyZTgifQ.d6zozh-eE5aHN1kJPAFIV6Ah7YFeLw7jLfQ6zIa7353KN5HHpH2QtqhegTKUGi8m_iESOqKZncBUnRylft6YCHI5l1INwdj21xUxnw7KyVqOxeLxd7VMdfDfk_NoCIQFzsOpNe_kfkMoGuC0LGN8PGpTVTQdg2DjgbSPEhy3z-JYD_IZDff9VCqgvYImIj_SWhwsSUl9VSO1tPOGEpaNb-WH0YkSZVBaSotHJ6itG05ShyBeN4dMD-Rph94ylpZb3E4GTr4KMbkS6i0ZpWpsFRXF8UhhEGfhvT8E8clBoeaRwYZKjfOLXBxx26jqGJotXghfr5wLnwkgp8JOsBjMPQ';

//           //   const decoded: any = jwt.verify(jwtToken, publicKey);

//           /**
//            * {
//   azp: 'https://rare-moray-59.accounts.dev',
//   exp: 1685518106,
//   iat: 1685518046,
//   iss: 'https://rare-moray-59.clerk.accounts.dev',
//   nbf: 1685518036,
//   sid: 'sess_2QY6D4fRZkD2XeonmbuQ8wovDkN',
//   sub: 'user_2QY2u0U4ASREaBn4CA33K9R52e8'
// }
//            */

//           //   const sessionId = decoded.sid;

//           //   const sessionId = 'sess_2QY6D4fRZkD2XeonmbuQ8wovDkN';

//           //   const verifySession = await clerk.sessions.verifySession(
//           //     sessionId,
//           //     jwtToken
//           //   );

//           /**
//            * {
//   id: 'sess_2QY74Jx6jrTZ9v7RSHARJWLYFSO',
//   clientId: 'client_2QY73OEvxRy7Mx3Xxo5s9Tjt1aD',
//   userId: 'user_2QY2u0U4ASREaBn4CA33K9R52e8',
//   status: 'active',
//   lastActiveAt: 1685518468260,
//   expireAt: 1686123268260,
//   abandonAt: 1688110468260,
//   createdAt: 1685518468260,
//   updatedAt: 1685518468270
// }
//            */

//           //   const sessionList = await clerk.sessions.getSessionList();

//           const client = await clerk.sessions.getSession(
//             'sess_2QY74Jx6jrTZ9v7RSHARJWLYFSO'
//           );

//           //   const client1 = await clerk.clients.verifyClient(jwtToken);

//           console.log(client);

//           return { response: 'success' };
//         } catch (error) {
//           throw error;
//         }
//       },
//     });
//   },
// });

// interface IVerifyJWT {
//   azp: string;
//   exp: number;
//   iat: number;
//   iss: string;
//   nbf: number;
//   sid: string;
//   sub: string;
// }

// export const test = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.field('test', {
//       type: 'ResponseMessage',

//       args: {
//         jwtToken: nonNull(stringArg()),
//       },

//       async resolve(__, { jwtToken }, { clerk }, ___) {
//         try {
//           const splitPem = process.env.CLERK_PEM_PUBLIC?.match(/.{1,64}/g);
//           const publicKey =
//             '-----BEGIN PUBLIC KEY-----\n' +
//             splitPem?.join('\n') +
//             '\n-----END PUBLIC KEY-----';

//           const decoded = jwt.verify(jwtToken, publicKey) as IVerifyJWT;

//           const sessionId = decoded.sid;

//           console.log('sessionId from decoded', sessionId);

//           const verifySession = await clerk.sessions.verifySession(
//             sessionId,
//             jwtToken
//           );

//           const session = await clerk.sessions.getSession(sessionId);
//           session.status

//           console.log('using verifySession', verifySession);

//           //   const verifyClient = await clerk.clients.verifyClient(jwtToken);

//           //   console.log('using verifyClient', verifyClient);

//           return { response: 'success' };
//         } catch (error) {
//           throw error;
//         }
//       },
//     });
//   },
// });

export const test = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('test', {
      type: 'ResponseMessage',

      async resolve(__, ____, { sessionId, clerk }, ___) {
        // const sessionList = await clerk.sessions.getSessionList();
        // console.log(sessionList);

        if (!sessionId) throw new Error('Missing auth');

        const isVerified = await clerkGetVerified(sessionId, clerk);

        const session = await clerk.sessions.getSession(sessionId);

        console.log(session);
        try {
          return { response: isVerified.toString() };
          // return { response: 'titit' };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
