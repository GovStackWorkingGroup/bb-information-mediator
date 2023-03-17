const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
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
  specAllowedMethods = spec().inspect();
});

// Scenario: Successfully retrieved the list of allowed REST services and endpoints for a service provider smoke type test
Given(
  'Wants to retrieve the list of allowed REST services and endpoints for a service provider',
  () => 'Required route params were specified'
);

When(
  'The GET request with given {string} as serviceId, {string} as GovStackInstance, {string} as memberClass, {string} as memberCode and {string} as applicationCode is sent',
  (serviceId, GovStackInstance, memberClass, memberCode, applicationCode) =>
    specAllowedMethods
      .get(baseUrl)
      .withPathParams({
        GovStackInstance: GovStackInstance,
        memberClass: memberClass,
        memberCode: memberCode,
        applicationCode: applicationCode,
      })
      .withQueryParams('serviceId', serviceId)
);

Then(
  'User receives a response from the allowedMethods endpoint',
  async () => await specAllowedMethods.toss()
);

Then(
  'The allowedMethods endpoint response should be returned in a timely manner',
  () => {
    specAllowedMethods
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime);
  }
);

Then('The allowedMethods endpoint response should have status 200', () => {
  specAllowedMethods.response().to.have.status(200);
});

Then(
  'The allowedMethods endpoint response should have content-type: application\\/json header',
  () =>
    specAllowedMethods
      .response()
      .should.have.header(acceptHeader.key, acceptHeader.value)
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
