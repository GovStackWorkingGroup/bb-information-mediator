const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specAllowedMethods;

const baseUrl = `${localhost}{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/allowedMethods`;

const responseSchema = {
  type: 'object',
  properties: {
    member: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          objectType: {
            type: 'object',
            properties: {
              object_type: {
                type: 'string',
                enum: [
                  'MEMBER',
                  'SUBSYSTEM',
                  'SERVER',
                  'GLOBALGROUP',
                  'SECURITYCATEGORY',
                  'SERVICE',
                  'CENTRALSERVICE',
                  'LOCALGROUP',
                ],
              },
            },
            additionalProperties: false,
          },
          serviceType: { type: 'string' },
          GovStackInstance: { type: 'string' },
          memberClass: { type: 'string' },
          memberCode: { type: 'string' },
          applicationCode: { type: 'string' },
          serviceCode: { type: 'string' },
          serviceVersion: { type: 'string' },
          endpointList: {
            type: 'object',
            properties: {
              member: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    method: { type: 'string' },
                    path: { type: 'string' },
                  },
                  additionalProperties: false,
                },
              },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      },
    },
  },
  required: ['member'],
  additionalProperties: false,
};

Before(() => {
  specAllowedMethods = spec().expectResponseTime(15000);
});

// Scenario: Successfully retrieved the list of REST services and endpoints for a service provider
Given(
  'Wants to retrieve the list of allowed REST services and endpoints for a service provider',
  () => 'Required route params were specified'
);

When(
  'The request to retrieve the list of allowed REST services and endpoints for a service provider is sent',
  () =>
    specAllowedMethods.get(baseUrl).withPathParams({
      GovStackInstance: 'string',
      memberClass: 'string',
      memberCode: 'string',
      applicationCode: 'string',
    })
);

Then(
  'The operation returns the list of allowed REST services and endpoints for a service provider',
  async () => {
    specAllowedMethods.expectStatus(200).expectJsonSchema(responseSchema);
    await specAllowedMethods.toss();
  }
);

After(() => {
  specAllowedMethods.end();
});
