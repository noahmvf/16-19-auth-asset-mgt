import 'babel-polyfill';
import faker from 'faker';
import { createAccountMockPromise, removeAccountMockPromise } from './account-mock'; /*eslint-disable-line*/
import Beer from '../../model/beer';
import Account from '../../model/account';

const createBeerMockPromise = async () => {
  const mockData = {};
  
  const mockAcctResponse = await createAccountMockPromise();
 
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;
  const beer = await new Beer({
    title: faker.lorem.words(2),
    url: faker.random.image(),
    fileName: faker.system.fileName(),
    accountId: mockData.account._id,
  }).save();
  
  mockData.beer = beer;
  return mockData;
};

const removeBeersAndAccounts = () => {
  return Promise.all([
    Beer.remove({}),
    Account.remove({}),
  ]);
};


export { createBeerMockPromise, removeBeersAndAccounts };
