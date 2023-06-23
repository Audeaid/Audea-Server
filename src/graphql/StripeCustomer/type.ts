import { objectType } from 'nexus';

export const StripeCustomer = objectType({
  name: 'StripeCustomer',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.nonNull.string('name');
    t.nonNull.string('stripeCustomerId');
    t.nonNull.string('clerkUserId');
    t.nonNull.string('userId');
  },
});

export const StripePaidObject = objectType({
  name: 'StripePaidObject',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('sessionId');
    t.nonNull.string('stripeCustomerDbId');
    t.nonNull.string('clerkUserId');
    t.nonNull.boolean('redeem');
  },
});
