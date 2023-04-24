---
description: >-
  This section provides a detailed view of how this Building Block will interact
  with other Building Blocks to support common use cases.
---

# 9 Internal Workflows

A workflow provides a detailed view of how the Information Mediator Building Block will interact with other building blocks to support common use cases. This section lists workflows that this building block must support. Other workflows may be implemented in addition to those listed.

### 9.1 Service Access Layer

Example Sequence diagram for accessing service

```mermaid
sequenceDiagram
participant Requestor﻿
participant SS1 as IM Security Server of Requestor
participant CS as IM Central Server
participant CA as CA
participant TSA as TSA
participant SS2 as IM Security Server of Responder
participant Responder
Requestor ->> SS1 : Message X
SS1 ->> CS : read configuration*
CS -->> SS1 : GovStack configuration
SS1 ->> SS1 : find Responder
SS1 ->> SS2 : Initiate TLS connection*
SS2 ->> SS1 : Responder cert
SS1 ->> CA : OCSP check Responder cert*
CA -->> SS1 : yes/no
SS1 ->> SS1 : compose digital document containing "Message X"
SS1 ->> TSA : stamp document
TSA -->> SS1: timestamp
SS1 ->> SS1 : sign document
SS1 ->> SS2 : send document over TLS
SS2 ->> CA : OCSP check Requestor cert*
CA -->> SS2 : yes/no
SS2 ->> SS2 : check document signature
SS2 ->> SS2 : write message to log
SS2 ->> SS2 : check access rights
SS2 ->> Responder : Message X
```

The results of steps marked with '\*' can be cached and reused between calls. In this diagram:

1. Requestor makes a request to the local Information Mediator security server.
2. Local Infirmation Mediator security server finds in the configuration where to send request.
3. The Information Mediator signs & sends the request from application A to the security server for application B.
4. The security server for application B receives the request, validates the signature, and then forwards it to the application/service/endpoint.
5. The application/service/endpoint responds to request.
6. The security server for application B signs the response and sends it back to the security server for application A.
7. The security server for the application A validates the signature and forwards the response to application A.
8. This is all synchronous. Application A’s request is open/unresponded until step 6.

## 9.2 PubSub Layer <a href="#docs-internal-guid-911e5942-7fff-642b-4c6a-5b48f3133e80" id="docs-internal-guid-911e5942-7fff-642b-4c6a-5b48f3133e80"></a>

#### 9.2.1 Registering a Room

```mermaid
sequenceDiagram
participant Owner
participant SS as IM Security Server
participant CS as IM Central Server
participant adm as Administrator
Owner ->> SS: create Room
SS ->> CS: register Room as application
CS ->> CS: store request
CS -->> SS: registration accepted
adm ->> CS: confirm application creation request
CS ->> CS: change configuration
SS ->> CS: read configuration
CS -->> SS: GovStack configuration

```

Room for PubSub MUST be created before events can be described and processed. Room is created by its owner organization (Member), the organization responsible for the operation of events of a certain type.

Creation request SHOULD be confirmed by GovStack administrator.

#### 9.2.2 Defining event type

```mermaid
sequenceDiagram
participant Owner
participant SS as IM Security Server
participant Server
Owner ->> SS: define event type
SS ->> Server: get OpenAPI description
Server -->> SS: OpenAPI
SS ->> SS: create service
SS -->> Owner: done
```

Event type corresponds to a service description of a service accepting events for publishing and MUST be registered before usage. A single room might host multiple event types.

E.g. in India, "The Ministry Of Home Affairs" can be the "Owner" of a Room where events of type "emergency" are published by "citizens" or "entities" and entities such as "ambulance services", "Fire-fighting services", Hospitals, etc., can be Subscribers to this Room. In this scenario, an event of type "Fire emergency" can be published by any citizen enrolled in this Room. The Ministry can choose to have one "emergency" Room in each town and enroll Subscribers relevant to respective regions.

#### 9.2.3 Subscribing to events of a certain type

```mermaid
sequenceDiagram
participant Subscriber
participant SS1 as IM Security Server of Subscriber
participant SS2 as IM Security Server of Room
participant Room
opt event type discovery (design time)
Subscriber ->> SS1: request list of Members
SS1 -->> Subscriber: list of Members
Subscriber ->> Subscriber: chose Member
Subscriber ->> SS1: request list of Rooms (Applications)
SS1 -->> Subscriber: list of Rooms (Applications)
Subscriber ->> Subscriber: chose Room
Subscriber ->> SS1: request list of available event types (Services)
SS1 -->> Subscriber: list of event types
Subscriber ->> SS1: GET description of the event type
SS1 -->> Subscriber: OpenAPI of the event type
Subscriber ->> SS1: register endpoint for receiving events
SS1 -->> Subscriber: done
end
Subscriber ->> SS1: subscribe to event type
SS1 ->> SS2: subscribe to event type
SS2 ->> Room: subscribe
Room ->> Room: register subscription
Room -->> SS2: done
SS2 --> SS1: done
SS1 --> Subscriber: done
```

