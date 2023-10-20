---
description: >-
  This section provides a reference for APIs that should be implemented by this
  Building Block.
---

# 8 Service APIs

The [GovStack non-functional requirements document](https://govstack.gitbook.io/specification/v/1.0/architecture-and-nonfunctional-requirements/6-onboarding) provides additional information on how 'adaptors' may be used to translate an existing API to the patterns described here. This section also provides guidance on how candidate products are tested and how GovStack validates a product's API against the API specifications defined here.

The tests for the Information Mediator Building Block can be found in [this GitHub repository](https://github.com/GovStackWorkingGroup/bb-information-mediator/tree/main/test/openAPI).

The majority of functions provided by the Information Mediator Building Block are either defined in the “service access flow” or configured by the administrator via the web User Interface. There is, however, a “Directory Service” which can provide listings of clients, methods, and available API specifications for services on the Information Mediator. The directory is managed by admins of members. The directory service centralizes and offers knowledge of all enrolled members and their services along with the information necessary to bind a third-party application as a consumer of that service. These services are described here:

* [API metadata](../api/govstack\_im\_service\_metadata\_api-0.3-swagger.json)

and changes to the API definitions can be made by submitting a pull request on this repository. Additional APIs may be implemented by the Building Block, but the listed APIs define a minimal set of functionality that should be provided by any implementation of this Building Block.[\
](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/blob/main/IM/govstack\_im\_service\_metadata\_api-0.3-swagger.jsonhttps://github.com/GovStackWorkingGroup/BuildingBlockAPI/tree/main/IM)The [Swagger variant](https://app.swaggerhub.com/apis/GovStack/gov-stack\_im\_service\_metadata\_api/0.3) is available.

The services can be accessed via the following Service APIs:

## 8.1 Service Access

The full API definition of all available services is the set of all available OpenAPI descriptions.

One can take any of the available OpenAPI descriptions and call service according to that description.

This call must be forwarded to IM local Security Server and the called URL must begin with the address of service in the form `{GovStackInstance}/{memberClass}/{member}/{application}/{service}/` followed by the service path with possible query parameters. The address of the service may be already listed in the OpenAPI description or must be added to the path if not provided by OpenAPI.

## 8.2 Directory Services

#### 8.2.1 Member Discovery

At development time, to see which organizations are available on GovStack, an administrator of application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:yellow;">listClients</mark>

The response is an **array of organizations** with descriptions. API MAY implement paging of output.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml" path="/listClients" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml)
{% endswagger %}

#### 8.2.2 Service Discovery

At development time, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">{listMethods || allowedMethods}</mark>

The response is an **array of services** (either all services or services that the requester is authorized to access via “allowedMethods”). API MAY implement paging of output.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml" path="/listMethods" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml" path="/allowedMethods" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml)
{% endswagger %}

At development time, to learn about an available service, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">getOpenApi</mark>?serviceCode=SERVICE

The response is an **OpenAPI specification**, detailing the endpoints and requirements for that service/API of the requested Service of Application.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml" path="/getOpenAPI" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Service_Metadata.yaml)
{% endswagger %}

## 8.3 Pub/Sub Service

To broadcast a message to a Room, the service access API must be followed and the service requested must be the service implementing event type.

#### 8.3.1 Subscriber API

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/subs" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/subs" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/subs/{id}" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/subs/{id}" method="delete" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/subs/{id}" method="patch" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

#### 8.3.2 PULL delivery mode API

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/pull/{serviceCode}/{operationId}" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/pull/{serviceCode}/{operationId}/{eventId}" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/pull/{serviceCode}/{operationId}/{eventId}" method="delete" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

#### 8.3.3 Publisher API

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/event/{id}" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml" path="/event/{id}" method="delete" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_PubSub_API.yaml)
{% endswagger %}

## 8.4 Logging Services

To get info from system log, an administrator may send a request to the logging API.&#x20;

## 8.5 Monitoring Services

At the debugging time, to learn about system performance or retrieve an audit log, an administrator may send a request to the reporting API.

The response is \<audit trail>, \<metrics>, etc.

### 8.6 Management API

#### 8.6.1 Configuration Management

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml" path="/config" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml" path="/config" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml" path="/config" method="put" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml" path="/config" method="patch" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml" path="/status" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endswagger %}

#### 8.6.2 Management of Access Rights

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml" path="/rights/allow" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml" path="/rights/allow" method="patch" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml" path="/rights/deny" method="patch" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/api/GovStack_IM_Configuration_Management_API.yaml)
{% endswagger %}
