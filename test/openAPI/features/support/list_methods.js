const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  responseSchema,
  listMethodsEndpoint,
  acceptHeader,
  defaultExpectedResponseTime,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specListMethods;

const baseUrl = localhost + listMethodsEndpoint;
const endpointTag = { tags: `@endpoint=/${listMethodsEndpoint}` };

Before(endpointTag, () => {
  specListMethods = spec();
});

// Scenario: Successfully retrieved the list of REST services and endpoints for a service provider
Given(
  'Wants to retrieve the list of REST services and endpoints for a service provider',
  () => 'Required route params were specified'
);

When(
  'User sends GET request with given {string} as serviceId, required path params and header',
  serviceId =>
    specListMethods
      .get(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withQueryParams({
        serviceId: serviceId,
      })
      .withPathParams({
        GovStackInstance: 'string',
        memberClass: 'string',
        memberCode: 'string',
        applicationCode: 'string',
      })
);

Then('User receives a response from the listMethods endpoint', async () => {
  await specListMethods.toss();
});

Then(
  'The listMethods endpoint response should be returned in a timely manner',
  () => {
    specListMethods
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime);
  }
);

Then('The listMethods endpoint response should have status 200', () => {
  specListMethods.response().to.have.status(200);
});

Then(
  'The listMethods endpoint response should have content-type header',
  () => {
    specListMethods
      .response()
      .should.have.header('content-type', acceptHeader.value);
  }
);

Then('The listMethods endpoint response should match json schema', () => {
  chai.expect(specListMethods._response.json).to.be.jsonSchema(responseSchema);
});

// Successfully retrieved the list of REST services and endpoints for a service provider
When(
  'User sends GET request with given {string} as serviceId, {string} as GovStackInstance {string} as memberClass {string} as memberCode {string} as applicationCode',
  (serviceId, GovStackInstance, memberClass, memberCode, applicationCode) => {
    specListMethods
      .get(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withQueryParams({
        serviceId: serviceId,
      })
      .withPathParams({
        GovStackInstance: GovStackInstance,
        memberClass: memberClass,
        memberCode: memberCode,
        applicationCode: applicationCode,
      });
  }
);

// "Then" already written above

After(endpointTag, () => {
  specListMethods.end();
});
