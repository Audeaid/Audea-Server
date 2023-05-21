import { PrismaClient } from '@prisma/client';
import { decodeAuthHeader } from './utils/auth';
import { Request, Response } from 'express';
import twilio from 'twilio';
import { PubSub } from 'graphql-subscriptions';
import { Client } from '@notionhq/client';
import { Resend } from 'resend';
import AWS from 'aws-sdk';
import { Configuration, OpenAIApi } from 'openai';

const pubsub = new PubSub();

const prisma = new PrismaClient();

const twilioClient = twilio(
  process.env.TWILIO_ACCCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const notionInternal = new Client({
  auth: process.env.NOTION_API_KEY_AUDEA_INTERNAL as string,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET as string,
});

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_SECRET as string,
  })
);

export interface Context {
  prisma: PrismaClient;
  userId: string | null;
  twilioClient: twilio.Twilio;
  pubsub: PubSub;
  notionInternal: Client;
  resend: Resend;
  s3: AWS.S3;
  openai: OpenAIApi;
}

export const context = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token ? token.userId : null,
    twilioClient,
    pubsub,
    notionInternal,
    resend,
    s3,
    openai,
  };
};
