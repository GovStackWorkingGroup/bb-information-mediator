---
description: >-
  This section will highlight important requirements or describe any additional
  cross-cutting requirements that apply to this Building Block.
---

# 5 Cross-Cutting Requirements

## 5.1 Requirements

The cross-cutting requirements described in this section are an extension of the cross-cutting requirements defined in the [Architecture Blueprint document](https://govstack.gitbook.io/specification/v/1.0/architecture-and-nonfunctional-requirements) and the [Security Requirements](https://govstack.gitbook.io/specification/v/1.0/security-requirements). This section will describe any additional cross-cutting requirements for this Building Block or differences with the Architecture Blueprint.

## **5.1.1** GET and PUT APIs must be Idempotent (REQUIRED)

Application APIs will contain POST endpoints which are not idempotent. GET/PUT/DELETE APIs are idempotent relative to Information Mediator Building Block, but the idempotents of intermediated services depend on the service provider and cannot be specified at this level.

## **5.1.2** Databases should not Include Business Logic (RECOMMENDED)

Databases should not include business logic. We propose that this is a design recommendation which intends to make business logic all live in a clearly visible and accessible location. This may not always be followed, as the benefits of stored procedures (e.g., in reducing database transaction round-trips, etc.) may sometimes outweigh this general design recommendation.

## **5.1.3** Design for Asynchronous First (RECOMMENDED)

The Service Access Layer of the Information Mediator is synchronous first. The Pub/Sub Layer is asynchronous.

## **5.1.4** Use Standardized Data Formats for Interchange (REQUIRED)

Standard formats are used for communication with other Building Blocks. Inside Building Block non-standard protocols can be used.

## **5.1.5** Use Web Hooks for Callbacks (REQUIRED)

OpenAPI spec 3.0 is supported in the first version. Moving to OpenAPI 3.1 is planned for the future.

## 5.2 Performance Requirements

The Performance Requirements specify the basic parameters that an implementing government might use to establish performance requirements for scalability, throughput, and response times when reasonable/necessary. For example:

* Minimum Throughput = 100 requests/sec.
* Maximum Latency = 1 sec.
* Concurrency = 1000 concurrent requests.
* All solutions MUST be able to monitor and report, including but not limited to, resource consumption, throughput, latency, average latency, queue depth/backlogs, etc.
  * All of these indicators MUST be available through an administrative API.
  * Ideally, all Building Blocks should be able to run a “monitoring agent” which handles reporting out logs, requests, Building Block-specific indicators, etc. to a monitoring service (e.g. [Datadog](https://www.datadoghq.com/))
  * The local monitoring agent should be configurable via web interface.
* Retries and back-off strategies must be configurable.
* Specific “[Scaling/Throughput](6-functional-requirements.md#6.6-scaling-throughput)” requirements are in the functional requirements section.

## 5.3 Standards

The following standards are applicable to data structures in the Information Mediator Building Block:
