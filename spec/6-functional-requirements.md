---
description: This section lists the technical capabilities of this Building Block.
---

# 6 Functional Requirements

The functional requirements section lists the technical capabilities that this Building Block should have. These requirements should be sufficient to deliver all functionality that is listed in the [Key Digital Functionalities](4-key-digital-functionalities.md) section. The Information Mediator is used only for interaction between Applications/Building Blocks for the transfer of data at an API level only. Details in the [Architecture and Nonfunctional Requirements document](https://govstack.gitbook.io/specification/v/1.0/architecture-and-nonfunctional-requirements/6-onboarding).

These functional requirements do not define specific APIs, they provide a list of information about functionality that must be implemented within the Building Block. Detailed design and feature lists of these blocks can be customized by developers to optimally match specific target implementation needs.

## **6.1** Service Access

#### **6.1.1 Administrative Interface**

* There should be different types of administrative roles that provide different levels of access (RECOMMENDED)
* There should be administrative roles on different levels of the ecosystem (RECOMMENDED):
  * global administrator role of the whole ecosystem,
  * local administrator role of Member,
  * an administrative role for configuring an Application.
* There should be an ecosystem-level administrative interface that allows an Information Mediator administrator (with appropriate authentication) to register/deregister members and applications (RECOMMENDED)
* There should be a security-server-level interface that allows an administrator for a single security server to manage members, applications, and services that live under a single security server (RECOMMENDED)
* Open IAM (or another Identity and Access Management Solution) must be able to create/edit/delete admin users for the Information Mediator interface. [Security Building Block specification 1.0.1 section 6-1](https://govstack.gitbook.io/specification/v/1.0/security-requirements/6-security-building-block-modules) (REQUIRED)

#### **6.1.2 Registration** (REQUIRED)

* Registering a member/organization requires:
  * That the new member provides details for registration.
  * That the administrator verifies and accepts the request for registration.
* Registering an application requires:
  * That the new member provides details for registration.
  * That the administrator verifies and accepts the request for registration.
* Registering a service requires (in terms of API endpoints):
  * That the owner of the application provides:
    * OpenAPI 3.0 specification document (i.e., includes base paths like “/api/patients”, “/api/visits”, etc.).
    * Description.
    * List of enabled endpoints of OpenAPI specifications (the requirement is ability to enable and/or disable endpoints).
* Managing a list of allowed consumers for services requires:
  * Application developers may access the directory service (described below) to select the services that they want to consume (RECOMMENDED)
  * The request/approval/addition of allowed consumers process is a business-first process with manual steps. The hard part here is negotiating data sharing agreements and signing contracts. When that is completed, the Information Mediator administrator can easily modify the allowed list of consumers manually.
  * An application must specify which member/application/service they want to access
  * The provider of that service must decide if the consumer is allowed to access the service
  * Once approved, the requesting application will be added to the list of allowed applications for the requested service

#### **6.1.3 Accessing Services**

* To make a request to another service via the Information Mediator, an application must(REQUIRED):
  * Using REST, make a valid HTTPS request to the local Information Mediator security server with headers that identifies itself at the application level.
  *   The components of the request must be (with color code):

      * <mark style="background-color:purple;">Security server URL</mark>;
      * API version;
      * <mark style="background-color:orange;">Instance (e.g., Country)</mark>;
      * <mark style="background-color:blue;">Domain of member</mark>;
      * <mark style="background-color:blue;">Member (e.g., Ministry of X)</mark>;
      * <mark style="background-color:green;">Application</mark>;
      * <mark style="background-color:red;">Service (OpenAPI file)</mark>;
      * <mark style="background-color:yellow;">Path</mark>
        * <mark style="background-color:yellow;">Endpoint</mark>.
        * <mark style="background-color:yellow;">Query parameters</mark>.

      **Example Only**\
      &#xNAN;_&#x53;ample GET Request:_\
      <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/ministry-of-agriculture-karnataka</mark>/<mark style="background-color:green;">market-linkages-app</mark>/<mark style="background-color:red;">inventory-service</mark>/v1/<mark style="background-color:yellow;">check-level/apples?fresh=true</mark>\
      &#xNAN;_&#x52;esponse_: { data: 7 }\
      \
      &#xNAN;_&#x53;ample POST Request:_\
      <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">PVT/tata-buyers-corp-karnataka</mark>/<mark style="background-color:green;">small-farmer-buyers-app</mark>/<mark style="background-color:red;">inventory-service</mark>/v1/<mark style="background-color:yellow;">supply/apples</mark>\
      &#xNAN;_&#x57;ith body_: {“qtyAvailable”: 4}\
      &#xNAN;_&#x52;esponse_: { result: “Stock level report created.” }\
      \
      &#xNAN;_&#x48;ow to interpret the above request paths:_\
      <mark style="background-color:purple;">SECURITY-SERVER-URL</mark>/r1/<mark style="background-color:orange;">INSTANCE</mark>/<mark style="background-color:blue;">DOMAIN/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:red;">SERVICE</mark>/<mark style="background-color:yellow;">PATH</mark>
  * Note that all applications are making requests to the security server, which runs over the private network segment, rather than making requests to other applications directly over the public internet. (This is one of the main points of the security server and Information Mediator architecture.)

## 6.2 Directory Services

* At development time, to see which resources are available on GovStack, the administrator/developer of application A may send requests to the security server to see(OPTIONAL):
  * organizations with descriptions;
  * services (either all services, or services that the requester is authorized to access);
  * an OpenAPI specification, detailing the endpoints and requirements for the service/API.
* A view layer allowing for easy exploration of ALL clients, applications, and services should be provided. (Note that, “under the hood”, this layer may make use of the APIs described above or be implemented via a separate API.)(RECOMMENDED)

## 6.3 Pub/Sub Service <a href="#id-6.3-pubsub-service" id="id-6.3-pubsub-service"></a>

#### 6.3.1 Defining Rooms and Event Types

* The Pub/Sub layer must provide a mechanism for registering Rooms (REQUIRED)
* The Pub/Sub layer must provide a mechanism for registering event types (REQUIRED)
* For each event type, an OpenAPI description of a service with JSON schema for the required payload shape must be defined to create an event of the type (REQUIRED)
* An interface for registering and viewing event types must be provided (REQUIRED)

#### **6.3.2 Publishing a Message**

* An application must be able to make a POST request with a valid JSON payload as the body and specify the message type to a Room provided by the Pub/Sub layer service (REQUIRED)

#### 6.3.3 Delivering Messages

* Published messages should be delivered to all subscribers (RECOMMENDED)
* Published messages should be stored so that delivery may be done and retried asynchronously, e.g. if certain Subscribers are offline (RECOMMENDED)
  * Subscribers should be able to configure their retry strategies, overriding the default exponential backoff on retriable errors ([Google Pub/Sub example](https://cloud.google.com/pubsub/docs/handling-failures))
* If an active subscription exists but an error is received when forwarding a message to that service, the Pub/Sub layer should retry N times with a standard backoff. (An exponential backoff may be the default approach.) (RECOMMENDED)
  * The backoff and retry strategy should be configurable by an administrator with access to the Pub/Sub layer application
* If a message cannot be delivered the Pub/Sub layer should drop that message (RECOMMENDED)

#### 6.3.4 Managing Subscriptions

* The Pub/Sub layer should provide an admin user interface to help create/manage subscriptions with the data below (RECOMMENDED)
* The Pub/Sub layer should allow an administrator to view a list of active subscriptions (RECOMMENDED)
* For registration via API, an application must be able to make a POST request to a service exposed by the Pub/Sub layer which defines which endpoints certain event types should be sent to (REQUIRED)

#### 6.3.5 Event Logging and Audit Trail Generation

* All events received and delivered must have a unique ID (REQUIRED)
* All events received by the Pub/Sub layer must be logged or added to a log sync and those log entries must contain event metadata including the sender, timestamp, and event type, but may not include the event payload (REQUIRED)
* All event delivery attempts must be logged or added to a log sync (REQUIRED)
* For every event message received, the Information Mediator sends back an acknowledgment with the ID of the event to the respective Publisher (REQUIRED)
* There must be a possibility to search and view the status of messages, for example, a message with type X to seven subscribers had been successfully delivered to all seven (REQUIRED)

## 6.4 Logging Services

* The Information Mediator Building Block maintains a message log (REQUIRED)
  * The purpose of the message log is to provide means to prove the reception of a regular request or response message to a third party. Messages exchanged between Information Mediator Building Block are signed and encrypted. For every regular request and response, the security server produces a completely signed, and timestamped document. At a minimum, the log must store metadata that identifies a specific message, the status of transaction carried out on that message by Information Mediator Building Block, along with source ID and date time stamp.
* The Information Mediator Building Block has full audit trail capabilities (REQUIRED)
  * The Information Mediator Building Block keeps an audit log. The audit log events are generated by the user interface when the administrator changes the system's state or configuration. The administrator's actions are logged regardless of whether the outcome was a success or a failure. The system must be capable of emitting statistical reports for a given organization, application, service, or consumer and status.

## 6.5 Monitoring Services

* Operational monitoring (REQUIRED)
  * Operational monitoring provides details about the requested exchange, such as the ID-s of the client and the service, various attributes of the message read from the message header, request and response timestamps, sizes, etc., but not the actual payload of messages.
  * The operational monitoring daemon collects and shares operational monitoring data of the Information Mediator Building Block as part of request exchange, shares this data, and calculates and shares health statistics (the timestamps and the number of successful/unsuccessful requests, various metrics of the duration and message size of the requests, etc.).
  * The operational monitoring daemon makes operational and health data available to the owner of the security server, regular clients, and the central monitoring client via the security server. (For example, local health data may be made available for external monitoring systems.)
  * The owner of the security server and the central monitoring client are able to query the records of all clients. For a regular client, only the records associated with that client are available.
* Environmental monitoring (REQUIRED)
  * Environmental monitoring provides details of the security servers such as operating system, memory, disk space, CPU load, traffic load, running processes, installed packages, etc. in a chosen date range.
  * Environmental monitoring provides a standard endpoint that can be accessed with a client (e.g. Java's console application if using Java Management Extensions).
  * It is possible to limit what allowed non-owners can request via environmental monitoring data requests. The security server owner will always get the full data set as requested.

## 6.6 Scaling/Throughput Services

* The Information Mediator Building Block should support provider-side high availability setup if needed (RECOMMENDED)
* Busy production systems may need a scalable performance in addition to high availability. The Information Mediator Building Block supports external load balancing mechanisms to address both of these problems simultaneously. A load balancer is added in front of a security server cluster to route the requests based on a selected algorithm (OPTIONAL)
* The team in charge of deploying the security server application on their hardware must consider the network infrastructure including a load balancer, etc. The requirements for network infrastructure must be handled/defined in a (yet to exist) “Network Building Block”(REQUIRED)
