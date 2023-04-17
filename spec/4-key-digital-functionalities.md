---
description: >-
  Key Digital Functionalities describe the core (required) functions that this
  Building Block must be able to perform.
---

# 4 Key Digital Functionalities

### 4.1 Current scope

At a high level, these are the key functionalities that MUST or SHOULD be provided by any software implementation that plays the role of an Information Mediator.&#x20;

In a nutshell, the Information Mediator Building Block is responsible for providing:

1. **Service Access:** a facility through which different GovStack Building Blocks and applications may communicate securely with each other.
   * Routes requests to the correct provider after necessary message transformation functionalities and protocol conversion. (REQUIRED)
   * Connects the service requestor to the service provider and its underlying solution platforms, realizing the requested service. (REQUIRED)
   * Discovers services and, at runtime, to support the virtualization of services, so that changes to endpoints can occur without impact to service consumers and service provider. (REQUIRED)
   * Enforces access privileges and other security policies. (REQUIRED)
   * Maintains service invocation history and monitors and tracks service invocations. (REQUIRED)
2. **Pub/Sub:** a facility through which applications may publish and subscribe to different events identified by unique message types, enabling more efficient and resilient communication and application design.
   * Provides broadcast/multicast capabilities to facilitate faster, more resilient application design. (RECOMMENDED)

### 4.2 Out-of-scope requirements

Note that the Information Mediator is not responsible for manipulating the payloads sent to and from various applications—in a sense, it is both the postal service and the roads/bridges/train tracks—but it does not read the contents of your mail.

The Information Mediator Building Blocking does NOT handle communication between human users and applications.

The Information Mediator Building Blocking does NOT handle ingress and egress access from external applications to and from GovStack’s internal components (This may be handled by a public API Gateway in the domain of the Security Building Block).

The current specification does NOT assume the possibility of different Information Mediator implementations working together. In one instance of the GovStack ecosystem, only one implementation of the Information Mediator Building Block can exist.

The following requirements have been identified as “out of scope” because they fall into the realm of the Workflow Building Block or the Security Building Block.

* Supports the handling of transactions and associated communication errors and exceptions.
* Translates data from one format to another, and interoperates with handshake protocols to enable interoperability between diﬀerent ICT Building Blocks duplications.
* Map data structures and fields from the identification system to the registration system and vice versa.
* Hold authentication and credentials for each system.
* Allow the definition of steps for a particular transaction.
* Provide an API for both systems to access – and execute all necessary steps for that transaction (including error handling, retries, and notifications).
* Provide an API for external systems to access GovStack Building Blocks.

## **4.3 Future Scope**

In future iterations of this specification, we may take into consideration more broad API-management standards which include multiple domains, such as those proposed by the United Kingdom's Government in their [Defining an API management strategy](https://www.gov.uk/guidance/defining-an-api-management-strategy) and the section on [Gov.UK’s API Management Strategy Document](4-key-digital-functionalities.md#4.3.3.2-gov.uks-api-management-strategy-document).
