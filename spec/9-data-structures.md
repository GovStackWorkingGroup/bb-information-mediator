# 9 Data Structures

The resource model shows the relationship between data objects that are used by the Information Mediator building block.

The data elements provide detail for the resource model. All data element schemas can be viewed, commented on, and modified in the [schemas section](https://github.com/GovStackWorkingGroup/bb-information-mediator/tree/main/schemas) of the IM BB Github repository.

## 9.1 Standards

The following standards are applicable to data structures in the BB:

* Requests will be made using HTTPS.
* Request bodies will be valid JSON.
* The description of specific services and the data formats they require will be specified in an OpenAPI 3.1 specification.

## 9.2 Service Access Layer

### 9.2.1 Resource Model

The Mediator BB key element is Service. The Service is used by a consuming building block or an application and offered by a provider building block or Application. Both Provider and Consumer MUST be Members of Mediator BB. Members of the mediator BB can be an organization (governmental or not, business or not) or a person (citizen as a rule).

<figure><img src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/diagrams/Mediator-BB-entities.drawio.png" alt=""><figcaption><p>Draw.io source: <a href="../diagrams/Mediator-BB-entities.drawio.png">https://github.com/GovStackWorkingGroup/bb-information-mediator/blob/main/diagrams/Mediator-BB-entities.drawio.png</a></p></figcaption></figure>

To become a Member of Mediator BB participant must fulfil declared requirements and apply for onboarding. In the process of onboarding a Member is registered with Mediator BB and gets credentials to connect to Mediator BB. Normally it is done the way that a Member provides a certificate of recognized CA and requests signed with this certificate are considered as legitimate requests of the Member. A member entity can access the PubSub configuration and register a room to publish its own event type as a publisher through its own admin.

Members can browse a directory of Services available in Mediator BB. Each service is described in OpenAPI.

### 9.2.2 Data Elements

#### 9.2.2.1 Member

Member: [https://github.com/GovStackWorkingGroup/bb-information-mediator/blob/main/schemas/member.json](../schemas/member.json)

Member:

&#x20;   Member Class enumeration

&#x20;   Member Code string

&#x20;   Signing Key:

&#x20;       Token enumeration (where to put)

&#x20;       Name string

&#x20;       Name of CA enumeration

#### 9.2.2.2 Application

Application: [https://github.com/GovStackWorkingGroup/bb-information-mediator/blob/main/schemas/application.json](../schemas/application.json)

Application:

&#x20;   Connection type enum http/https

&#x20;    TLS certificate cert

#### 9.2.2.3 Service

Service: [https://github.com/GovStackWorkingGroup/bb-information-mediator/blob/main/schemas/service.json](../schemas/service.json)

Services:

&#x20;   Service Code string

&#x20;   Description URL url OpenAPI spec

&#x20;   Service URL url base address for endpoint (prefix)

&#x20;   Access Rights ACL

## **9.3 PubSub Layer**

### 9.3.1 Resource Model

Resource Model is extension of Access Layer model:

<figure><img src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-information-mediator/main/diagrams/Mediator-BB-PubSub-entities.drawio.png" alt=""><figcaption><p>Draw.io source: <a href="../diagrams/Mediator-BB-PubSub-entities.drawio.png">https://github.com/GovStackWorkingGroup/bb-information-mediator/blob/main/diagrams/Mediator-BB-PubSub-entities.drawio.png</a></p></figcaption></figure>

### 9.3.2 Data Elements

#### 9.3.2.1 Event

An event is a set of data described by event type. Each event has an id, and this is most likely a uuid.

#### 9.3.2.2 Event type

An **event type** is a service described by OpenAPI. Each event type is owned by a certain authority. (E.g. the MoH might own the “new\_birth” event type and define its schema.)

#### 9.3.2.3 Publisher

A **publisher** is a GovStack application that produces events and sends them to Rooms.

#### **9.3.2.4 Room**

A **room** is a GovStack application that handles the distribution of events. Each Room has a set of connected event types. (E.g., the “birth” room might contain three event types: “new\_birth”, “birth\_complication”, and “infant\_death”.) A room is located in the member’s local IM BB implementation and the member is responsible for all types of events in that particular room.

#### 9.3.2.5 Subscriber

A subscriber is a GovStack application that can process events. Subscribers are independent of each other and their business logic is different (as rule). Each subscriber processes events from their own perspective.

Schema description: [https://github.com/GovStackWorkingGroup/bb-information-mediator/blob/main/schemas/broadcast.json](../schemas/broadcast.json)
