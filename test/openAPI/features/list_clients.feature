Feature: This endpoint is used to retrieve the list of clients from GovStack.

  Request endpoint: GET /listClients

  Scenario: Successfully retrieved the list of clients from GovStack
    Given Wants to retrieve the the list of Clients of GovStack
    When The request to retrieve the list of Clients of GovStack is sent
    Then The operation returns the list of Clients of GovStack

  Scenario: Successfully retrieved the list of clients from GovStack with optional parameters in the request
    Given Wants to retrieve the list of clients from GovStack with optional parameters specified
    When The request with optional parameters to retrieve the list of Clients of GovStack is sent
    Then The operation returns the list of Clients of GovStack