1. The Subscriber requests that events of certain types be delivered to them.
2. The Subscriber specifies the desired delivery mode (push/pull). The Room and Subscriber conclude the delivery contract. Note that:
   * push delivery mode is when the Room sends events to the Subscriber’s API. In this case, Subscriber MAY request some QoS/SLA parameters of delivery.
   * pull delivery mode (OPTIONAL) means that the Room keeps a queue of events and the Subscriber can check that queue.
3. At a minimum, this Building Block MUST provide for a push delivery mode. It MAY also provide a pull mode based on convenience.

Three endpoints to be declared per event type Pub/Sub instance:

* an endpoint URL to be registered by every Subscriber on a per-event type basis.
* (OPTIONAL) an endpoint URL on the Pub/Sub where all pull requests come from various Subscribers.
* an endpoint in the Room to send messages for publication.

#### 9.2.4 Event delivery

```mermaid
sequenceDiagram
participant Publisher
participant Room
participant Subscriber
Publisher ->> Room: POST event
Room ->> Room: register event
Room -->> Publisher: event id
alt PUSH delivery mode
  loop for all Subscribers
    Room ->> Subscriber: POST event
    Subscriber -->> Room: done
  end
else PULL delivery mode
  Subscriber ->> Room: GET event of type
  Room -->> Subscriber: event
end
opt get details
  Subscriber -->> Publisher: request event details
  Publisher -->> Subscriber: details
end

```

1. The Publisher and the Room have a data access contract to establish trust for accessing information.
   * This is akin to the standard trust contract in the Information Mediator, the consumer must have rights to access a certain API.
   * Publishers have to sign a contract with the Room owner’s consent to gain access to specific Rooms and events. In the contract, Publishers declare what type of message will be published in a given Room.
2. The Publisher generates an event:
   * The Publisher makes a POST call to the Room service of a particular event type.
   * The Room stores the event and replies with the event id. Event id is generated by Room or is taken from the original event dataset if provided by the publisher.
   * The Room can implement a first in, first out (FIFO) event distribution policy. If the Room provides FIFO guarantees, the Room may:
     * (a) assign a key to the event. If a key attribute is defined in the schema of the event, the value of that attribute will be used. Otherwise, the Room can assign a key at its own discretion.
     * (b) assign a sequence number to the event. The sequence number must be monotonically increasing for events that share the same key.
   * The Room sends an immediate acknowledgment to the Publisher.
3. The Room distributes an event asynchronously as follows:
   * A reference to publisher and event id is added to the event dataset.
   * For each Subscriber:
     * (alt) If the mode is ‘push’, make a POST call to Subscriber GovStack service of the event type;
     * (alt) If the mode is ‘pull’, enqueue an event for request from the Subscriber;
       * There is a queue of events waiting to be processed per the Subscriber, such that the Subscriber might periodically check to see events waiting in their own queue, process those events, and clear the queue.
       * A pull mechanism is essential for resilience to network dropouts and traffic load balance at servers and for differentiating urgent/emergency events from normal events (this can be decided during implementation).
4. (OPTIONAL - if mode is PULL) The Subscriber pulls an event:
   * The Subscriber makes a GET call to the Room service of the particular event type.
5. (OPTIONAL) The Subscriber requests event details. Some event details may have more restricted regulations for handling and may be not included in event type. In this case, the Subscriber requests these details directly from the publisher by making a GET call to the referenced Publisher with event id as a parameter.
   * This call implies the existence of an associated contract between the Subscriber and the Publisher.

The Information Mediator Building Block creates a log of all messages published and distributed.

If an event payload is very large, then it is recommended to just publish the "event" and let Subscribers get full details directly from the Publishers as needed. It will simplify event payloads, and reduce Turnaround time (TAT), storage, and bandwidth significantly.

For example, “Clinic System A” wishes to broadcast data about a new birth so that it can be used to trigger asynchronous actions in several other systems. A Service is configured in Clinic System A that makes an HTTP POST request corresponding to the type of event and some valid JSON in the body to the Pub/Sub provider. The provider maintains a list of active “Subscribers” for that event type. Without manipulating the body, that message is effectively forwarded to each subscriber, so that REST services in the “Demographics Tracker”, “Insurance Registry”, and “Early Childhood Education” applications can consume that data and do things based on it.

It should be noted that the shape of the payload will be agreed upon beforehand so that the responsibility of being able to “ingest” a “newBirth” payload from Pub/Sub will fall on the REST service provider. Once an event is ingested, the responsibility to deliver the payload lies with the Information Mediator “room” based on the importance given to the event by a Subscriber. Thus, during registration of the Subscriber, parameters such as max queue depth, retries, failsafe mechanisms, and error handling have to be configured by each Subscriber as they subscribe to an event type.
