# 6 Functional Requirements

The functional requirements section lists the technical capabilities that this building block should have. These requirements should be sufficient to deliver all functionality that is listed in the [Key Digital Functionalities](4-key-digital-functionalities.md) section.&#x20;

These functional requirements do not define specific APIs - they provide a list of information about functionality that must be implemented within the building block.

## **6.1 Service Access Layer**

![ (github repo / image - link)](.gitbook/assets/j2.png)

### **6.1.1 Administrative Interface**

* There must be an administrative portal that allows an IM administrator (with appropriate authentication) to register/deregister members, applications, and services.
  * OpenIAM (or other IAM solution) must be able to create/edit/delete admin users for the IM interface.
    * [Security BB Spec 1.0.1 section 6-1](../security-requirements/6-security-building-block-modules.md)
  * There must be a security-server level interface that allows an administrator for a single security server to manage members, applications, and services that live under a single security server.

### **6.1.2 Administrative User Roles**

* There must be different types of administrative roles which provide different levels of access:
  * System Administrator — is responsible for the installation, configuration, and maintenance of BB
  * Service Administrator — determine which services are available and what are access rights
  * Security officer — must be able to manage key settings, keys, and certificates
  * Registration Officer – registration/removal of members/applications
  * PubSub manager — must be able to manually add/remove PubSub subscriptions and manage PubSub event “types” (with associated formats/standards)

### **6.1.3 Registration**

* Registering a **member/organization** requires:
  * That the new **member** provide:
    * **Organization Name (entity that may provide or consume services of IM** BB or its member applications)
    * Certificate of member/organization signing key issued by Certificate Authority which is trusted by the state (e.g., In Estonia, the “Estonian CA” keeps a list of valid certificates.)
    * Access to signing key (HSM or Token storing a private key)
    * The public IP address of this security server
  * That the administrator verifies and accepts the request for registration.
