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
