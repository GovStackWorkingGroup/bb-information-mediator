const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost, responseSchema } = require('./helpers/helpers');

let specListMethods;

const baseUrl = `${localhost}{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/listMethods`;

Before(() => {
  specListMethods = spec().expectResponseTime(15000);
});

// Scenario: Successfully retrieved the list of REST services and endpoints for a service provider
Given(
  'Wants to retrieve the list of REST services and endpoints for a service provider',
  () => 'Required route params were specified'
);

When(
  'The request to retrieve the list of REST services and endpoints for a service provider is sent',
  () =>
    specListMethods.get(baseUrl).withPathParams({
      GovStackInstance: 'string',
      memberClass: 'string',
      memberCode: 'string',
      applicationCode: 'string',
    })
);

Then(
  'The operation returns the list of REST services and endpoints for a service provider',
  async () => {
    await specListMethods.toss();
    specListMethods.expectStatus(200).expectJsonSchema(responseSchema);
  }
);

After(() => {
  specListMethods.end();
});