* Registering an application (All applications have their own TLS certificate) requires:
  * That the new **member** provide:
    * Application Name
    * Certificate of transport key of application (all subsequent requests will use the private key associated with this certificate to secure connection
    * \*\*Note that when configuring the application to interact with the Information Mediator, the public certificate of the Information Mediator (which is made available) must be added to a list of known/trusted certs of application.
  * That the **administrator** verifies and accepts the request for registration.
* Registering a service (**These are the API endpoints**) requires:
  * That the owner of the application provide:
  * OpenAPI 3.0 specification document (see example, includes base paths like “/api/patients”, “/api/visits”, etc.)
  * Description
  * List of enabled endpoints of OpenAPI spec (the requirement is that we can enable/disable endpoints)
* Managing a list of allowed consumers for services requires:
  * Application developers MAY access the directory service (described below) to select the services that they want to consume.
  * The request/approval/addition of allowed consumers process is a business-first process with manual steps. (The hard part is negotiating data sharing agreements and signing contracts, when that is completed the Information Mediator administrator can easily modify the allowed consumers list manually.)
  * An application must specify which member/application/service they want to access.
  * The provider of that service must decide if the consumer is allowed.
  * Once approved, the requesting application will be added to the list of allowed applications for the requested service.
    * The list of consuming applications may change.
    * When the service is first designed and made available, there may be no consumers on the access list.
    * When a consumer decides that they want to access a service, if it is determined allowable they must be added to this list.

### **6.1.4 Accessing Services**

* To make a request to another service via the Information Mediator, an application **MUST**:
  * Using REST, make a valid HTTP request to the local Information Mediator security server with headers which identifies itself at the application level.
  * The components of the request must be:
    * Security server URL
    * API version
    * Instance (e.g., Country)
    * Domain of member
    * Member (e.g., Ministry of X)
    * Application
    * Service (OpenAPI file)
    * Path
      * Endpoint
      * Query parameters\
        **Example Only:**\
        \*\*\*\*\
        \*\*\*\*_Sample GET Request:_\
        \_\_`url-of-local-information-mediator-security-server/r1/INDIA/GOV/ministry-of-agriculture-karnataka/market-linkages-app/inventory-service/v1/check-level/apples?fresh=true`\
        _Response_: { data: 7 }\
        \*\*\*\*\
        \*\*\*\*_Sample POST Request:_\
        \*\*\*\*`url-of-local-information-mediator-security-server/r1/INDIA/PVT/tata-buyers-corp-karnataka/small-farmer-buyers-app/inventory-service/v1/supply/apples`\
        \`\`_With body_: {“qtyAvailable”: 4}\
        _Response_: { result: “Stock level report created.” }\
        \
        _How to interpret the above request paths:_\
        \_\_`SECURITY-SERVER-URL/r1/INSTANCE/DOMAIN/MEMBER/APPLICATION/SERVICE/PATH`
  * Note that all applications are making requests to the security server, which runs on their own network, rather than making requests to other applications directly over the public internet. (This is one of the main points of the security server and Information Mediator architecture.)
* The Information Mediator signs & sends the request from application A to the security server for application B.
  * Replace: “`url-of-local-information-mediator-security-server/r1/INDIA`” `with “https://api.moh.kn.in/security-server`”, for example.
  * The payload includes: `/GOV/ministry-of-agriculture-karnataka/market-linkages-app/inventory-service/v1/check-level/apples?fresh=true`
* Security server for application B receives the request and validates the signature then forwards it to the application/service/endpoint.
* The application/service/endpoint responds to this GET with { “status”: 200, “body”: { “apples”: 47 } }
* Security server for application B signs the response and sends it back to the security server for application A.
* Security server for application A validates signature and forwards response to application A.
* Note that this is all synchronous. Application A’s GET request is open/unresponded-to until step 6.

### **6.1.5 Directory Service**

1. At development time, to see which organizations are available on GovStack, the administrator of application A sends a GET request to the security server: `url-of-security-server/listClients[?instanceId=INDIA]`
   1. Response is an array of organizations with descriptions.
   2. Parameter instanceId is needed only if a federated GovStack ecosystem is requested.
2. At development time, to learn which applications are available, the administrator/developer at application A sends a GET request to the security server `url-of-security-server/r1/INDIA/GOV/MEMBER/APPLICATION/{listMethods || allowedMethods}`
   1. Response is an array of services (either all services, or services that the requester is authorized to access via “allowedMethods”).
3. At development time, to learn about an available service, administrator at application A sends a GET request to the security server: `url-of-security-server/r1/INDIA/GOV/MEMBER/APPLICATION/getOpenApi?serviceCode=SERVICE`
   1. Response is an OpenAPI specification, detailing the endpoints and requirements for that service/API.
4. A view layer allowing for easy exploration of ALL clients, applications, and services should be provided. (Note that, “under the hood”, this layer may make use of the APIs described above or be implemented via a separate API.)

## 6.2 Pub-Sub Layer

Any implementation of a PubSub layer is subjective—it will contain required shapes for requests and specific endpoints provided by the application implementing the PubSub functionality. The requirements below do not prescribe a specific implementation, rather they outline the required functionality that may be implemented in a number of common ways.

### 6.2.1 Adherence to Key Concepts

* The Publisher does not know about Subscribers (but the Room does know.)
* Events of the same type can be generated by different producers.
* The Subscriber does not know about Producers.
  * There was a previous concern that the disconnect between producer and consumer would lead to legal issues (specifically, that authority or “blame” could not be allocated when one had to validate the origin of a particular event).
  * This has been addressed with “rooms”. For example, the room containing the “birth” event type is the responsibility of the Ministry of Health (MoH), and the MoH is responsible for ensuring that all “birth event” producers are valid, and that all “birth event” subscribers are valid.
  * So, if you care about “birth events”, they may be sourced from lots of different hospitals/clinics/mobile-apps, but their validation and distribution is now the sole responsibility of the MoH. (I.e., You can trust the MoH to ensure the provenance of a birth event.)
* The Room is responsible for the event lifecycle.

### 6.2.2 Facilitating Publish/Subscribe

* The Room publishes event types and sets up GovStack service for accepting events of this type; in general, a single room might host multiple event types. Depending on the need, an implementation may also allocate each Room for a specific event type, if it helps separate subscribers. For e.g. in India, "Ministry Of Home Affairs" can be "Owner" of a Room where events of type "emergency" events are published by "citizens" or "entities" and entities such as "ambulance services", "Fire-fighting services", Hospitals, etc., can be Subscribers to this Room. In this scenario, an event of type "Fire emergency" can be published by any citizen enrolled into this Room. The Ministry can choose to have one "emergency" Room in each town, and enroll Subscribers relevant to respective regions.
* Publishers and Subscribers discover available Rooms and event types.
* The Subscriber requests that events of certain types be delivered to them.
* The Subscriber specifies the desired delivery mode (push/pull). The Room and Subscriber conclude the delivery contract. Note that:
  * **push** delivery mode is when the Room sends events via webhook to the Subscriber’s API
  * **pull** delivery mode (optional) means that the Room keeps a queue of events and the Subscriber can check that queue
* At minimum, this BB should provide for a push delivery mode. It may also provide a pull mode based on convenience.
* The Publisher and the Room have a data access contract to establish trust for accessing information.
  * This is akin to the standard trust contract in the Information Mediator—the consumer must have rights to access a certain API.
  * Publishers have to sign a contract with the Room owner’s consent to gain access to specific Rooms and events. In the contract, Publishers declare what type of message will be published in a given Room.
* The Publisher generates an event:
  * The Publisher makes a POST call to the Room service of a particular event type.
  * The Room stores the event and replies with the event id (e.g. uuid). Event id is generated by Room or is taken from the original event dataset if provided by the publisher.
  * The Room sends an immediate acknowledgement to the Publisher.
* The Room distributes an event as follows:
  * A reference to publisher and event id is added in the event dataset.
  * For each Subscriber:
    * (alt) If the mode is ‘push’, make a POST call to Subscriber GovStack service of the event type;
    * (alt) If the mode is ‘pull’, enqueue an event for request from the Subscriber;
      * There is a queue of events waiting to be processed per the Subscriber, such that Subscriber might periodically check to see events waiting in their own queue, process those events, and clear the queue.
      * A pull mechanism is essential for resilience to network dropouts and traffic load balance at servers and differentiating urgent/emergency events from normal events. (This can be decided during implementation. )
* (opt - if mode is PULL) The Subscriber pulls an event:
  * The Subscriber makes a GET call to the Room service of the particular event type.
* (opt) The Subscriber requests event details. Some event details may have more restricted regulations for handling and may be not included in event type. In this case, the Subscriber requests these details directly from the publisher by making a GET call to the referenced Publisher with event id as a parameter.
  * This call implies the existence of an associated contract between the Subscriber and the Publisher.
* The Information Mediator building block creates a log of all messages published and distributed.
* This necessitates three end points to be declared per event type PubSub instance:
  * an endpoint URI to be registered by every Subscriber on a per event type basis.
  * (optional) an endpoint URI on the PubSub where all pull requests come from various Subscribers.
  * an endpoint on the Room to send messages for publication.
* An enrollment process of Subscribers and Publishers should capture these details.
* If an event payload is very large, then it is recommended to just publish the "event" and let Subscribers get full details directly from the Publishers as needed. It will simplify event payloads, reduce TAT, storage and bandwidth significantly.

### 6.2.3 Defining Message Types

* PubSub requires global agreement on event/message “types” (e.g., “newPatient” or “paymentCreated”) and the PubSub layer must provide a mechanism for registering event types.
* For each event type, a JSON schema for the required payload shape must be defined to facilitate consumption of those events.
* An interface for registering and viewing event types must be provided.

### **6.2.4 Broadcasting a Message**

* An application must be able to make a POST request with a valid JSON payload as the body (see below) and specify the message type to a Room provided by the PubSub layer service.

### 6.2.5 Maintaining and Displaying Message Logs

* All broadcast messages and deliveries/delivery statuses must be added to log.
* There must be a possibility to search and view status of messages, for example, a message with type X and from 7 subscribers message had been successfully delivered to all 7.

### 6.2.6 Retrying Messages

* Published messages SHOULD be stored so that delivery may be retried if certain Subscribers are offline.
  * Subscribers should be able to configure their retry strategies, overriding the default exponential backoff on retryable errors. (See Google Pub/Sub for example: [https://cloud.google.com/pubsub/docs/handling-failures](https://cloud.google.com/pubsub/docs/handling-failures))
* If an active subscription exists but a 502 response is received when forwarding a message to that service, the PubSub layer SHOULD retry N times with a standard backoff. (An exponential backoff may be the default approach.)
  * The backoff and retry strategy SHOULD be configurable by an administrator with access to the PubSub layer application.
* If a message cannot be delivered the PubDub layer SHOULD drop that message.

### 6.2.7 Registering/Updating/Deleting a Subscription

* The PubSub layer should provide an admin UI to help create/manage subscriptions with the data below.
* The PubSub layer should allow an administrator to view a list of active subscriptions.
* For registration via API, an application must be able to make a POST request to a service exposed by the PubSub layer which defines which endpoints certain event types should be sent to.
* For services that provide an OpenAPI v3 webhooks specification, the PubSub layer should be able to create necessary webhooks on those applications via API.
* See below for a JSON description of the active subscriptions for an application.

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

* All events received and delivered MUST have a unique ID.
* All events received by the PubSub layer MUST be logged or added to a log sync and those log entries MUST contain event metadata including the sender, timestamp, and event type, but MAY not include the event payload.
* All event delivery attempts MUST be logged or added to a log sync
* For every event message received, the IM sends back an acknowledgement with the ID of event to the respective Publisher

### 6.3 Logging

* The Information Mediator BB maintains a message log.
  * The purpose of the message log is to provide means to prove the reception of a regular request or response message to a third party. Messages exchanged between IM BB are signed and encrypted. For every regular request and response, the security server produces a complete signed and timestamped document. At minimum, the log must store metadata that identifies a specific message, a status of transaction carried out on that message by IM BB, along with source ID and date time stamp.
  * The information Mediator BB has full audit trail capabilities.
    * The Information Mediator BB keeps an audit log. The audit log events are generated by the user interface when the administrator changes the system's state or configuration. The administrator actions are logged regardless of whether the outcome was a success or a failure.The system must be capable of emitting statistical reports for a given organization, application or service or consumer and status.

### 6.4 Monitoring

* Operational monitoring
  * Operational monitoring provides details about the request exchange,such as the ID-s of the client and the service, various attributes of the message read from the message header, request and response timestamps, sizes etc., but not the actual payload of messages.
  * The operational monitoring daemon collects and shares operational monitoring data of the Information Mediator BB as part of request exchange, shares this data, and calculates and shares health statistics (the timestamps and number of successful/unsuccessful requests, various metrics of the duration and message size of the requests, etc.).
  * The operational monitoring daemon makes operational and health data available to the owner of the security server, regular clients and the central monitoring client via the security server. (For example, local health data may be made available for external monitoring systems.)
  * The owner of the security server and the central monitoring client are able to query the records of all clients. For a regular client, only the records associated with that client are available.
* Environmental monitoring
  * Environmental monitoring provides details of the security servers such as operating system, memory, disk space, CPU load, traffic load, running processes and installed packages, etc. in a chosen date range.
  * Environmental monitoring provides a standard endpoint which can be accessed with a client (e.g. Java's jconsole application if using JMX).
  * It is possible to limit what allowed non-owners can request via environmental monitoring data request. The security server owner will always get the full data set as requested.

## 6.5 Scaling/Throughput

* The Information Mediator BB supports provider-side high availability setup via a so-called internal load balancing mechanism. The setup works so that the same member / member class / member code / application / service code is configured on multiple security servers and the IM BB will then route the request to the server that responds the fastest.
* Busy production systems may need scalable performance in addition to high availability. The IM BB supports external load balancing mechanisms to address both of these problems simultaneously. A load balancer is added in front of a security server cluster to route the requests based on a selected algorithm.
* The team in charge of deploying the security server application on their hardware must consider the network infrastructure including a load balancer, \_\_\_\_\_\_, etc. The requirements for network infrastructure must be handled/defined in a (yet to exist) “Network BB”.
