module.exports = {
  localhost: 'http://localhost:3366/',
  getOpenApiUrl:
    '{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/getOpenAPI',
  defaultExpectedResponseTime: 15000,
  getOpenApiExpectedSchema: {
    type: 'string',
  },
  responseSchema: {
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
  },
};
