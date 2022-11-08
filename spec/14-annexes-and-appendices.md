# 14 Annexes and Appendices

## 14.1 Detailed Technical Flows

The detailed flows section is a description of how various clients (members, applications, services) are registered and managed on the information mediator.

### 14.1.1 Registering a Member

A “member” on the <mark style="background-color:purple;">information mediator</mark> (e.g. “<mark style="background-color:blue;">Ministry of Agriculture</mark>”) is the organization (maybe with their own network) which runs a number of applications (e.g., “<mark style="background-color:green;">Market Linkage</mark>”, “Rural Agricultural Advisory Services”) which have their own services (e.g., “/api/refer :: Create Education Referral Webservice”, “<mark style="background-color:red;">/api/inventory-service :: Update Market Inventory</mark>”).

### 14.1.2 Security Server Client States <a href="#docs-internal-guid-9b3ae46c-7fff-b8c0-13dc-b063ccee2b16" id="docs-internal-guid-9b3ae46c-7fff-b8c0-13dc-b063ccee2b16"></a>

The security server client registration passes following states:

![Source in github: https://github.com/GovStackWorkingGroup/BuildingBlockAPI/blob/main/IM/diagrams/state-machine-diagram-for-registration-requests.png](<.gitbook/assets/dd1 (1).png>)

### 14.1.3 Adding a Security Server Client

**Required Interface**: Security Server; Required Role for **Access rights**: Registration Officer

Follow these steps.

1. There is a formal business/legal process which is a precondition for adding a new “client” (Security Server)
   1. It is never one person simply adding a new app or service by their own will. A traceable formal request from an authorized authority of the entity to register this application/service into IM will be there.
   2. This request will need approval from the IM governance authorized person, before it gets into the system. The request and approval documents may be by email or hard copy. In either case a copy of those documents must be mandatory attachments to this registration/registration process of members, apps, services.
   3. Once the formal approval is acquired and properly documented, the technical steps (carried out by an authorized system administrator) are outlined below.
2. In the **CLIENTS** view, click **ADD CLIENT**.
3. In the wizard that opens
   1. Client details page: Select an existing client from the Global list by pressing **SELECT CLIENT** or specify the details of the Client to be added manually and click **NEXT**
   2. Token page: Select the token where you want to add the SIGN key for the new Client. Click **NEXT**
   3. Sign key page: Define a label (optional) for the newly created SIGN key and click **NEXT**
   4. CSR details page: Select the Certification Authority (CA) that will issue the certificate in **Certification Service** field and format of the certificate signing request according to the CA's requirements in the **CSR Format** field. Click **NEXT**.
   5. Generate CSR page: Define **Organization Name (O)** and click **NEXT**
   6. Finish page: click **SUBMIT** and the new client will be added to the Clients list and the new key and CSR will appear in the Keys and Certificates view.

The new client is added to the list of security server clients in the "Saved" state.

### 14.1.4 Registering an Application

(Adding a Security Server Member Application)

**Interface**: Security Server; **Access rights**: Registration Officer

Follow these steps.

1. In the **CLIENTS** view in the client list, locate the Service Access gateway member you want to add an application to and click **Add Subsystem** at the end of the row.
2. In the wizard that opens\
   2.1. Select an existing application from the Global list by pressing **SELECT SUBSYSTEM** or specify the **Subsystem Code** manually\
   2.2. If you wish to register the new application immediately, check the **Register subsystem** checkbox and then click **ADD SUBSYSTEM**.\
   (2.3.) If you checked the **Register subsystem** checkbox, a popup will appear asking whether you wish to register the application immediately. In the popup, click **YES**.

The new application is added to the list of security server clients in the "Saved" state.

### 14.1.5 Registering a Service <a href="#docs-internal-guid-00dc30d3-7fff-39c9-ff49-9791f745e394" id="docs-internal-guid-00dc30d3-7fff-39c9-ff49-9791f745e394"></a>

Once a member entity and app is registered by IM admin, the admin of that entity can register different services provided by the entity. Otherwise the IM administrator will be inundated by changes across so many services and applications that may use informed

**Interface**: Security Server; **Access rights**: Service Administrator

After a new REST service is added, the security server displays text "REST" and url for that service.

**To add a REST service**, follow these steps.

1. Navigate to the CLIENTS tab, click the name of the client for which you wish to add REST service to and click the **SERVICES** tab.
2. Click **ADD REST**. Select whether the URL type is "REST API Base Path" or "OpenAPI 3 Description". Enter the url and service code in the window that opens and click **ADD**.
3. Once the window is closed, the url and the service code are added to the service list. If the added URL type was OpenAPI 3 description, the service description is parsed and endpoints are added under the service. By default, the REST service is added in disabled state.

**To see the service details under the REST service**

* click the caret on the REST service description row to expand the service details.

Example of service description is in Annex A.

### 14.1.6 Sending a Message from A to B

(through Service Access gateway)

#### **14.1.6.1 REST Interface**

HTTP version 1.1 is used by the protocol as described in \[[RFC2616](https://tools.ietf.org/html/rfc2616.html)]. The consumer member/application is specified using HTTP headers. The service to be called is encoded as part of the HTTP/HTTPS request URL. Here is the generic form of the REST service call.

**Request format**

{http-request-method} /{protocol-version}/{serviceId}\[/path]\[?query-parameters]

**HTTP request headers**

X-GovStack-Client: {client}

* **{http-request-method}** can be one of the request methods defined in \[[RFC7231](https://tools.ietf.org/html/rfc7231)]. For example GET, POST, PUT and DELETE.s
* **{protocol-version}**: specifies the major version of the Service Access gateway Message Protocol for REST. For the initial version r1 MUST be used.
* **{client}**: specifies the member/application that is used as a service client - an entity that initiates the service call. The identifier consists of the following parts: \[GovStack instance]/\[member class]/\[member code]/\[application code]. Including the application code is OPTIONAL.
* **{serviceId}** identifies the service that is registered under {provider-application} and invoked by the request. {serviceId} contains the following parts:
  * \[GovStack instance]/\[member class]/\[member code]/\[application code]/\[service code]. Including the application code is OPTIONAL.
  * The **{serviceId}** is mapped to an actual service URL by the Security Server (see the example below).
* **\[path]** contains the relative path to the service to be called
* **\[query-parameters]** contains the query parameters to be sent to the service

Here is a practical example of an Service Access gateway REST call.

**Request example**

GET /r1/INSTANCE/CLASS2/MEMBER2/APPLICATION2/BARSERVICE/v1/bar/zyggy?quu=1

**HTTP request headers**

X-GovStack-Client: INSTANCE/CLASS1/MEMBER1/APPLICATION1

Breakdown of the request URI:

* **{http-request-method}**: GET
* **{protocol-version}**: /r1
* **{client}**: INSTANCE/CLASS1/MEMBER1/APPLICATION1
* **{serviceId}**: /INSTANCE/CLASS2/MEMBER2/APPLICATION2/BARSERVICE
* **\[path]**: /v1/bar/zyggy
* **\[query-parameters]**: ?quu=1

Assuming that the serviceId maps to the URL [https://barservice.example.org/](https://barservice.example.org), the provider will see the request GET https://barservice.example.org/v1/bar/zyggy?quu=1. The reason for naming the service independently of the path is that the same provider could have a fooservice as well ([https://fooservice.example.org/](https://fooservice.example.org)), in which case it would be difficult to tell the services apart if the path was the service Id (both services could have paths like "/v1/...") unless the fooservice was attached to a separate application.

On the Security Server side the incoming request URIs MUST be validated. Input strings from the user can't be trusted. Lengths of the strings need to be checked and maximum length or the request URI needs to be limited. Although the URI standard does not specify a maximum size of the URL, most clients enforce an arbitrary limit of 2000 characters. The Security Server implementation MAY do this as well. Sending data that is difficult to express in a hierarchical manner, and especially data that is larger than this 2000 character limit, should be transmitted in the body of the request.

#### **14.1.6.2 Use of HTTP Headers**

There is only one mandatory HTTP header in the protocol that needs to be set by the client. Otherwise the use of headers in Service Access gateway REST service calls is OPTIONAL. The mandatory header and the most common optional header types and their operation are described next.

Note. HTTP headers are not case-sensitive. X-GovStack-Client and x-govstack-client are both valid header names.

**Mandatory X-GovStack headers in the request**

**X-GovStack-Client**: Specifies the member/application that is used as a service client - an entity that initiates the service call. The identifier consists of the following parts: \[GovStack instance]/\[member class]/\[member code]/\[application code]. Including the application code is OPTIONAL. The identifier parts MUST be represented as UTF-8 and encoded using percent encoding.

\
X-GovStack-Client: INSTANCE/CLASS/MEMBER/APPLICATION

**Service Access gateway specific headers returned in the response**

The response contains some Service Access gateway specific headers that are set by the provider Security Server. The provider service SHOULD NOT set these headers since in that case they will be overwritten.

* **X-GovStack-Client**: Specifies the member/application that is used as a service client
* **X-GovStack-Service**: Specifies the serviceId that is invoked by the service client
* **X-GovStack-Id**: Unique identifier for this message
* **X-GovStack-Request-Hash**: For responses, this field contains sha-512 encoded hash of the request message
* **X-GovStack-Error**: This header is provided in case there was an error processing the request and it occurred somewhere in Service Access gateway (on the consumer or provider Security Server)

X-GovStack-Request-Id: Unique identifier for the request

X-GovStack-Client: INSTANCE/CLASS/MEMBER/APPLICATION

X-GovStack-Service: INSTANCE/CLASS/MEMBER/APPLICATION/PETSTORE

X-GovStack-Id: fa2e18a5-c2cb-4d09-b994-f57727f7c3fb

X-GovStack-Request-Hash: 4c519cf0-0e5e-4ccf-b72b-8ed6fe289e6e

X-GovStack-Request-Id: f92591a3-6bf0-49b1-987b-0dd78c034cc3

**Request hash header**

* **X-GovStack-Request-Hash**: For responses, this field SHALL contain the base-64 encoded SHA512(SHA512(headers)+SHA512(body)). If there is no body, then only the headers are included in the calculation i.e. the field contains the base-64 encoded SHA512(headers). This field is automatically filled in by the service provider's Security Server. The field is used to create a strong connection between a request and a response. Thus, it is possible to prove, for example, that a certain registry record is returned in response to a certain query.
* The request hash header MUST be automatically created by the service provider's Security Server and it MUST be verified by the service client's Security Server
* The request message SHOULD NOT contain the request hash header.

The response message returned by a service provider SHOULD NOT contain the request hash header. If the response message contains the request hash header, the service provider's Security Server MUST ignore the field and replace it with the created field.\
X-GovStack-Request-Hash: 14sEri8SmLNy/DJyTob0ZddAskmdRy5ZUyhbr33iLkaA+gLpWcivUH16fzbuIs7hhs2AnA4lJDloyIihXMlVQA==

**Content-Type header**

* With REST messages that include the request body it is RECOMMENDED that the content's media type is indicated with this header. Additionally it is RECOMMENDED to use the charset parameter to indicate the character encoding used in the REST message.
* The REST messages originating from the Security Server (e.g. error messages) MUST include the header and indicate the content's type and character encoding with it.
* If Content-Type header is included in the request message by the consumer information system, it MUST be transported unmodified through Service Access gateway to the provider information system

If Content-Type header is included in the response message by the provider information system, it MUST be transported unmodified through Service Access gateway to the consumer information system\
Content-Type: application/json; charset=utf-8

Content-Type: multipart/form-data; boundary=something

In case the service consumer does not provide the Content-Type header (or some of its components), the request message is anyhow passed to the provider service which can decide what to do with it.

**Accept header**

* It is RECOMMENDED that the service consumer advertises the content types it is able to understand by including the Accept header in the request message.

If Accept header is included in the request message, it MUST be transported unmodified through Service Access gateway to the service provider.\
Accept: application/xml

In case the service consumer does not provide the Accept header, the Security Server MUST use the default content-type application/json.

**Security Server and X-GovStack extension headers**

* **X-GovStack-Security-Server**: To send the request to a specific Security Server this header needs to be included. It contains the following parts
  * \[GovStack instance]/\[member class]/\[member code]/\[server code]

Other Service Access gateway extension headers are not defined in this document. Rather they are just contracts between information systems and Service Access gateway handles them like any user defined header.\
X-GovStack-Security-Server: INSTANCE/MEMBERCLASS/MEMBERCODE/SERVERCODE

**Optional X-GovStack headers**

* **X-GovStack-Id**: Unique identifier for this message. It is RECOMMENDED to use universally unique identifiers \[[UUID](https://en.wikipedia.org/wiki/Universally\_unique\_identifier)]. If X-GovStack-Id is not provided, it SHALL be generated by the consumer Security Server. The provider Security Server SHALL include the X-GovStack-Id header in the response message.
* **X-GovStack-UserId**: User whose action initiated the request. The user ID should be prefixed with two-letter ISO country code (e.g., EE12345678901).
* **X-GovStack-Issue**: Identifies received application, issue or document that was the cause of the service request. This field may be used by the client information system to connect service requests (and responses) to working procedures.

\
X-GovStack-Id: fa2e18a5-c2cb-4d09-b994-f57727f7c3fb

X-GovStack-UserId: EE12345678901

X-GovStack-Issue: MT324223MSD

**X-GovStack error header**

* **X-GovStack-Erro**r: This header is provided in case there was an error processing the request and it occurred somewhere in Service Access gateway (on the consumer or provider Security Server). With it the client can easily distinguish between the errors occurring on provider services and errors on Security Servers. Note that the header does not contain detailed error information but is more like a flag indicator to the interested parties. The header contains only the error type and the more detailed information such as the HTTP response code, error message body etc. need to be read from the response body.\
  Server.ServerProxy.DatabaseError

**User defined headers**

User defined HTTP headers (i.e. the headers not mentioned in \[[https://en.wikipedia.org/wiki/List\_of\_HTTP\_header\_fields](https://en.wikipedia.org/wiki/List\_of\_HTTP\_header\_fields)] or this document) MUST be passed to the recipient unmodified by Security Server.\
X-Powered-By: PHP/5.2.17

X-Pingback: https://example.com/xmlrpc.php

**Cache headers**

Service Access gateway does not cache messages.

Cache headers MUST be passed as-is and the consumer/provider MAY take advantage of this information.\
Cache-Control: no-cache, no-store, must-revalidate

Pragma: no-cache

**Cross-origin resource sharing**

* Security Server is not designed to be a direct proxy for a web front-end. It does not do anything specific to enable cross-origin resource sharing (CORS).

**Filtered headers**

Some HTTP headers MUST be rewritten by the Security Server. The original value, if any, will not be passed through. The Security Server will either provide a new value or not send the header at all.

* Hop-by-hop headers
  * Connection, Keep-Alive, Proxy-Authenticate, Proxy-Authorization, TE, Trailer, Transfer-Encoding, Upgrade
* Headers that can leak the name or address of the origin host
  * Host
  * User-Agent
  * Server

**Specially handled headers**

Some HTTP headers are handled by the Security Server and the user should not expect that they are passed through Service Access gateway unmodified.

* Expect
  * Expectation 100 Continue MAY be handled locally at the consumer Security Server. Support for other expectations is OPTIONAL.
  * (100 Continue is the only expectation defined by \[[RFC7231](https://tools.ietf.org/html/rfc7231)])
* Content-Length
  * The Security Server MAY change the transfer encoding, thus removing or adding a content-length header as necessary.

#### 14.1.6.3 Examples

#### **14.1.6.4 General**

The pet store service used in the following examples has an \[[OPENAPI3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md)] service description file available in Annex A. The most important aspects of the service are described in the text but for more details please refer to the aforementioned service description file.

The examples assume that the serviceId is mapped to[ https://petstore.niis.org/](https://petstore.niis.org).

**GET Request and Response**

REQUEST

| **Service**   | **Method** | **Description** | **Parameters**              |
| ------------- | ---------- | --------------- | --------------------------- |
| /pets/{petId} | GET        | Finds pet by ID | petId - ID of pet to return |

Service called directly

curl -X GET "https://petstore.niis.org/v2/pets/1124" -H "accept: application/json"

Service called through Service Access gateway

curl -X GET "https://{securityserver}/r1/{serviceId}/v2/pets/1124" -H "accept: application/json" -H "X-GovStack-Client: {client}"

Service response

```json
{
  "id": 1124,
  "name": "Siddu",
  "photoUrls": [],
  "tags": [],
  "status": "Offline"
}
```

Service response code

200\\

Service response headers

Content-Type: application/json;charset=utf-8

Date: Thu, 21 Mar 2019 12:36:39 GMT

X-GovStack-id: 29f4d011-ef17-4f2f-9bb1-0452ce17d3f5

X-GovStack-client: DEV/COM/222/TESTCLIENT

X-GovStack-service: DEV/COM/222/TESTSERVICE/petstore

X-GovStack-request-id: f92591a3-6bf0-49b1-987b-0dd78c034cc3

X-GovStack-request-hash: Xvx9V2U5c5RhDUiXpVLtW7L8vTd5cM2IOBU2n9efEk7/m3ECKyGAp7yTpJpTWpo6HcmwSaGO+cinxMVKjxJTOQ==

Content-Length: 1148\\

**PUT Request and Response**

REQUEST

| **Service**   | **Method** | **Description**        | **Parameters**                                      |
| ------------- | ---------- | ---------------------- | --------------------------------------------------- |
| /pets/{petId} | PUT        | Update an existing pet | body - Pet object that will be updated in the store |

Service called directly

curl -X PUT "https://petstore.niis.org/v2/pets/5657082955040009" -H "accept: application/json" -H "Content-Type: application/json" -d '{ "id": 0, "category": { "id": 0, "name": "string" }, "name": "doggie", "photoUrls": \[ "string" ], "tags": \[ { "id": 0, "name": "string" } ], "status": "available"}'

Service called through Service Access gateway

curl -X PUT "https://{securityserver}/r1/{serviceId}/v2/pets/5657082955040009" -H "accept: application/json" -H "Content-Type: application/json" -H "X-GovStack-Client: {client}" -d '{ "id": 0, "category": { "id": 0, "name": "string" }, "name": "doggie", "photoUrls": \[ "string" ], "tags": \[ { "id": 0, "name": "string" } ], "status": "available"}'

Service response

{

"id": 5657082955040009,

"category": {

"id": 0,

"name": "string"

},

"name": "doggie",

"photoUrls": \[

"string"

],

"tags": \[

{

"id": 0,

"name": "string"

}

],

"status": "available"

}

Service response code

200

Service response headers

Date: Thu, 21 Mar 2019 12:43:33 GMT

X-GovStack-id: acdb2c7a-c705-41c2-b595-4cd62e78316e

X-GovStack-client: DEV/COM/222/TESTCLIENT

X-GovStack-service: DEV/COM/222/TESTSERVICE/petstore

X-GovStack-request-id: f92591a3-6bf0-49b1-987b-0dd78c034cc3

X-GovStack-request-hash: MOEfTqBjdqYiX3db9hxJ6JvHvCpYqfA6t0Uhdv6g2I29fMY8ld4CbN8tslj6mUQPXoRaUdPm7NdZeAYTg6zi+A==

Content-Length: 0

**POST Request and Response**

REQUEST

| **Service** | **Method** | **Description**            | **Parameters**                                        |
| ----------- | ---------- | -------------------------- | ----------------------------------------------------- |
| /pets       | POST       | Add a new pet to the store | body - Pet object that needs to be added to the store |

Service called directly

curl -X POST "https://petstore.niis.org/v2/pets" -H "accept: application/json" -H "Content-Type: application/json" -d '{ "id": 0, "category": { "id": 0, "name": "string" }, "name": "doggie", "photoUrls": \[ "string" ], "tags": \[ { "id": 0, "name": "string" } ], "status": "available"}'

Service called through Service Access gateway

curl -X POST "https://{securityserver}/r1/{serviceId}/v2/pets" -H "accept: application/json" -H "Content-Type: application/json" -H "X-GovStack-Client: {client}" -d '{ "id": 0, "category": { "id": 0, "name": "string" }, "name": "doggie", "photoUrls": \[ "string" ], "tags": \[ { "id": 0, "name": "string" } ], "status": "available"}'

Service response

{

"id": 5657082955040122,

"category": {

"id": 0,

"name": "string"

},

"name": "doggie",

"photoUrls": \[

"string"

],

"tags": \[

{

"id": 0,

"name": "string"

}

],

"status": "available"

}

Service response code

200\\

Service response headers

Date: Thu, 21 Mar 2019 12:49:38 GMT

X-GovStack-id: dcaaa3a2-a158-41e1-8775-309848052358

X-GovStack-client: DEV/COM/222/TESTCLIENT

X-GovStack-service: DEV/COM/222/TESTSERVICE/petstore

X-GovStack-request-id: f92591a3-6bf0-49b1-987b-0dd78c034cc3

X-GovStack-request-hash: VCNZdwTxl7m3XC6Mpfw1H6qJUtBcm3Y6tfCvg5b3W/fb2RRXsLF9wftR3u6ElclE+RFaiAN/OkSz02fAYbNKaw==

Content-Length: 0\\

**DELETE Request and Response**

REQUEST

| **Service**   | **Method** | **Description** | **Parameters**           |
| ------------- | ---------- | --------------- | ------------------------ |
| /pets/{petId} | DELETE     | Deletes a pet   | petId - Pet id to delete |

Service called directly

curl -X DELETE "https://petstore.niis.org/v2/pets/1124" -H "accept: application/json"

Service called through Service Access gateway

curl -X DELETE "https://{securityserver}/r1/{serviceId}/v2/pets/1124" -H "accept: application/json" -H "X-GovStack-Client: {client}"

Service response

Service response code

200

\\

Service response headers

Date: Thu, 21 Mar 2019 12:49:38 GMT

X-GovStack-id: 6209d61b-6ab5-4443-a09a-b8d2a7c491b2

X-GovStack-client: DEV/COM/222/TESTCLIENT

X-GovStack-service: DEV/COM/222/TESTSERVICE/petstore

X-GovStack-request-id: f92591a3-6bf0-49b1-987b-0dd78c034cc3

X-GovStack-request-hash: lQBoldcyuI3BerjHfkleRQ45AyYoFlF7zXSN6yH/RwvTNWEcsTQM18EfqMxYfdkyGGB26oxAjAWv/AcfmZF7og==

Content-Length: 0\\

**POST Request with Attachments and Response**

REQUEST

| **Service**          | **Method** | **Description**  | **Parameters**                                                                                                                    |
| -------------------- | ---------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| /pets/{petId}/images | POST       | uploads an image | <p>• petId - ID of pet to update</p><p>• additionalMetadata - Additional data to pass to server</p><p>• file - file to upload</p> |

Service called directly

curl -X POST "https://petstore.niis.org/v2/pets/1124/images" -H "accept: application/json" -H "Content-Type: multipart/form-data" -F "file=@A-fluffy-cat-looking-funny-surprised-or-concerned.jpg;type=image/jpeg"

Service called through Service Access gateway

curl -X POST "https://{securityserver}/r1/{serviceId}/v2/pets/1124/images" -H "accept: application/json" -H "Content-Type: multipart/form-data" -H "X-GovStack-client: {client}" -F "file=@A-fluffy-cat-looking-funny-surprised-or-concerned.jpg;type=image/jpeg"

Service response

{

"code":200,

"type":null,

"message":"additionalMetadata: null\nFile uploaded to ./file, 170025 bytes"

}

Service response code

200\\

Service response headers

Content-Type: application/json;charset=utf-8

Date: Thu, 21 Mar 2019 13:02:29 GMT

X-GovStack-id: 86e081a6-ec16-4b8d-b729-963f9659a80c

X-GovStack-client: DEV/COM/222/TESTCLIENT

X-GovStack-service: DEV/COM/222/TESTSERVICE/petstore

X-GovStack-request-id: f92591a3-6bf0-49b1-987b-0dd78c034cc3

X-GovStack-request-hash: EycIkZAz4WMvbKgnBvd0wUcN4A4w0RZMvugD36ZJ2PpwwGZuMGfxCoO4C0ZC3c4LBGF0rh61vunL3ssZV6TB3Q==

Content-Length: 100

### 14.1.7 Directory Services (Meta Services)

#### **14.1.7.1 Retrieving List of Service Providers**

For retrieving the list of service providers <mark style="background-color:yellow;">listClients</mark> metaservice is used. It can be invoked with simple HTTP GET to right URL. Service output format is controlled with Accept header.

#### **14.1.7.2 Retrieving List of Services**

Service Access gateway provides two methods for getting the list of services offered by an Service Access gateway client:

* <mark style="background-color:yellow;">listMethods</mark> lists all REST services offered by a service provider.
* <mark style="background-color:yellow;">allowedMethods</mark> lists all REST services offered by a service provider that the caller has permission to invoke.

Both methods are invoked as regular Service Access gateway REST services.

The serviceId MUST contain the identifier of the target service provider and the value of the serviceCode element MUST be either listMethods or allowedMethods.

Request example

GET /r1/INSTANCE/CLASS2/MEMBER2/APPLICATION2/listMethods\\

HTTP request headers

X-GovStack-Client: INSTANCE/CLASS1/MEMBER1/APPLICATION1\\

The body of the response message MUST contain a list of services provided by the service provider (in case of listMethods) or open to the given client (in case of allowedMethods). The response SHALL NOT contain names of the metainfo services.

Annex[ ](https://github.com/nordic-institute/X-Road/blob/develop/doc/Protocols/pr-mrest\_x-road\_service\_metadata\_protocol\_for\_rest.md#annex-a-service-descriptions-for-rest-metadata-services)B contains the OpenAPI description of the REST metadata services.

Annexes C.1 and C.2 contain example response messages for services, respectively.

#### **14.1.7.3 Retrieving the OpenAPI Description of a Service**

Service Access gateway provides a metaservice for fetching service descriptions of REST services.

* <mark style="background-color:yellow;">getOpenAPI</mark> returns the OpenAPI service description of a REST service

The method is invoked as regular Service Access gateway REST service.

The serviceId MUST contain the identifier of the target service provider and the value of the serviceCode element MUST be getOpenAPI.

The query parameters must contain serviceCode=xxx where xxx is the service code of the REST service we want to get the service description from.

Request example

GET /r1/INSTANCE/CLASS2/MEMBER2/APPLICATION2/getOpenAPI?serviceCode=listFirms\\

HTTP request headers

X-GovStack-Client: INSTANCE/CLASS1/MEMBER1/APPLICATION1

The body of the response MUST contain the OpenAPI service description of the REST service indicated by the query parameters.

Annex[ ](https://github.com/nordic-institute/X-Road/blob/develop/doc/Protocols/pr-mrest\_x-road\_service\_metadata\_protocol\_for\_rest.md#annex-a-service-descriptions-for-rest-metadata-services)B contains the OpenAPI description of the REST metadata services.

Annex C.3 contains an example response message for the service.

## 14.2 Annex A Service Description

```
openapi: 3.0.0
info:
  description: >-
    This is a sample server Petstore server.
  version: 1.0.0
  title: Petstore
  contact:
    email: info@niis.org
  license:
    name: Apache 2.0
    url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
tags:
  - name: pet
    description: Everything about your Pets
    externalDocs:
      description: Find out more
      url: 'https://niis.org'
  - name: store
    description: Access to Petstore orders
  - name: user
    description: Operations about user
    externalDocs:
      description: Find out more about our store
      url: 'https://niis.org'
paths:
  /pets:
    get:
      tags:
        - pet
      summary: Get pets from store
      description: Search pets
      operationId: getPets
      parameters:
        - name: term
          in: query
          description: search term
          required: false
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
        '400':
          description: Invalid ID supplied
        '404':
          description: Pet not found
      security:
        - api_key: []
    post:
      tags:
        - pet
      summary: Add a new pet to the store
      description: ''
      operationId: addPet
      responses:
        '201':
          description: pet created
        '405':
          description: Invalid input
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
      requestBody:
        $ref: '#/components/requestBodies/Pet'
  '/pets/{petId}':
    get:
      tags:
        - pet
      summary: Find pet by ID
      description: Returns a single pet
      operationId: getPetById
      parameters:
        - name: petId
          in: path
          description: ID of pet to return
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/Pet'
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
        '400':
          description: Invalid ID supplied
        '404':
          description: Pet not found
      security:
        - api_key: []
    put:
      tags:
        - pet
      summary: Update an existing pet
      description: ''
      operationId: updatePet
      parameters:
        - name: petId
          in: path
          description: ID of pet to return
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Pet updated
        '400':
          description: Invalid ID supplied
        '404':
          description: Pet not found
        '405':
          description: Validation exception
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
      requestBody:
        $ref: '#/components/requestBodies/Pet'
    delete:
      tags:
        - pet
      summary: Deletes a pet
      description: ''
      operationId: deletePet
      parameters:
        - name: api_key
          in: header
          required: false
          schema:
            type: string
        - name: petId
          in: path
          description: Pet id to delete
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Pet deleted
        '400':
          description: Invalid ID supplied
        '404':
          description: Pet not found
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
  '/pets/{petId}/images':
    post:
      tags:
        - pet
      summary: Uploads an image
      description: ''
      operationId: uploadFile
      parameters:
        - name: petId
          in: path
          description: ID of pet to update
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiResponse'
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
      requestBody:
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                additionalMetadata:
                  description: Additional data to pass to server
                  type: string
                file:
                  description: file to upload
                  type: string
                  format: binary
  /store/inventories:
    get:
      tags:
        - store
      summary: Returns pet inventories by status
      description: Returns a map of status codes to quantities
      operationId: getInventory
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                additionalProperties:
                  type: integer
                  format: int32
      security:
        - api_key: []
  /store/orders:
    post:
      tags:
        - store
      summary: Place an order for a pet
      description: ''
      operationId: placeOrder
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/Order'
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '400':
          description: Invalid Order
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Order'
        description: order placed for purchasing the pet
        required: true
  '/store/orders/{orderId}':
    get:
      tags:
        - store
      summary: Find purchase order by ID
      description: >-
        For valid response try integer IDs with value >= 1 and <= 10.      
        Other values will generated exceptions
      operationId: getOrderById
      parameters:
        - name: orderId
          in: path
          description: ID of pet that needs to be fetched
          required: true
          schema:
            type: integer
            format: int64
            minimum: 1
            maximum: 10
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/Order'
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '400':
          description: Invalid ID supplied
        '404':
          description: Order not found
    delete:
      tags:
        - store
      summary: Delete purchase order by ID
      description: >-
        For valid response try integer IDs with positive integer value.      
        Negative or non-integer values will generate API errors
      operationId: deleteOrder
      parameters:
        - name: orderId
          in: path
          description: ID of the order that needs to be deleted
          required: true
          schema:
            type: integer
            format: int64
            minimum: 1
      responses:
        '200':
          description: Purchase order deleted
        '400':
          description: Invalid ID supplied
        '404':
          description: Order not found
  /users:
    post:
      tags:
        - user
      summary: Create user
      description: This can only be done by the logged in user.
      operationId: createUser
      responses:
        default:
          description: successful operation
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
        description: Created user object
        required: true
  /users/login:
    get:
      tags:
        - user
      summary: Logs user into the system
      description: ''
      operationId: loginUser
      parameters:
        - name: username
          in: query
          description: The user name for login
          required: true
          schema:
            type: string
        - name: password
          in: query
          description: The password for login in clear text
          required: true
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          headers:
            X-Rate-Limit:
              description: calls per hour allowed by the user
              schema:
                type: integer
                format: int32
            X-Expires-After:
              description: date in UTC when token expires
              schema:
                type: string
                format: date-time
          content:
            application/xml:
              schema:
                type: string
            application/json:
              schema:
                type: string
        '400':
          description: Invalid username/password supplied
  /users/logout:
    get:
      tags:
        - user
      summary: Logs out current logged in user session
      description: ''
      operationId: logoutUser
      responses:
        default:
          description: successful operation
  '/users/{username}':
    get:
      tags:
        - user
      summary: Get user by user name
      description: ''
      operationId: getUserByName
      parameters:
        - name: username
          in: path
          description: 'The name that needs to be fetched. Use user1 for testing. '
          required: true
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/User'
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Invalid username supplied
        '404':
          description: User not found
    put:
      tags:
        - user
      summary: Updated user
      description: This can only be done by the logged in user.
      operationId: updateUser
      parameters:
        - name: username
          in: path
          description: name that need to be updated
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User updated
        '400':
          description: Invalid user supplied
        '404':
          description: User not found
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
        description: Updated user object
        required: true
    delete:
      tags:
        - user
      summary: Delete user
      description: This can only be done by the logged in user.
      operationId: deleteUser
      parameters:
        - name: username
          in: path
          description: The name that needs to be deleted
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User deleted
        '400':
          description: Invalid username supplied
        '404':
          description: User not found
externalDocs:
  description: Find out more
  url: 'https://niis.org'
servers:
  - url: 'https://petstore.niis.org/v2'
  - url: 'http://petstore.niis.org/v2'
components:
  requestBodies:
    UserArray:
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: '#/components/schemas/User'
      description: List of user object
      required: true
    Pet:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Pet'
        application/xml:
          schema:
            $ref: '#/components/schemas/Pet'
      description: Pet object that needs to be added to the store
      required: true
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: 'http://petstore.niis.org/oauth/dialog'
          scopes:
            'write:pets': modify pets in your account
            'read:pets': read your pets
    api_key:
      type: apiKey
      name: api_key
      in: header
  schemas:
    Order:
      type: object
      properties:
        id:
          type: integer
          format: int64
        petId:
          type: integer
          format: int64
        quantity:
          type: integer
          format: int32
        shipDate:
          type: string
          format: date-time
        status:
          type: string
          description: Order Status
          enum:
            - placed
            - approved
            - delivered
        complete:
          type: boolean
          default: false
      xml:
        name: Order
    Category:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
      xml:
        name: Category
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
        username:
          type: string
        firstName:
          type: string
        lastName:
          type: string
        email:
          type: string
        password:
          type: string
        phone:
          type: string
        userStatus:
          type: integer
          format: int32
          description: User Status
      xml:
        name: User
    Tag:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
      xml:
        name: Tag
    Pet:
      type: object
      required:
        - name
        - photoUrls
      properties:
        id:
          type: integer
          format: int64
        category:
          $ref: '#/components/schemas/Category'
        name:
          type: string
          example: doggie
        photoUrls:
          type: array
          xml:
            name: photoUrl
            wrapped: true
          items:
            type: string
        tags:
          type: array
          xml:
            name: tag
            wrapped: true
          items:
            $ref: '#/components/schemas/Tag'
        status:
          type: string
          description: pet status in the store
          enum:
            - available
            - pending
            - sold
      xml:
        name: Pet
    ApiResponse:
      type: object
      properties:
        code:
          type: integer
          format: int32
        type:
          type: string
        message:
          type: string
```

## 14.3 Annex B Service Descriptions for REST Metadata Services <a href="#docs-internal-guid-8bdb7cf5-7fff-0487-b32b-ae6dad2a0a66" id="docs-internal-guid-8bdb7cf5-7fff-0487-b32b-ae6dad2a0a66"></a>

See [https://app.swaggerhub.com/apis/GovStack/gov-stack\_im\_service\_metadata\_api/0.3](https://app.swaggerhub.com/apis/GovStack/gov-stack\_im\_service\_metadata\_api/0.3)

## 14.4 Annex C Example Meta Messages <a href="#docs-internal-guid-edbc180c-7fff-51f9-9e82-a890d25ccc19" id="docs-internal-guid-edbc180c-7fff-51f9-9e82-a890d25ccc19"></a>

### 14.4.1 listMethods Response <a href="#docs-internal-guid-7cca54ab-7fff-8005-873d-63e22956144b" id="docs-internal-guid-7cca54ab-7fff-8005-873d-63e22956144b"></a>

```
curl -H "accept: application/json" -H "X-GovStack-Client:INSTANCE/CLASS1/MEMBER1/APPLICATION1" "https://SECURITYSERVER:443/r1/INSTANCE/CLASS2/MEMBER2/APPLICATION2/listMethods"
{
    "service": [
        {
            "member_class": "CLASS2",
            "member_code": "MEMBER2",
            "object_type": "SERVICE",
            "service_code": "payloadgen",
            "application_code": "APPLICATION2",
            "GovStack_instance": "INSTANCE"
        },
        {
            "member_class": "CLASS2",
            "member_code": "MEMBER2",
            "object_type": "SERVICE",
            "service_code": "kore",
            "application_code": "APPLICATION2",
            "GovStack_instance": "INSTANCE"
        }
    ]
}
```

### 14.4.2 allowedMethods Response

```
curl -H "accept: application/json" -H "X-GovStack-Client:INSTANCE/CLASS1/MEMBER1/APPLICATION1" "https://SECURITYSERVER:443/r1/INSTANCE/CLASS2/MEMBER2/APPLICATION2/allowedMethods"

{
    "service": [
        {
            "member_class": "CLASS2",
            "member_code": "MEMBER2",
            "object_type": "SERVICE",
            "service_code": "payloadgen",
            "application_code": "APPLICATION2",
            "GovStack_instance": "INSTANCE"
        }
    ]
}
```

### 14.4.3 getOpenAPI Response

```
curl -H "accept: application/json" -H "X-GovStack-Client:INSTANCE/CLASS1/MEMBER1/APPLICATION1" "https://SECURITYSERVER:443/r1/INSTANCE/CLASS2/MEMBER2/APPLICATION2/getOpenAPI?serviceCode=listFirms"

openapi: "3.0.0"
info:
  version: 1.0.0
  title: Firm listing
servers:
  - url: https://example.com
paths:
  /firms:
    get:
      summary: List all firms
      operationId: listFirms
      tags:
        - firms
      parameters:
        - name: limit
          in: query
          description: How many items to return at one time (max 100)
          required: false
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: A paged array of firms
          headers:
            x-next:
              description: A link to the next page of responses
              schema:
                type: string
          content:
            application/json:    
              schema:
                $ref: "#/components/schemas/Firms"
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
components:
  schemas:
    Firm:
      required:
        - id
        - name
        - size
        - country
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Firms:
      type: array
      items:
        $ref: "#/components/schemas/Firm"
    Error:
      required:
        - code
        - message
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
```
