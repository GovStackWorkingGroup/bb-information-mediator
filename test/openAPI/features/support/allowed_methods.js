const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  header,
  localhost,
  responseSchema,
  allowedMethodsEndpoint,
  acceptHeader,
  defaultExpectedResponseTime,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specAllowedMethods;

const baseUrl = localhost + allowedMethodsEndpoint;
const endpointTag = { tags: `@endpoint=/${allowedMethodsEndpoint}` };

Before(endpointTag, () => {
  specAllowedMethods = spec();
});

// Scenario: Successfully retrieved the list of allowed REST services and endpoints for a service provider smoke type test
Given(
  'Wants to retrieve the list of allowed REST services and endpoints for a service provider',
  () => 'Required route params were specified'
);

When('I send a GET request with:', function (dataTable) {
  const headers = dataTable.rowsHash();
  if (headers.Header) delete headers.Header;
  
  specAllowedMethods.get(baseUrl);
  for (const key in headers) {
    specAllowedMethods.withHeaders(key, headers[key]);
  }
});

When('The payload contains:', function (dataTable) {
  const payload = dataTable.rowsHash();
  if (payload.Parameter) delete payload.Parameter;

  const serviceId = payload.serviceId;
  delete payload.serviceId;
  specAllowedMethods
      .withPathParams(payload)
      .withQueryParams(serviceId, serviceId);
});

Then(
  'User receives a response from the allowedMethods endpoint',
  async () => await specAllowedMethods.toss()
);

Then(
  'The allowedMethods endpoint response should be returned in a timely manner',
  () =>
    specAllowedMethods
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then('The allowedMethods endpoint response should have status 200', () =>
  specAllowedMethods.response().to.have.status(200)
);

Then(
  'The allowedMethods response should have {string}: {string} header',
  (key, value) =>
    specAllowedMethods
      .response()
      .should.have.headerContains(key, value)
);

Then('The allowedMethods endpoint response should match json schema', () =>
  chai
    .expect(specAllowedMethods._response.json)
    .to.be.jsonSchema(responseSchema)
);

// Scenario Outline: Successfully retrieved the list of allowed REST services and endpoints for a service provider
// Given, When, Then are written in the aforemention example

After(endpointTag, () => {
  specAllowedMethods.end();
});
