import { enumType, objectType } from 'nexus';

export const UserSubscription = objectType({
  name: 'UserSubscription',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.field('type', {
      type: 'SubscriptionTypeEnum',
    });
    t.nonNull.dateTime('createdAt');
    t.nonNull.dateTime('startDate');
    t.nonNull.dateTime('endDate');
    t.nonNull.field('user', {
      type: 'User',
    });
    t.nonNull.string('userId');
  },
});

export const SubscriptionTypeEnum = enumType({
  name: 'SubscriptionTypeEnum',
  members: ['TRIAL', 'MONTHLY', 'LIFETIME', 'YEARLY', 'EARLYADOPTER'],
});
