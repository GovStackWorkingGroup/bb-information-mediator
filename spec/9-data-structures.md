---
description: >-
  This section provides information on the core data structures/data models that
  are used by this Building Block.
---

# 7 Data Structures

The resource model shows the relationship between data objects that are used by the Information Mediator Building Block.

The data elements provide detail for the resource model. All data element schemas can be viewed, commented on, and modified in the [schemas section](https://github.com/aleksander-reitsakas/InformationMediatorAPI/tree/main/IM/schemas) of the Information Mediator Building Block Github repository.

## 9.1 Standards

The following standards are applicable to data structures in the Building Block:

* Requests will be made using HTTPS.
* Request bodies will be valid JSON.
* The description of specific services and the data formats they require will be specified in an OpenAPI 3.1 specification.

## 9.2 Service Access Layer

### 9.2.1 Resource Model

The Mediator Building Block key element is Service. The Service is used by a consuming Building Block or an application and offered by a provider Building Block or Application. Both Provider and Consumer MUST be Members of Mediator Building Block. Members of the Information Mediator Building Block can be an organization (governmental or not, business or not) or a person (citizen as a rule).

![Draw.io source in github: https://github.com/aleksander-reitsakas/InformationMediatorAPI/blob/main/IM/diagrams/Mediator-BB-entities.drawio.png.](<.gitbook/assets/Mediator-BB-entities.drawio (1).png>)

To become a Member of Mediator Building Block participants must fulfill declared requirements and apply for onboarding. In the process of onboarding a Member is registered with Mediator Building Block and gets credentials to connect to Mediator Building Block. Normally it is done the way that a Member provides a certificate of recognized Certification Authority (CA), and requests signed with this certificate are considered legitimate requests of the Member. A member entity can access the PubSub configuration and register a room to publish its own event type as a publisher through its own admin.

Members can browse a directory of Services available in the Mediator Building Block. Each service is described in OpenAPI.

### 9.2.2 Data Elements

#### 9.2.2.1 Member

Member:&#x20;

[member.json](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/blob/main/IM/schemas/member.json)

Member:

Member Class enumeration

Member Code string

Signing Key:

Token enumeration (where to put)

Name string

Name of CA enumeration

#### 9.2.2.2 Application

Application:&#x20;

[application.json](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/blob/main/IM/schemas/application.json)&#x20;

Application:

Connection type enum http/https

TLS certificate cert

#### 9.2.2.3 Service

Service:&#x20;

[service.json](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/blob/main/IM/schemas/service.json)&#x20;

Services:

Service Code string

Description URL url OpenAPI spec

Service URL url base address for endpoint (prefix)

Access Rights ACL

## **9.3 PubSub Layer**

### 9.3.1 Resource Model

Resource Model is an extension of the Access Layer model:

![Draw.io source in github: https://github.com/aleksander-reitsakas/InformationMediatorAPI/blob/main/IM/diagrams/Mediator-BB-PubSub-entities.drawio.png](.gitbook/assets/dsgsd.png)

### 9.3.2 Data Elements

#### 9.3.2.1 Event

An event is a set of data described by event type. Each event has an id, and this is most likely a Universally Unique Identifier(UUI).

#### 9.3.2.2 Event type

An **event type** is a service described by OpenAPI. Each event type is owned by a certain authority. (E.g. the MoH might own the “new\_birth” event type and define its schema.)

#### 9.3.2.3 Publisher

A **publisher** is a GovStack application that produces events and sends them to Rooms.

#### **9.3.2.4 Room**

A **room** is a GovStack application that handles the distribution of events. Each Room has a set of connected event types (e.g., the “birth” room might contain three event types: “new\_birth”, “birth\_complication”, and “infant\_death”). A room is located in the member’s local Information Mediator Building Block implementation and the member is responsible for all types of events in that particular room.

#### 9.3.2.5 Subscriber

A subscriber is a GovStack application that can process events. Subscribers are independent of each other and their business logic is different (as rule). Each subscriber processes events from their own perspective.

Schema description:&#x20;

[broadcast.json](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/blob/main/IM/schemas/broadcast.json)
