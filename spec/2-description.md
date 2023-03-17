---
description: This section provides context for this Building Block.
---

# 2 Description

The functional requirements section lists the technical capabilities that this Building Block should have. These requirements should be suﬃcient to deliver all functionality that is listed in the [Key Digital Functionalities section](4-key-digital-functionalities.md).

The Information Mediator Building Blocking provides a gateway for exchange of data and services among GovStack Building Blocks through open-API rest-based interfaces to ensure interoperability and implementation of standards. The Information Mediator provides mechanisms for applications/Building Blocks to publish and consume services and event notifications among other GovStack Building Blocks.

Information Mediator services act as a channel through which Building Blocks and external applications can connect to services exposed by other Building Blocks such as registry services, identity services, and payment services. The Information Mediator Building Blocking provides a second service, as a broadcasting channel for notification of events among the connected applications in a publisher-subscriber (PubSub) model.  And also maintains a log of transactions (e.g., requests, events), as well as handling communication errors between Building Blocks and/or other applications via the PubSub service. This component may employ other core components, such as registries, repositories, etc. By allowing different applications to exchange information, it can act as a mechanism to encourage or enforce best practices, data standards around PubSub, and data-sharing policies in cross-facility workflows among business processes.

## **2.1 Use Case Applicability**

The Information Mediator, through the “Service Access Layer” and the “Pubsub Layer” enables all use cases that make use of HTTP requests and the OpenAPI specification. For this exercise, we have tested against the use cases within the “Postpartum and Infant Care” and “Unconditional Social Cash Transfer” user journeys.

## **2.2 What Is Out of Scope**

The Information Mediator Building Blocking does NOT handle communication between human users and applications.

The Information Mediator Building Blocking does NOT handle ingress and egress access from external applications to and from GovStack’s internal components (This may be handled by a public API Gateway in the domain of the Security Building Block).

## **2.3 Future Scope**

### **2.3.1 Consider broader existing standards.**

See section on [Gov.UK’s API Management Strategy Document](4-key-digital-functionalities.md#4.3.3.2-gov.uks-api-management-strategy-document).
