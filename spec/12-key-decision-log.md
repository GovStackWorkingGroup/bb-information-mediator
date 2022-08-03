# Key Decision Log

1. 2021-06-15: Added “PubSub” and “translation” layer to the IM scope. They were previously considered out of scope.
2. 2021-06-15: Broke IM specification into 3 segments: (1) Service Access layer; (2) PubSub layer; (3) translation layer.
3. 2021-06-24: Removed “translation” layer from the IM scope. (Max, Ramkumar, Travis, Ingmar, Taylor)
4. 2021-07-15: Decide to push towards a “shareable” v1 and send it to architecture for formal review before inviting outside reviewers from Kulli’s list of CVs. (Max, Ramkumar, Aleksander, Taylor, Ingmar)
5. 2021-07-22: Move away from “Flux Standard Actions” ({ type: ‘newBirth’, payload: { ...data }) in favor of a “type” query parameter in the POST request. To broadcast a newBirth payload, make a POST request to /api/pubsub?type=NEW_BIRTH with valid JSON body with the data. This makes it clearer that we will never know about or modify the body. (Also leaves the door open for non-JSON bodies.)
6. 2021-08-05: Architecture group present: an API must exist to manage users externally so that an IAM solution can be used to provision and manage IM admin users.
7. 2021-08-05: Architecture group present: OpenAPI specs and JSON schemas for the entities defined in the Github repo should be real requirements, not examples/samples. They should only be for a small subset, but they must be adhered to by systems which serve this BB.
8. 2021-09-27: Ramkumar feeds back from Architecture Group that there is a need for a monitoring facility that is decoupled from individual BBs. The individual BBs (incl. IM) must determine what is critical for them to have monitored and then their monitoring agent must be able to emit that data or allow an external service to query for it. These indicators may include generic indicators such as network latency, requests/traffic, load, etc. The generic indicators (incl. network traffic indicators) must be available to the monitoring/threat-detection service, but then it's up to that service to configure threat rules: e.g., 10 consecutive failed login attempts for a single API/user should trigger X, Y, Z
9. 2021-09-27: Administrative rights (TD, AR, R)
    - The **super-admin** (admin for GLOBAL IM system) can
      - Register members
      - Register member applications (approve/deny request)
      - Activate/suspend access for members and applications (this might be achieved by e.g., revoking a certificate for members). Activation and suspension of member and application access is performed in administrative UI the way similar to handling client state described in section 13.1.2 Security Server Client States
    - [OPTIONAL] The security server admin can
      - Add and supervise the admins for each member (in some cases, a single security server __may__ have multiple members—e.g., the Ministry of Health, and the Ministry of Public Health Informatics—and this security server admin may create and delegate responsibilities to the member admins which sit “inside” the single security server instance.)
    - The member admin (admin for a member) can
      - Request registration for applications
      - Register application services
      - Request event type subscription (we need to design a new target
multicast feature)
      - Approve event type subscription (we need to design a new target
multicast feature)
10. 2019-09-29: PubSub is not very useful without additional information about who has sent data and who is subscribed to receive it.
    - Extend PubSub so that each event contains:
      - `{ type: “new_birth”, payload, sender }`
      - `{ type: “__XYZ__”, payload, sender }` // everyone subscribes
      - `{ type: “fire_emergency”, { data }, sender }` // drives API action
      - `{ type: “notification”, “Please help me”, sender }` // notification

    - The process of subscribing to events now requires a request to subscribe to an event type from a specific sender and the sender must agree/authorize.
    - Once a subscription is authorized, the sender cannot “filter” who receives a
 broadcast. (This is PubSub.) The “filtering” happens on the receiver end.

11. 2019-10-06: Open Question from Ramkumar (noting pushback from AK/TD):Should PubSub event producers (senders) be able to choose which subscribers receive each event (from the list of subscribers)? Decided that currently, event publishers will not have any control on who subscribes to the event. So no filtering is possible from the publisher side. Deferring publisher based filtering until such a use case is identified
    - Since we have a fair amount of specification already laid out and since there are very clear, well documented industry standards around pub sub (see below)
      - https://aws.amazon.com/pub-sub-messaging/
      - https://cloud.google.com/pubsub
      - https://azure.microsoft.com/en-gb/services/web-pubsub/
    - AND, since any PubSub server/implementation would merely sit “on” the information mediator anyway, as another “sub-building-block” we recommend splitting it out and documenting all of our current progress on that BB over there as a version 1 (or even a version 0.1).
12. 2021-11-30: Taylor,Aleksander,Ramkumar-PubSubisback,andwillbemergedintothe document above based on the PubSub Proposal which has been approved by Max and the architecture team.

