'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createBeerMockPromise, removeBeersAndAccounts } from './lib/beer-mock';

console.log(startServer, 'START SERVER');

const beerImg = `${__dirname}/asset/emuexport.jpg`;
const apiUrl = `http://localhost:${process.env.PORT}/api/beer`;

describe('TESTING ROUTES AT /api/beer', () => {
  let token;
  let account; /*eslint-disable-line*/
  let beer;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    try {
      const mockData = await createBeerMockPromise();
      token = mockData.token; /*eslint-disable-line*/
      account = mockData.account; /*eslint-disable-line*/
      beer = mockData.beer; /*eslint-disable-line*/
    } catch (err) {
      return console.log(err);
    }
    return undefined;
  });
  afterEach(async () => {
    await removeBeersAndAccounts();
  });

  describe('POST ROUTES TO /api/beer', () => {
    test('POST 200', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('title', 'Emu Export')
          .attach('beer', beerImg);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('Emu Export');
        expect(response.body._id).toBeTruthy();
        expect(response.body.url).toBeTruthy();
        expect(response.body.url).toBeTruthy();
      } catch (err) {
        console.log(err);
        expect(err).toEqual('foo');
      }
      return undefined;
    });


    test('POST 400 on bad request', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('BADFIELDNAME', 'BADFIELD')
          .attach('beer', beerImg);

        expect(response).toBe('foo');
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });

    //   test('POST 401 on bad token', async () => {
    //     try {
    //       const badToken = 'BADTOKEN';
    //       const response = await superagent.post(apiUrl)
    //         .set('Authorization', `Bearer ${badToken}`)
    //         .field('BADFIELDNAME', 'BADFIELD')
    //         .attach('beer', beerImg);

    //       expect(response).toBe('foo');
    //     } catch (err) {
    //       expect(err.status).toBe(401);
    //     }
    //   });
    // });

    describe('GET ROUTES to /api/beer', () => {
      test('200 GET /api/beer for succesful fetching of a beer', async () => {
        try {
          const response = await superagent.get(`${apiUrl}/${beer._id}`)
            .set('Authorization', `Bearer ${token}`);
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual(beer.title);
          expect(response.body.accountId).toEqual(beer.accountId.toString());
          expect(response.body.url).toEqual(beer.url);
          expect(response.body.fileName).toEqual(beer.fileName);
        } catch (err) {
      console.log(err, 'ERROR FROM beer-ROUTER-TEST: get 200 test'); /*eslint-disable-line*/
          expect(err).toEqual('FAILING IN GET 200 POST');
        }
      });

      test('404 GET due to bad id', async () => {
        try {
          const response = await superagent.get(`${apiUrl}/${'BADID'}`)
            .set('Authorization', `Bearer ${token}`);

          expect(response).toBe('foo');
        } catch (err) {
          expect(err.status).toBe(404);
        }
      });

    // test('401 GET due to bad token', async () => {
    //   try {
    //     const response = await superagent.get(`${apiUrl}/${beer._id}`)
    //       .set('Authorization', `Bearer ${'BADTOKEN'}`);
    //     expect(response).toEqual('foo');
    //   } catch (err) {
    //     expect(err.status).toBe(401);
    //   }
    // });
    });
  });
});
