import { enumType } from 'nexus';

export const typeOfMutationType = enumType({
  name: 'typeOfMutationType',
  members: ['ADD', 'EDIT', 'DELETE'],
});
