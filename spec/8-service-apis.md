---
description: >-
  This section provides a reference for APIs that should be implemented by this
  Building Block.
---

# 8 Service APIs

The [GovStack non-functional requirements document](https://govstack.gitbook.io/specification/v/1.0/architecture-and-nonfunctional-requirements/6-onboarding) provides additional information on how 'adaptors' may be used to translate an existing API to the patterns described here. This section also provides guidance on how candidate products are tested and how GovStack validates a product's API against the API specifications defined here.

The tests for the Information Mediator Building Block can be found in [this GitHub repository](https://github.com/GovStackWorkingGroup/bb-information-mediator/tree/main/test/openAPI).

The majority of functions provided by the Information Mediator Building Block are either defined in the “service access flow” or configured by the administrator via the web User Interface. There is, however, a “Directory Service” which can provide listings of clients, methods, and available API specifications for services on the Information Mediator. The directory is managed by admins of members. The directory service centralizes and offers knowledge of all enrolled members and their services along with the information necessary to bind a third-party application as a consumer of that service. These services are described here:

* [API metadata](../api/GovStack_IM_Directory_Services_API.yaml)

and changes to the API definitions can be made by submitting a pull request on this repository. Additional APIs may be implemented by the Building Block, but the listed APIs define a minimal set of functionality that should be provided by any implementation of this Building Block.

The services can be accessed via the following Service APIs:

## 8.1 Service Access

The full API definition of all available services is the set of all available OpenAPI descriptions.

One can take any of the available OpenAPI descriptions and call service according to that description.

This call must be forwarded to IM local Security Server and path part of the called URL must begin with the address of service in the form `/r1/{instanceId}/{memberClass}/{member}/{application}/{service}/` followed by the service path with possible query parameters. The address of the service may be already listed in the OpenAPI description or must be added to the path if not provided by OpenAPI.

## 8.2 Directory Services

### 8.2.1 Member Discovery

At development time, to see which organizations are available on GovStack, an administrator of application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:yellow;">listClients</mark>

The response is an **array of organizations** with descriptions. API MAY implement paging of output.

{% openapi-operation spec="govstack-api" path="/listClients" method="get" %}
[OpenAPI govstack-api](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Directory_Services_API.yaml)
{% endopenapi-operation %}

### 8.2.2 Service Discovery

At development time, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">{listMethods || allowedMethods}</mark>

The response is an **array of services** (either all services or services that the requester is authorized to access via “allowedMethods”). API MAY implement paging of output.

{% openapi-operation spec="govstack-api" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/listMethods" method="get" %}
[OpenAPI govstack-api](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Directory_Services_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="govstack-api" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/allowedMethods" method="get" %}
[OpenAPI govstack-api](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Directory_Services_API.yaml)
{% endopenapi-operation %}

At development time, to learn about an available service, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">getOpenApi</mark>?serviceCode=SERVICE

The response is an **OpenAPI specification**, detailing the endpoints and requirements for that service/API of the requested Service of Application.

{% openapi-operation spec="govstack-api" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/getOpenAPI" method="get" %}
[OpenAPI govstack-api](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Directory_Services_API.yaml)
{% endopenapi-operation %}

## 8.3 Pub/Sub Service

To broadcast a message to a Room, the service access API must be followed and the service requested must be the service implementing event type.

### 8.3.1 Subscriber API

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/subs" method="get" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/subs/{eventType}" method="post" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/subs/{eventType}" method="get" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/subs/{eventType}" method="patch" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/subs/{eventType}" method="delete" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

### 8.3.2 PULL delivery mode API

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/pull/v1/{eventType}" method="get" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/pull/v1/{eventType}/{eventId}" method="delete" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

### 8.3.3 Publisher API

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/pub/v1/{eventType}" method="post" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/pub/v1/{eventType}/{eventId}" method="get" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/pub/v1/{eventType}/{eventId}" method="delete" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

### 8.3.4 Event Type API

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/eventType" method="post" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/eventType" method="get" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/eventType/{eventType}" method="get" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="impubsub" path="/r1/{instanceId}/{memberClass}/{memberCode}/{applicationCode}/api/v1/eventType/{eventType}" method="delete" %}
[OpenAPI impubsub](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endopenapi-operation %}

## 8.4 Logging Services

To get info from system log, an administrator may send a request to the logging API.

## 8.5 Monitoring Services

At the debugging time, to learn about system performance or retrieve an audit log, an administrator may send a request to the reporting API.

The response is \<audit trail>, \<metrics>, etc.

## 8.6 Management API

### 8.6.1 Configuration Management

{% openapi-operation spec="configuration-management" path="/api/v1/config" method="get" %}
[OpenAPI configuration-management](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="configuration-management" path="/api/v1/config" method="post" %}
[OpenAPI configuration-management](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="configuration-management" path="/api/v1/config" method="patch" %}
[OpenAPI configuration-management](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="configuration-management" path="/api/v1/config" method="put" %}
[OpenAPI configuration-management](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="configuration-management" path="/api/v1/status" method="get" %}
[OpenAPI configuration-management](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endopenapi-operation %}

### 8.6.2 Management of Access Rights

{% openapi-operation spec="configuration-management" path="/api/v1/rights/allow" method="get" %}
[OpenAPI configuration-management](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="configuration-management" path="/api/v1/rights/allow" method="patch" %}
[OpenAPI configuration-management](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="configuration-management" path="/api/v1/rights/deny" method="patch" %}
[OpenAPI configuration-management](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endopenapi-operation %}
