# 2 Description

The functional requirements section lists the technical capabilities that this building block should have. These requirements should be suﬃcient to deliver all functionality that is listed in the Key Digital Functionalities section.

The information mediator (IM) building block (BB) provides a gateway for exchange of data and services among GovStack Building blocks through open-API rest based interfaces to ensure interoperability and implementation of standards. The IM provides mechanisms for applications/BBs to publish and consume services and event notifications among other GovStack BBs.

IM services act as a channel through which BBs and external applications can connect to services exposed by other BBs such as registry services, identity services and payment services. The IM BB provides a second service, as a broadcasting channel for notification of events among the connected applications in a publisher-subscriber (PubSub) model. The IM BB also maintains a log of transactions (e.g., requests, events), as well as handling communication errors between BBs and/or other applications via the PubSub service. This component may employ other core components, such as registries, repositories, etc. By allowing different applications to exchange information, it can act as a mechanism to encourage or enforce best practices, data standards around PubSub, and data-sharing policies in cross-facility work-flows among business processes.

## **2.1 Use Case Applicability**

The Information Mediator, through the “Service Access Layer” and the “Pubsub Layer” enables all use cases that make use of HTTP requests and the OpenAPI specification. For this exercise, we have tested against the use cases within the “Postpartum and Infant Care” and “Unconditional Social Cash Transfer” user journeys.

## **2.2 What Is Out of Scope**

The IM BB does NOT handle communication between human users and applications.

The IM BB does NOT handle ingress and egress access from external applications to and from GovStack’s internal components. (This may be handled by a public API Gateway in the domain of the Security BB.)

## **2.3 Future Scope**

### **2.3.1 Consider broader existing standards.**

See section on [Gov.UK’s API Management Strategy Document](4-key-digital-functionalities.md#4.3.3.2-gov.uks-api-management-strategy-document).
