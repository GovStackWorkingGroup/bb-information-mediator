const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specListMethods;

const baseUrl = `${localhost}{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/listMethods`;

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
    specListMethods.expectStatus(200).expectJsonSchema(responseSchema);
    await specListMethods.toss();
  }
);

After(() => {
  specListMethods.end();
});
