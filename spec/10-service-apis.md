# 10 Service APIs

This section describes external APIs that must be implemented by the Information Mediator Building Block. Additional APIs may be implemented by the Building Block (all APIs must adhere to the standards and protocols defined), but the listed APIs define a minimal set that must be provided by any implementation.

The majority of functions provided by the Information Mediator Building Block are either defined in the “service access flow” or configured by the administrator via the web User Interface. There is, however, a “Directory Service” which can provide listings of clients, methods, and available API specifications for services on the Information Mediator. The directory is managed by admins of members. The directory service centralizes and offers knowledge of all enrolled members and their services along with information necessary to bind a third-party application as a consumer of that service. These services are described here:

* [API metadata](../api/govstack\_im\_service\_metadata\_api-0.3-swagger.json)

and changes to the API definitions can be made by submitting a pull request on this repository.[\
](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/blob/main/IM/govstack\_im\_service\_metadata\_api-0.3-swagger.jsonhttps://github.com/GovStackWorkingGroup/BuildingBlockAPI/tree/main/IM)The [Swagger variant](https://app.swaggerhub.com/apis/GovStack/gov-stack\_im\_service\_metadata\_api/0.3) is available.&#x20;

The services can be accessed via the following Service APIs:

## 10.1 Member Discovery API

At development time, to see which organizations are available on GovStack, an administrator of application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:yellow;">listClients</mark>

The response is an **array of organizations** with descriptions.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json" path="/listClients" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json](https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json)
{% endswagger %}

## 10.2 Service Discovery API

At development time, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">{listMethods || allowedMethods}</mark>

The response is an **array of services** (either all services or services that the requester is authorized to access via “allowedMethods”).

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json" path="/{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/listMethods" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json](https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json)
{% endswagger %}

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json" path="/{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/allowedMethods" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json](https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json)
{% endswagger %}

## 10.3 Service Detail API

At development time, to learn about an available service, an administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">getOpenApi</mark>?serviceCode=SERVICE

The response is an **OpenAPI specification**, detailing the endpoints and requirements for that service/API of the requested Service of Application.

{% swagger src="https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json" path="/{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/getOpenAPI" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json](https://raw.githubusercontent.com/GovStackWorkingGroup/BuildingBlockAPI/main/IM/govstack_im_service_metadata_api-0.3-swagger.json)
{% endswagger %}

## 10.4 Reporting API

At the debugging time, to learn about system performance or retrieve an audit log, an administrator may send a request to the reporting API.

The response is \<audit trail>, \<metrics>, etc.

## 10.5 Service Access API

At the debugging time, to learn about system performance or retrieve an audit log, an administrator may send a request to the reporting API.

The response is `<audit trail>`, `<metrics>`, etc.

10.5 Service Access API

The full technical specification on how to call service is presented in the “Detailed Flows” section below [14.1.6 Sending a message from A to B](14-annexes-and-appendices.md#14.1.6-sending-a-message-from-a-to-b).

The full API definition of all available services can be produced from the set of all available OpenAPI descriptions. For that one need in all occurrences of:

“path”: { “\<some-value>”: … }

prepend \<some-value> with

{GovStackInstance}/{memberClass}/{member}/{application}/{service}/ extending this way the path with these details.

## 10.6 Broadcast API

To broadcast a message to a Room, the service access API must be followed and the service requested must be the service implementing event type.
