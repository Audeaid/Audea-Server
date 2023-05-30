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
