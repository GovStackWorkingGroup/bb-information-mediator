const chai = require('chai');
const { spec } = require('pactum');
const { Before, Given, When, Then, After } = require('@cucumber/cucumber');
const {
  localhost,
  getOpenApiEndpoint,
  defaultExpectedResponseTime,
  getOpenApiExpectedSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specGetOpenAPI;
const baseUrl = localhost + getOpenApiEndpoint;
const tag = { tags: `@endpoint=/${getOpenApiEndpoint}` };

Before(tag, () => {
  specGetOpenAPI = spec();
});

// Scenario: Retrieve the openAPI description of the specified REST service smoke type test
Given(
  'User wants to retrieve the openAPI description of the specified REST service',
  () =>
    'User wants to retrieve the openAPI description of the specified REST service'
);

When(
  'User sends GET request with given {string} as GovStackInstance {string} as memberClass {string} as memberCode {string} as applicationCode',
  (GovStackInstance, memberClass, memberCode, applicationCode) =>
    specGetOpenAPI.get(baseUrl).withPathParams({
      GovStackInstance: GovStackInstance,
      memberClass: memberClass,
      memberCode: memberCode,
      applicationCode: applicationCode,
    })
);

When('User provides query parameter {string} as serviceCode', serviceCode => {
  specGetOpenAPI.withQueryParams('serviceCode', serviceCode);
});

Then('User receives a response', async () => await specGetOpenAPI.toss());

Then('The response should be returned in a timely manner', () =>
  specGetOpenAPI
    .response()
    .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then('The response should have status 200', () =>
  specGetOpenAPI.response().to.have.status(200)
);

Then('The response should match json schema', () =>
  chai
    .expect(specGetOpenAPI._response.json)
    .to.be.jsonSchema(getOpenApiExpectedSchema)
);

// Scenario Outline: Retrieve the openAPI description of the specified REST service
Then('The response header content-type should be {string}', expected =>
  specGetOpenAPI.response().to.have.header('content-type', expected)
);

// Scenario Outline: Unable to retrieve the openAPI description of the specified REST service of an invalid path parameter
Then('The response should have status 400', () =>
  specGetOpenAPI.response().to.have.status(400)
);

// Scenario Outline: Unable to retrieve the openAPI description of the specified REST service of an invalid serviceCode parameter
// Code for this scenario is taken from the aforementioned steps, based on .feature file

// Scenario: Unable to retrieve the openAPI description of the specified REST service because of missing serviceCode parameter
// Code for this scenario is taken from the aforementioned steps, based on .feature file

After(tag, () => {
  specGetOpenAPI.end();
});
