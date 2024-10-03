/* eslint-disable import/no-named-as-default */
import mongoDBCore from 'mongodb/lib/core';
import sha1 from 'sha1';
import dbClient from './db';
import redisClient from './redis';

const getUserFromAuthorization = async (req) => {
  const authHeader = req.headers.authorization || '';
  const base64Credentials = authHeader.split(' ')[1] || '';
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  if (!email || !password) {
    return null;
  }

  const user = await dbClient.db.collection('users').findOne({
    email,
    password: sha1(password),
  });

  return user || null;
};

const getUserFromXToken = async (req) => {
  const token = req.headers['x-token'];

  if (!token) {
    return null;
  }

  const userId = await redisClient.get(`auth_${token}`);
  if (!userId) {
    return null;
  }

  const user = await dbClient.db.collection('users').findOne({
    _id: new mongoDBCore.BSON.ObjectId(userId),
  });

  return user || null;
};

export {
  getUserFromAuthorization,
  getUserFromXToken,
};
