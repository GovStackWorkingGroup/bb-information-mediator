# 11 Workflows

A workflow provides a detailed view of how the IM building block will interact with other building blocks to support common use cases. This section lists workflows that this building block must support. Other workflows may be implemented in addition to those listed.

Note that for the Information Mediator, the primary workflow for the Service Access layer is specified in the “[Accessing Services](6-functional-requirements.md#6.1.4-accessing-services)” section above. The workflow for the “PubSub layer” is outlined below.

## 11.1 Broadcast Data to Multiple Services <a href="#docs-internal-guid-911e5942-7fff-642b-4c6a-5b48f3133e80" id="docs-internal-guid-911e5942-7fff-642b-4c6a-5b48f3133e80"></a>

This workflow describes how data about a particular event is broadcast to multiple services. Note that in this case, and in all PubSub implementations, the sender of the data does not know who will receive the data or what they will do with it. Likewise, the recipient of the data does not know who broadcast the data.\\

For example, “Clinic System A” wishes to broadcast data about a new birth so that it can be used to trigger asynchronous actions in several other systems. A webhook is configured in Clinic System A that makes an HTTP POST request corresponding to the type of event and some valid JSON in the body to the PubSub provider. The provider maintains a list of active “Subscribers” for that event type. Without manipulating the body, that message is effectively forwarded on to each subscriber, so that REST services in the “Demographics Tracker”, “Insurance Registry”, and “Early Childhood Education” applications can consume that data and do things based on it.\\

It should be noted that the shape of the payload will be agreed upon beforehand, so that the responsibility of being able to “ingest” a “newBirth” payload from PubSub will fall on the REST service provider. Once an event is ingested, the responsibility to deliver the payload lies with the IM “room” based on the importance given to the event by a Subscriber. Thus, during registration of the Subscriber, parameters such as max queue depth, retries, failsafe mechanisms and error handling have to be configured by each Subscriber as they subscribe to an event type.

## 11.2 Interaction with Other Building Blocks

This workflow describes multicase interaction between building blocks.

Sequence Diagram:

The sequence diagram shows the flow of data between building blocks for this workflow.

![](<.gitbook/assets/Screenshot 2022-07-18 044152.png>)
