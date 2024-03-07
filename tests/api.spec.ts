import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://growthbook-api.scentbird.com/',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  });
})

test.afterAll(async () => {
  await apiContext.dispose();
});

test('check status code for growthbook api', async () => {
  const response = await apiContext.get('/');
  expect(response.ok()).toBeTruthy();
});

test('assert body item in growthbook api response', async () => {
    const response = await apiContext.get('/');
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.name).toBe('GrowthBook API');
});

test('assert header in growthbook api response', async () => {
    const response = await apiContext.get('/api/features/sdk-KGr6Xvp98rFYGM1N');
    const responseHeaders = await response.headers();
    expect(responseHeaders['x-powered-by']).toContain("Express");
});

test('401 on post request', async () => {
    const response = await apiContext.post('/api/features/sdk-KGr6Xvp98rFYGM1N', {
    data: {
            text: 'heyguys', 
        },
    });
    expect(response.status()).toBe(401);
});