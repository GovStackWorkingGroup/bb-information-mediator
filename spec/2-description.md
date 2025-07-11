---
description: This section provides context for this Building Block.
---

# 2 Description

The Information Mediator Building Blocking provides a gateway for exchange of data and services among GovStack Building Blocks through open-API rest-based interfaces to ensure interoperability and implementation of standards. The Information Mediator provides mechanisms for applications/Building Blocks to publish and consume services and event notifications among other GovStack Building Blocks.

Information Mediator services act as a channel through which Building Blocks and external applications can connect to services exposed by other Building Blocks such as registry services, identity services, and payment services. It also maintains a log of transactions (e.g., requests, events), as well as handling communication errors between Building Blocks and/or other applications. This component may employ other core components, such as registries, repositories, etc. By allowing different applications to exchange information, it can act as a mechanism to encourage or enforce best practices and data-sharing policies in cross-facility workflows among business processes.

It is strongly recommended that a Building Block uses an Information Mediator for any communications across the internet. An Information Mediator is not required for communication between Building Blocks which are co-located.

The Information Mediator, through the Service Access Layer and, optionally,  the Pub/Sub Layer, enables all use cases that make use of HTTP requests and the OpenAPI specification. For this exercise, we have tested against the use cases within the “Postpartum and Infant Care” and “Unconditional Social Cash Transfer” user journeys.
