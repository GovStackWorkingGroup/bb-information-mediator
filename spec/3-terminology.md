# 3 Terminology

## 3.1 **Building block**

**Building blocks** (BBs) are software modules that can be deployed and combined in a standardized manner. Each building block is capable of working independently, but they can be combined to do much more.

Building blocks are composable, interoperable software modules that can be used across a variety of use cases. They are standards-based, preferably open-source, and designed for scale.

Each building block exposes a set of services in the form of REST APIs that can be consumed by other building blocks or applications.

**Ingress access** is access from external applications to GovStack building blocks and applications.

**Egress access** is access from within GovStack BBs and applications to external applications

## **3.2 Use case**

A **use case** is a piece of functionality described as a sequence of actions (steps) to achieve a specific goal in a specific context of usage. E.g., in one use case the IM BB may be used to let a BB access a service provided by another BB; in another use case it may be used to relay an event notification from one BB to several other BBs via PubSub.

Each use case may involve a collection of modules, or BBs. A relatively small set of these BBs can be readily applied to a wide variety of use cases in low-resource settings.

## **3.3** [**API**](https://en.wikipedia.org/wiki/API)****

An application programming interface (**API**) is a connection between computers or between computer programs. It is a type of software interface, offering a service to other pieces of software. A document or standard that describes how to build such a connection or interface is called an API specification. A computer system that meets this standard is said to implement or expose an API. The term API may refer either to the specification or to the implementation.

## **3.4** [**Webhook**](https://sendgrid.com/blog/whats-webhook)****

A **Webhook** (also called a web callback or HTTP push API) is a way for an application to provide other applications with real-time information. A webhook delivers data to other applications as it happens, meaning you get data immediately.

In a sense, a “webhook” is just a way of making an HTTP post to a URL when something important happens.

For example, consider “PatientTracker v2”, a fictional application that registers new patients. The PatientTracker v2 admin will create a webhook that pushes data from their application to 7 different applications that depend on this event to do something, each having some external URL whenever a new patient is created inside my “PatientTracker v2” application.

* So, without **PubSub**, to notify multiple different services) about a “new patient”, one would need to create multiple different webhooks (with corresponding URLs) in the Patient Tracker v2 application. Also, this implies that Patient Tracker V2 knows, apriori, which other applications have to be informed based on an event, which creates a nightmare of change management as needs evolve. Also, each application such as the “Patient Tracker V2” will have to add and maintain its own set of webhooks for each event it generates. This mapping of “who to inform if this event happens” may change with time.
* With a **PubSub** layer, it needs only 1 webhook which sends data (when a new patient is created in the Patient Tracker v2 application) to the IM BB url for handling PubSub events (e.g., IM.com/pubsub/inbox) and the PubSub layer of the BB will then handle sending this information to all 7 applications if they are active subscribers for this event.

Webhooks can also be used without PubSub to facilitate an asynchronous style of communication. The consumer can request information from the provider, but expect a 202/Accepted status code and then another (delayed) POST request to a specific URL via a webhook configured on the provider’s side. However this is sub-optimal and useful only in situations where one can tolerate inordinate delays in a response to a POST await.

## 3.5 Service Access

### **3.5.1 Member**

A **member** is an organization which is authorized to communicate via the IM for a particular GovStack implementation.

### 3.5.2 Application

An **application** is a running instance containing one or more BB instances and zero or more use case implementations. An application uses an IM building block to communicate with other BBs or applications. An application typically has a single responsibility.

### **3.5.3 Service**

A **service** is a minimal piece of functionality provided by a building block or use case implementation. A service can be local (inside one application) or remote (between different applications). Remote services are consumed using REST protocol and they are described by [OpenAPI](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/tree/main/IM) specification. For example, the “registration” service might be accessed at a particular URL and allow a requester to “register a patient” by sending a POST request with proper patient data.

### 3.5.4 Security Server

A security server is the main piece of software that is responsible for implementing the “service access” layer of the Information Mediator. This software acts as a gateway, and is responsible for mediating requests between various members, applications, and services.

### **3.6** [**PubSub**](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe\_pattern)****

In software architecture, publish–subscribe (**PubSub**) is a messaging pattern where senders of messages, called publishers, do not program the messages to be sent directly to specific receivers, called subscribers, but instead categorize published messages into classes without knowledge of which subscribers, if any, there may be. Similarly, subscribers express interest in one or more classes and only receive messages that are of interest, without knowledge of which publishers, if any, there are.

PubSub is a sibling of the message queue paradigm, and is typically one part of a larger message-oriented middleware system. Most messaging systems support both the PubSub and message queue models in their API; e.g. Java Message Service (JMS), which is especially useful to handle multiple retries in case a recipient application is offline due to connectivity issues, in a typical low resource region.

This pattern provides greater network scalability and a more dynamic network topology, with a resulting decreased flexibility to modify the publisher and the structure of the published data.

#### **3.6.1 Publisher**

A **Publisher** produces events and sends them to rooms. Each event has an event type associated with it. Publishers can produce events of different types.

#### **3.6.2 Room**

A **Room** is an PubSub entity that handles the distribution of events. Each Room has a set of connected event types. (E.g., the “birth” Room might contain three event types: “new\_birth”, “birth\_complication”, and “infant\_death”.)

#### **3.6.3 Subscriber**

A **Subscriber** can process events of a certain event type. Subscribers are independent of each other and their business logic is different (as rule). Each subscriber processes events from their own perspective.

### ****
