const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost, responseSchema } = require('./helpers/helpers');

let specListClients;

const baseUrl = `${localhost}listClients`;

Before(() => {
  specListClients = spec().expectResponseTime(15000);
});

// Scenario: Successfully retrieved the list of Clients of GovStack
Given(
  'Wants to retrieve the the list of Clients of GovStack',
  () => 'No route parameters were specified'
);

When('The request to retrieve the list of Clients of GovStack is sent', () =>
  specListClients.get(baseUrl)
);

Then('The operation returns the list of Clients of GovStack', async () => {
  specListClients.expectStatus(200).expectJsonSchema(responseSchema);
  await specListClients.toss();
});

// Scenario: Successfully retrieved the list of clients from GovStack with optional parameters in the request
Given(
  'Wants to retrieve the list of clients from GovStack with optional parameters specified',
  () => 'Optional parameters for the route were specified'
);

When(
  'The request with optional parameters to retrieve the list of Clients of GovStack is sent',
  () =>
    specListClients
      .get(baseUrl)
      .withHeaders('X-GovStack-Client', 'string')
      .withPathParams({
        serviceId: 'string',
        instanceId: 'string',
      })
);

// "Then" already written in line 83-86

After(() => {
  specListClients.end();
});
