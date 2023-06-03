import clerk from '@clerk/clerk-sdk-node';

export const CLERK_PEM = process.env.CLERK_PEM_PUBLIC as string;

export const clerkGetVerified = async (
  sessionId: string,
  clerkClient: typeof clerk
): Promise<boolean> => {
  try {
    const session = await clerkClient.sessions.getSession(sessionId);

    const isVerified = session.status === 'active' ? true : false;

    return isVerified;
  } catch (error) {
    throw error;
  }
};
