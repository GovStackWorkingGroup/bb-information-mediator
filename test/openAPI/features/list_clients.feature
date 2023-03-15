@method=GET @endpoint=/listClients
Feature: This endpoint is used to retrieve the list of clients from GovStack.

  @smoke @unit @positive
  Scenario: Successfully retrieved the list of clients from GovStack

    Given User wants to retrieve the the list of Clients of GovStack
    When User sends GET request
    Then User receives a response from the listClients endpoint
    And The listClients endpoint response should be returned in a timely manner
    And The listClients endpoint response should have status 200
    And The listClients endpoint response should match json schema

  @unit @positive
  Scenario: Successfully retrieved the list of clients from GovStack with optional parameters in the request
    Given User wants to retrieve the the list of Clients of GovStack
    When User sends GET request
    And User provides optional query parameters "<serviceId>" as serviceId, "<instanceId>" as instanceId and optional header "<X-GovStack-Client>" as X-GovStack-Client
    Then User receives a response from the listClients endpoint
    And The listClients endpoint response should be returned in a timely manner
    And The listClients endpoint response should have status 200
    And The listClients endpoint response should match json schema

    Examples: Valid data
    | serviceId  | instanceId  | X-GovStack-Client | 
    | serviceId1 | instanceId1 | x-govstack-client |
    | serviceId2 | instanceId2 | y-govstack-client |
    | serviceId3 | instanceId3 | z-govstack-client |
    | serviceId4 | instanceId4 | h-govstack-client |
