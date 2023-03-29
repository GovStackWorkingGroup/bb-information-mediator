---
description: This section provides context for this Building Block.
---

# 2 Description

The Information Mediator Building Blocking provides a gateway for exchange of data and services among GovStack Building Blocks through open-API rest-based interfaces to ensure interoperability and implementation of standards. The Information Mediator provides mechanisms for applications/Building Blocks to publish and consume services and event notifications among other GovStack Building Blocks.

Information Mediator services act as a channel through which Building Blocks and external applications can connect to services exposed by other Building Blocks such as registry services, identity services, and payment services. The Information Mediator Building Blocking provides a second service, as a broadcasting channel for notification of events among the connected applications in a Publisher-Subscriber (Pub/Sub) model. And also maintains a log of transactions (e.g., requests, events), as well as handling communication errors between Building Blocks and/or other applications via the Pub/Sub service. This component may employ other core components, such as registries, repositories, etc. By allowing different applications to exchange information, it can act as a mechanism to encourage or enforce best practices, data standards around Pub/Sub, and data-sharing policies in cross-facility workflows among business processes.

## **2.1 Use Case Applicability**

The Information Mediator, through the “Service Access Layer” and the “Pub/Sub Layer” enables all use cases that make use of HTTP requests and the OpenAPI specification. For this exercise, we have tested against the use cases within the “Postpartum and Infant Care” and “Unconditional Social Cash Transfer” user journeys.

## **2.2 What Is Out of Scope**

The Information Mediator Building Blocking does NOT handle communication between human users and applications.

The Information Mediator Building Blocking does NOT handle ingress and egress access from external applications to and from GovStack’s internal components (This may be handled by a public API Gateway in the domain of the Security Building Block).

## 2.3 Cross-Building Block Communication

It is strongly recommended that a Building Block uses an Information Mediator for any communications across the internet. An Information Mediator is not required for communication between Building Blocks which are co-located.

### 2.3.1 Federation and Data Exchange Requirements

Each building block deployment SHOULD use an Information Mediator to federate and communicate with other data consumers and providers, particularly when communicating between services that are not co-located. This ensures confidentiality, integrity, and interoperability between data exchange parties. An Information Mediator MUST provide the following capabilities:

* address management;
* message routing;
* access rights management;
* organization-level authentication;
* machine-level authentication;
* transport-level encryption;
* time-stamping;
* digital signature of messages;
* logging;
* error handling;
* monitoring and alerting;
* service registry and discovery.

### 2.3.2 Organizational Model

In order to effectively deploy a software solution using the Information Mediator, several policies and processes will need to be applied. This section briefly describes the organizational processes that must be in place.

1. First, a central operator will be identified and created. This organization will be responsible for the overall operation of the system, including operations and onboarding new members. Policies and contractual agreements for onboarding need to be created.
2. Trust services need to be set up internally or procured from third parties, including timestamps and certificate authorities. This provides the necessary infrastructure to support distributed deployments.
3. Finally, members can be onboarded and provided with access to the Information Mediator and methods to register the services that they provide as well as discover services that are available.
4. Once agreements are in place, members can deploy new services in a decentralized, distributed manner. [Before deploying a new service, the central operator must be notified of any changes to access rights, including organization and machine-level authentication before it can publish or consume data.](#user-content-fn-1)[^1]

### 2.3.3 Technical Architecture

This section provides an overview of the technical processes and architecture that must be implemented once the organizational model has been created.

1. A Central Operator is responsible for maintaining a registry of members, the security policies for Building Blocks and other member instances, a list of trusted certification authorities, and a list of trusted time-stamping authorities. The member registry and security policies MUST be exposed to the Information Mediator over HTTP.
2. Certificate authorities are responsible for issuing and revoking certificates used for securing and ensuring the integrity of federated information systems. Certificate authorities MUST support the Online Certificate Status Protocol (OCSP) so that an Information Mediator can check certificate validity.
3. Time-stamping authorities securely facilitate the time stamping of messages. Time stamping authorities MUST support batched time stamping.
4. The Service Registry provides a mechanism for Building Blocks to register the services that they provide and for other building blocks to discover and consume those services. Any services provided or consumed by a Building Block that leverages the Information Mediator architecture MUST use this service registry functionality.

## **2.4 Future Scope**

### **2.4.1 Consider broader existing standards**

See the section on [Gov.UK’s API Management Strategy Document](4-key-digital-functionalities.md#4.3.3.2-gov.uks-api-management-strategy-document).

[^1]: [Valeria Tafoya](http://localhost:5000/u/OavApSyMjhf7E7ZV0QBHEZzPeX13 "mention") Pls delete this sentence
