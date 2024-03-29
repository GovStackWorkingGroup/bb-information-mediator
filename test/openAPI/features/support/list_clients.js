const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  listClientsEndpoint,
  defaultExpectedResponseTime,
  responseSchema,
  acceptHeader,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specListClients;

const baseUrl = localhost + listClientsEndpoint;
const endpointTag = { tags: `@endpoint=/${listClientsEndpoint}` };

Before(endpointTag, () => {
  specListClients = spec();
});

// Scenario: Successfully retrieved the list of Clients of GovStack smoke type test
Given(
  'User wants to retrieve the the list of Clients of GovStack',
  () => 'User wants to retrieve the the list of Clients of GovStack'
);

When(
  'User sends GET request with given {string} as serviceId, {string} as instanceId',
  (serviceId, instanceId) =>
    specListClients.get(baseUrl).withQueryParams({
      serviceId: serviceId,
      instanceId: instanceId,
    })
);

Then(
  'User receives a response from the listClients endpoint',
  async () => await specListClients.toss()
);

Then(
  'The listClients endpoint response should be returned in a timely manner',
  () =>
    specListClients
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then('The listClients endpoint response should have status 200', () =>
  specListClients.response().to.have.status(200)
);

Then(
  'The listClients response should have {string}: {string} header',
  (key, value) =>
    specListClients
      .response()
      .should.have.headerContains(key, value)
);

Then('The listClients endpoint response should match json schema', () =>
  chai.expect(specListClients._response.json).to.be.jsonSchema(responseSchema)
);

// Scenario Outline: Successfully retrieved the list of clients from GovStack

// "When" and "Then" already written above

After(endpointTag, () => {
  specListClients.end();
});
