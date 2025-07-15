---
description: >-
  Key Digital Functionalities describe the core (required) functions that this
  Building Block must be able to perform.
---

# 4 Key Digital Functionalities

The Information Mediator Building Block should provide the following functionalities, organized across 6 different components or layers

### 4.1 Service Access

Service access is the facility through which different GovStack Building Blocks and applications may communicate securely with each other.

The service access layer should provide an administrative interface that can be used to define users and roles and what access each should have. This layer should also include a registration interface which allows new members to onboard to the Information Mediator.

The Service Access layer will also provide functionality to allow or restrict secure access to various resources, route requests to the correct providers, connect service requestors to providers, and enforce access privileges and security policies

### 4.2 Directory Services

The Directory service allows applications to discover resources or functionalities that are made available by the system. An application may query the Directory service to discover organizations, services, and APIs that are available to them

### 4.3 Pub/Sub Service

The Pub/Sub service is a facility through which applications may publish and subscribe to different events identified by unique message types, enabling more efficient and resilient communication and application design. It should provide broadcast/multicast capabilities to facilitate faster, more resilient application design.

### 4.4 Logging Services

The Information Mediator will manage a message log which will provide comprehensive audit trails for all services requests and access.

### 4.5 Monitoring Services

The Monitoring services will provide both operational and environmental reporting and dashboards, allowing users to discover the volume of requests to particular services or organizations as well as environmental reports on hardware/network usage.

### 4.6 Scaling/Throughput Services

The Information Mediator should support scaling services such as load balancers and allow for the addition of additional servers to manage increased system use.

### Out-of-scope requirements

Note that the Information Mediator is not responsible for manipulating the payloads sent to and from various applications—in a sense, it is both the postal service and the roads/bridges/train tracks—but it does not read the contents of your mail.

The Information Mediator Building Blocking does not handle communication between human users and applications.

The Information Mediator Building Blocking does not handle ingress and egress access from external applications to and from GovStack’s internal components (This may be handled by a public API Gateway in the domain of the Security Building Block).

The current specification does not assume the possibility of different Information Mediator implementations working together. In one instance of the GovStack ecosystem, only one implementation of the Information Mediator Building Block can exist.

The following requirements have been identified as “out of scope” because they fall into the realm of the Workflow Building Block or the Security Building Block.

* Supports the handling of transactions and associated communication errors and exceptions.
* Translates data from one format to another, and interoperates with handshake protocols to enable interoperability between diﬀerent ICT (Information and communication technology) Building Blocks duplications.
* Map data structures and fields from the identification system to the registration system and vice versa.
* Hold authentication and credentials for each system.
* Allow the definition of steps for a particular transaction.
* Provide an API for both systems to access – and execute all necessary steps for that transaction (including error handling, retries, and notifications).
* Provide an API for external systems to access GovStack Building Blocks.

### **Future Scope**

In future iterations of this specification, we may take into consideration more broad API-management standards which include multiple domains, such as those proposed by the United Kingdom's Government in their [Defining an API management strategy](https://www.gov.uk/guidance/defining-an-api-management-strategy) and the section on [Gov.UK’s API Management Strategy Document](4-key-digital-functionalities.md#4.3.3.2-gov.uks-api-management-strategy-document).
