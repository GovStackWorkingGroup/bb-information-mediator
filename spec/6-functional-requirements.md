---
description: This section lists the technical capabilities of this Building Block.
---

# 6 Functional Requirements

The functional requirements section lists the technical capabilities that this Building Block should have. These requirements should be sufficient to deliver all functionality that is listed in the [Key Digital Functionalities](4-key-digital-functionalities.md) section.

These functional requirements do not define specific APIs, they provide a list of information about functionality that must be implemented within the Building Block.

## **6.1 Service Access Layer**

![(github repo / image - link)](.gitbook/assets/j2.png)

### **6.1.1 Administrative Interface**

1. There must be an administrative portal that allows an Information Mediator administrator (with appropriate authentication) to register/deregister members, applications, and services.
   * Open IAM (or another Identity and Access Management Solution) must be able to create/edit/delete admin users for the Information Mediator interface.
     * [Security Building Block specification 1.0.1 section 6-1](https://govstack.gitbook.io/specification/security-requirements/6-security-building-block-modules).
2. There must be a security-server-level interface that allows an administrator for a single security server to manage members, applications, and services that live under a single security server.

### **6.1.2 Administrative User Roles**

1. There must be different types of administrative roles that provide different levels of access:
   * System Administrator: is responsible for the installation, configuration, and maintenance of the Building Block.
   * Service Administrator: determine which services are available and what are the access rights.
   * Security officer: must be able to manage key settings, keys, and certificates.
   * Registration Officer: registration/removal of members/applications.
   * Pub/Sub manager: must be able to manually add/remove Pub/Sub subscriptions and manage Pub/Sub event “types” (with associated formats/standards).
   * Observer: can view the status of the security server without having access rights to edit the configuration.

### **6.1.3 Registration**

1. Registering a member/organization requires:
   * That the new member provides:
     * Organization Name (entity that may provide or consume services of Information Mediator Building Block or its member applications)
     * Certificate of member/organization signing key issued by Certificate Authority (CA) which is trusted by the state (e.g., In Estonia, the “Estonian CA” keeps a list of valid certificates).
     * Access to signing key (Hardware Security Module or Token storing a private key).
     * The public IP address of this security server.
   * That the administrator verifies and accepts the request for registration.
2. Registering an application (All applications have their own Transport Layer Security certificate) requires:
   * That the new member provides:
     * Application Name.
     * Certificate of transport key of an application (all subsequent requests will use the private key associated with this certificate to secure connection.
     * N.B. when configuring the application to interact with the Information Mediator, the public certificate of the Information Mediator (which is made available) must be added to a list of known/trusted certificates of the application.
   * That the administrator verifies and accepts the request for registration.
3. Registering a service requires (in terms of API endpoints):
   * That the owner of the application provides:
     * OpenAPI 3.0 specification document (i.e., includes base paths like “/api/patients”, “/api/visits”, etc.).
     * Description.
     * List of enabled endpoints of OpenAPI specifications (the requirement is that we can enable/disable endpoints).
4. Managing a list of allowed consumers for services requires:
   * Application developers MAY access the directory service (described below) to select the services that they want to consume.
   * The request/approval/addition of allowed consumers process is a business-first process with manual steps (The hard part is negotiating data sharing agreements and signing contracts when that is completed the Information Mediator administrator can easily modify the allowed consumers' list manually).
   * An application must specify which member/application/service they want to access.
   * The provider of that service must decide if the consumer is allowed to.
   * Once approved, the requesting application will be added to the list of allowed applications for the requested service.
     * The list of consuming applications may change.
     * When the service is first designed and made available, there may be no consumers on the access list.
     * When a consumer decides that they want to access a service, if it is determined allowable they must be added to this list.

### **6.1.4 Accessing Services**

1. To make a request to another service via the Information Mediator, an application **MUST**:
   * Using REST, make a valid HTTPS request to the local Information Mediator security server with headers that identifies itself at the application level.
   *   The components of the request must be:

       * [ ] Security server URL;
       * [ ] API version;
       * [ ] Instance (e.g., Country);
       * [ ] Domain of member;
       * [ ] Member (e.g., Ministry of X);
       * [ ] Application;
       * [ ] Service (OpenAPI file);
       *   [ ] Path

           * Endpoint.
           * Query parameters.

           ***

       **Example Only:**\
       _Sample GET Request:_\
       <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/ministry-of-agriculture-karnataka</mark>/<mark style="background-color:green;">market-linkages-app</mark>/<mark style="background-color:red;">inventory-service</mark>/v1/<mark style="background-color:yellow;">check-level/apples?fresh=true</mark>\
       _Response_: { data: 7 }\
       \
       _Sample POST Request:_\
       <mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">PVT/tata-buyers-corp-karnataka</mark>/<mark style="background-color:green;">small-farmer-buyers-app</mark>/<mark style="background-color:red;">inventory-service</mark>/v1/<mark style="background-color:yellow;">supply/apples</mark>\
       _With body_: {“qtyAvailable”: 4}\
       _Response_: { result: “Stock level report created.” }\
       \
       _How to interpret the above request paths:_\
       <mark style="background-color:purple;">SECURITY-SERVER-URL</mark>/r1/<mark style="background-color:orange;">INSTANCE</mark>/<mark style="background-color:blue;">DOMAIN/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:red;">SERVICE</mark>/<mark style="background-color:yellow;">PATH</mark>
   * Note that all applications are making requests to the security server, which runs on their own network, rather than making requests to other applications directly over the public internet. (This is one of the main points of the security server and Information Mediator architecture.)
2. The Information Mediator signs & sends the request from application A to the security server for application B.
   * Replace: “<mark style="background-color:purple;">url-of-local-information-mediator-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>” `with “https://api.moh.kn.in/security-server`”, for example.
   * The payload includes: /<mark style="background-color:blue;">GOV/ministry-of-agriculture-karnataka</mark>/<mark style="background-color:green;">market-linkages-app</mark>/<mark style="background-color:red;">inventory-service</mark>/v1/<mark style="background-color:yellow;">check-level/apples?fresh=true</mark>
3. Security server for application B receives the request and validates the signature then forwards it to the application/service/endpoint.
4. The application/service/endpoint responds to this GET with { “status”: 200, “body”: { “apples”: 47 } }
5. Security server for application B signs the response and sends it back to the security server for application A.
6. Security server for application A validates the signature and forwards the response to application A.
7. Note that this is all synchronous. Application A’s GET request is open/unresponded-to until step 6.

### **6.1.5 Directory Service**

1. At development time, to see which organizations are available on GovStack, the administrator of application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-security-server</mark>/<mark style="background-color:yellow;">listClients</mark>\[?instanceId=<mark style="background-color:orange;">INDIA</mark>]
   * Response is an array of organizations with descriptions.
   * Parameter instanceId is needed only if a federated GovStack ecosystem is requested.
2. At development time, to learn which applications are available, the administrator/developer at application A sends a GET request to the security server <mark style="background-color:purple;">url-of-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">{listMethods || allowedMethods}</mark>
   * Response is an array of services (either all services, or services that the requester is authorized to access via “allowedMethods”).
3. At development time, to learn about an available service, administrator at application A sends a GET request to the security server: <mark style="background-color:purple;">url-of-security-server</mark>/r1/<mark style="background-color:orange;">INDIA</mark>/<mark style="background-color:blue;">GOV/MEMBER</mark>/<mark style="background-color:green;">APPLICATION</mark>/<mark style="background-color:yellow;">getOpenApi</mark>?serviceCode=<mark style="background-color:red;">SERVICE</mark>
   * Response is an OpenAPI specification, detailing the endpoints and requirements for that service/API.
4. A view layer allowing for easy exploration of ALL clients, applications, and services should be provided. (Note that, “under the hood”, this layer may make use of the APIs described above or be implemented via a separate API.)

## 6.2 Pub/Sub Layer

Any implementation of a Pub/Sub layer is subjective, it will contain required shapes for requests and specific endpoints provided by the application implementing the Pub/Sub functionality. The requirements below do not prescribe a specific implementation, rather they outline the required functionality that may be implemented in a number of common ways.

### 6.2.1 Adherence to Key Concepts

1. The Publisher does not know about Subscribers (but the Room does know).
2. Events of the same type can be generated by different producers.
3. The Subscriber does not know about Producers.
   * There was a previous concern that the disconnect between producer and consumer would lead to legal issues (specifically, that authority or “blame” could not be allocated when one had to validate the origin of a particular event).
   * This has been addressed with “rooms”. For example, the room containing the “birth” event type is the responsibility of the Ministry of Health (MoH), and the MoH is responsible for ensuring that all “birth event” producers and all “birth event” subscribers are valid.
   * So, if you care about “birth events”, they may be sourced from lots of different hospitals/clinics/mobile apps, but their validation and distribution are now the sole responsibility of the MoH. (I.e., You can trust the MoH to ensure the provenance of a birth event.)
4. The Room is responsible for the event lifecycle.

### 6.2.2 Facilitating Publish/Subscribe

1. The Room publishes event types and sets up a GovStack service for accepting events of this type; in general, a single room might host multiple event types. Depending on the need, an implementation may also allocate each Room for a specific event type, if it helps separate subscribers. E.g. in India, "The Ministry Of Home Affairs" can be the "Owner" of a Room where events of type "emergency" are published by "citizens" or "entities" and entities such as "ambulance services", "Fire-fighting services", Hospitals, etc., can be Subscribers to this Room. In this scenario, an event of type "Fire emergency" can be published by any citizen enrolled in this Room. The Ministry can choose to have one "emergency" Room in each town and enroll Subscribers relevant to respective regions.
2. Publishers and Subscribers discover available Rooms and event types.
3. The Subscriber requests that events of certain types be delivered to them.
4. The Subscriber specifies the desired delivery mode (push/pull). The Room and Subscriber conclude the delivery contract. Note that:
   * push delivery mode is when the Room sends events via webhook to the Subscriber’s API.
   * pull delivery mode (optional) means that the Room keeps a queue of events and the Subscriber can check that queue.
5. At a minimum, this Building Block should provide for a push delivery mode. It may also provide a pull mode based on convenience.
6. The Publisher and the Room have a data access contract to establish trust for accessing information.
   * This is akin to the standard trust contract in the Information Mediator, the consumer must have rights to access a certain API.
   * Publishers have to sign a contract with the Room owner’s consent to gain access to specific Rooms and events. In the contract, Publishers declare what type of message will be published in a given Room.
7. The Publisher generates an event:
   * The Publisher makes a POST call to the Room service of a particular event type.
   * The Room stores the event and replies with the event id (e.g. Universally Unique IDentifier). Event id is generated by Room or is taken from the original event dataset if provided by the publisher.
   * The Room sends an immediate acknowledgement to the Publisher.
8. The Room distributes an event as follows:
   * A reference to publisher and event id is added to the event dataset.
   * For each Subscriber:
     * (alt) If the mode is ‘push’, make a POST call to Subscriber GovStack service of the event type;
     * (alt) If the mode is ‘pull’, enqueue an event for request from the Subscriber;
       * There is a queue of events waiting to be processed per the Subscriber, such that the Subscriber might periodically check to see events waiting in their own queue, process those events, and clear the queue.
       * A pull mechanism is essential for resilience to network dropouts and traffic load balance at servers and for differentiating urgent/emergency events from normal events (this can be decided during implementation).
9. (opt - if mode is PULL) The Subscriber pulls an event:
   * The Subscriber makes a GET call to the Room service of the particular event type.
10. (opt) The Subscriber requests event details. Some event details may have more restricted regulations for handling and may be not included in event type. In this case, the Subscriber requests these details directly from the publisher by making a GET call to the referenced Publisher with event id as a parameter.
    * This call implies the existence of an associated contract between the Subscriber and the Publisher.
11. The Information Mediator Building Block creates a log of all messages published and distributed.
12. This necessitates three endpoints to be declared per event type Pub/Sub instance:
    * an endpoint URI to be registered by every Subscriber on a per-event type basis.
    * (optional) an endpoint URI on the Pub/Sub where all pull requests come from various Subscribers.
    * an endpoint in the Room to send messages for publication.
13. An enrollment process of Subscribers and Publishers should capture these details.
14. If an event payload is very large, then it is recommended to just publish the "event" and let Subscribers get full details directly from the Publishers as needed. It will simplify event payloads, reduce Turnaround time (TAT), storage, and bandwidth significantly.

### 6.2.3 Defining Message Types

1. Pub/Sub requires global agreement on event/message “types” (e.g., “newPatient” or “paymentCreated”) and the Pub/Sub layer must provide a mechanism for registering event types.
2. For each event type, a JSON schema for the required payload shape must be defined to facilitate the consumption of those events.
3. An interface for registering and viewing event types must be provided.

### **6.2.4 Broadcasting a Message**

An application must be able to make a POST request with a valid JSON payload as the body (see below) and specify the message type to a Room provided by the Pub/Sub layer service.

### 6.2.5 Maintaining and Displaying Message Logs

1. All broadcast messages and deliveries/delivery statuses must be added to log.
2. There must be a possibility to search and view status of messages, for example, a message with type X and from seven subscribers message had been successfully delivered to all seven.

### 6.2.6 Retrying Messages

1. Published messages SHOULD be stored so that delivery may be retried if certain Subscribers are offline.
   * Subscribers should be able to configure their retry strategies, overriding the default exponential backoff on retriable errors. ([Google Pub/Sub example](https://cloud.google.com/pubsub/docs/handling-failures))
2. If an active subscription exists but a 502 response is received when forwarding a message to that service, the Pub/Sub layer SHOULD retry N times with a standard backoff. (An exponential backoff may be the default approach.)
   * The backoff and retry strategy SHOULD be configurable by an administrator with access to the Pub/Sub layer application.
3. If a message cannot be delivered the Pub/Sub layer SHOULD drop that message.

### 6.2.7 Registering/Updating/Deleting a Subscription

1. The Pub/Sub layer should provide an admin user interface to help create/manage subscriptions with the data below.
2. The Pub/Sub layer should allow an administrator to view a list of active subscriptions.
3. For registration via API, an application must be able to make a POST request to a service exposed by the Pub/Sub layer which defines which endpoints certain event types should be sent to.
4. For services that provide an OpenAPI v3 webhooks specification, the Pub/Sub layer should be able to create necessary webhooks on those applications via API.
5. See below for a JSON description of the active subscriptions for an application.

```json
{
  securityServer: nk888,
  member: "112 (Ministry of Public Engagement) hl7-2.5",
  application: 'Patient Portal', // WHO I AM…
  subscriptions: [ // AND WHAT I WANT TO BE NOTIFIED ABOUT…
    { type: "newPatient", service: '/openfn/inbox/uuid' },
    { type: "newMedication", service: '/api/approvedMedsListing' },
  ]
}
```

### 6.2.8 Message Receipt/Delivery Logging and Audit Trail Generation

1. All events received and delivered MUST have a unique ID.
2. All events received by the Pub/Sub layer MUST be logged or added to a log sync and those log entries MUST contain event metadata including the sender, timestamp, and event type, but MAY not include the event payload.
3. All event delivery attempts MUST be logged or added to a log sync.
4. For every event message received, the Information Mediator sends back an acknowledgement with the ID of event to the respective Publisher.

#### 6.2.9 Understanding Rooms

To understand Rooms, consider the following example: If the "birth" event type is the responsibility of the MoH, then the MoH is responsible for the Room containing the “birth” event type. Also, if MoH is running an instance of a security server on their infrastructure, they are also now running an instance of the Room software (for "birth", "sickness", and "visit" event types) behind that security server. There could be multiple Rooms under a single owner, and each Room might hold multiple event types. This gives the “owner” of an “event type” the authority to decide exactly who is allowed to publish events of that type and who is allowed to subscribe to events of that type.

![https://lucid.app/lucidspark/ae9dba58-c15d-43b2-b8ef-9d15f6bd746c/edit - The above diagram shows push delivery mode.](.gitbook/assets/dfgfdcv.png)

Note how in the above diagram, “Ambulance-B” is an Information Mediator Building Block “member” that has subscribed its “Ambulance System B” REST service (/api/some-service) to “fire” events in the “State Emergency Room”.

### 6.3 Logging

1. The Information Mediator Building Block maintains a message log.
   * The purpose of the message log is to provide means to prove the reception of a regular request or response message to a third party. Messages exchanged between Information Mediator Building Block are signed and encrypted. For every regular request and response, the security server produces a completely signed, and timestamped document. At a minimum, the log must store metadata that identifies a specific message, the status of transaction carried out on that message by Information Mediator Building Block, along with source ID and date time stamp.
2. The Information Mediator Building Block has full audit trail capabilities.
   * The Information Mediator Building Block keeps an audit log. The audit log events are generated by the user interface when the administrator changes the system's state or configuration. The administrator's actions are logged regardless of whether the outcome was a success or a failure. The system must be capable of emitting statistical reports for a given organization, application, service, or consumer and status.

### 6.4 Monitoring

1. Operational monitoring
   * Operational monitoring provides details about the requested exchange, such as the ID-s of the client and the service, various attributes of the message read from the message header, request and response timestamps, sizes, etc., but not the actual payload of messages.
   * The operational monitoring daemon collects and shares operational monitoring data of the Information Mediator Building Block as part of request exchange, shares this data, and calculates and shares health statistics (the timestamps and the number of successful/unsuccessful requests, various metrics of the duration and message size of the requests, etc.).
   * The operational monitoring daemon makes operational and health data available to the owner of the security server, regular clients, and the central monitoring client via the security server. (For example, local health data may be made available for external monitoring systems.)
   * The owner of the security server and the central monitoring client are able to query the records of all clients. For a regular client, only the records associated with that client are available.
2. Environmental monitoring
   * Environmental monitoring provides details of the security servers such as operating system, memory, disk space, CPU load, traffic load, running processes, installed packages, etc. in a chosen date range.
   * Environmental monitoring provides a standard endpoint that can be accessed with a client (e.g. Java's console application if using Java Management Extensions).
   * It is possible to limit what allowed non-owners can request via environmental monitoring data requests. The security server owner will always get the full data set as requested.

## 6.5 Scaling/Throughput

1. The  Information Mediator Building Block supports provider-side high availability setup via a so-called internal load balancing mechanism. The setup works so that the same member/member class/member code/application/service code is configured on multiple security servers and the Information Mediator Building Block will then route the request to the server that responds the fastest.
2. Busy production systems may need a scalable performance in addition to high availability. The Information Mediator Building Block supports external load balancing mechanisms to address both of these problems simultaneously. A load balancer is added in front of a security server cluster to route the requests based on a selected algorithm.
3. The team in charge of deploying the security server application on their hardware must consider the network infrastructure including a load balancer, etc. The requirements for network infrastructure must be handled/defined in a (yet to exist) “Network Building Block”.
