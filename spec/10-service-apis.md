---
description: >-
  This section provides a reference for APIs that should be implemented by this
  Building Block.
---

# 8 Service APIs

The [GovStack non-functional requirements document](https://govstack.gitbook.io/specification/v/1.0/architecture-and-nonfunctional-requirements/6-onboarding) provides additional information on how 'adaptors' may be used to translate an existing API to the patterns described here. The majority of functions provided by the Information Mediator Building Block are either defined in the “service access flow” or configured by the administrator via the web User Interface. There is, however, a “Directory Service” which can provide listings of clients, methods, and available API specifications for services on the Information Mediator. The directory is managed by admins of members. The directory service centralizes and offers knowledge of all enrolled members and their services along with the information necessary to bind a third-party application as a consumer of that service. These services are described here:

* [API metadata](../api/govstack\_im\_service\_metadata\_api-0.3-swagger.json)

and changes to the API definitions can be made by submitting a pull request on this repository. Additional APIs may be implemented by the Building Block, but the listed APIs define a minimal set of functionality that should be provided by any implementation of this Building Block.[\
](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/blob/main/IM/govstack\_im\_service\_metadata\_api-0.3-swagger.jsonhttps://github.com/GovStackWorkingGroup/BuildingBlockAPI/tree/main/IM)The [Swagger variant](https://app.swaggerhub.com/apis/GovStack/gov-stack\_im\_service\_metadata\_api/0.3) is available.

The services can be accessed via the following Service APIs:

## 8.1 Service Access

The full API definition of all available services can be produced from the set of all available OpenAPI descriptions. For that one need in all occurrences of:

“path”: { “\<some-value>”: … }

prepend \<some-value> with

{GovStackInstance}/{memberClass}/{member}/{application}/{service}/ extending this way the path with these details.

## 8.2 Directory Services

#### 8.2.1 Member Discovery

At development time, to see which organizations are available on GovStack, an administrator of application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:yellow;">listClients</mark>

The response is an **array of organizations** with descriptions. API MAY implement paging of output.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_list-clients_api-0.3-swagger.yaml" path="/listClients" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_list-clients_api-0.3-swagger.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_list-clients_api-0.3-swagger.yaml)
{% endswagger %}

#### 8.2.2 Service Discovery

At development time, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">{listMethods || allowedMethods}</mark>

The response is an **array of services** (either all services or services that the requester is authorized to access via “allowedMethods”). API MAY implement paging of output.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml" path="/listMethods" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml" path="/allowedMethods" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml)
{% endswagger %}

At development time, to learn about an available service, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">getOpenApi</mark>?serviceCode=SERVICE

The response is an **OpenAPI specification**, detailing the endpoints and requirements for that service/API of the requested Service of Application.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml" path="/getOpenAPI" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/gov-stack_im_service_metadata_api-0.3-swagger.yaml)
{% endswagger %}

## 8.3 Pub/Sub Service

To broadcast a message to a Room, the service access API must be followed and the service requested must be the service implementing event type.

#### 8.3.1 Subscriber API

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/subs" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/subs" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/subs/{id}" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/subs/{id}" method="delete" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/subs/{id}" method="patch" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

#### 8.3.2 PULL delivery mode API

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/pull/{serviceCode}/{operationId}" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/pull/{serviceCode}/{operationId}/{eventId}" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/pull/{serviceCode}/{operationId}/{eventId}" method="delete" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

#### 8.3.3 Publisher API

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/event/{id}" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml" path="/event/{id}" method="delete" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API-1.0.0.yaml)
{% endswagger %}

## 8.4 Logging Services

At development time, to learn about an available service, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">getOpenApi</mark>?serviceCode=SERVICE

The response is an **OpenAPI specification**, detailing the endpoints and requirements for that service/API of the requested Service of Application.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json" path="/{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/getOpenAPI" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json](https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json)
{% endswagger %}

## 8.5 Monitoring Services

At the debugging time, to learn about system performance or retrieve an audit log, an administrator may send a request to the reporting API.

The response is \<audit trail>, \<metrics>, etc.
