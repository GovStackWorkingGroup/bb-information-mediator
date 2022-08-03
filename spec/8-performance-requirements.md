# 8 Performance Requirements

This section specifies the basic parameters that an implementing government might use to establish performance requirements for scalability, throughput, and response times when reasonable/necessary. For example:

* Minimum Throughput = 100 requests/sec
* Maximum Latency = 1sec
* Concurrency = 1000 concurrent requests
* All solutions MUST be able to monitor and report, including but not limited to, resource consumption, throughput, latency, average latency, queue depth/backlogs, etc.
  * All of these indicators MUST be available through an administrative API.
  * Ideally, all BBs should be able to run a “monitoring agent” which handles reporting out logs, requests, BB-specific indicators, etc. to a monitoring service (e.g., [https://www.datadoghq.com/](https://www.datadoghq.com))
  * The local monitoring agent should be configurable via web interface.
* Retries and backoff strategies must be configurable.
* There are specific “[Scaling/Throughput](6-functional-requirements.md#6.5-scaling-throughput)” requirements in the functional requirements section.
