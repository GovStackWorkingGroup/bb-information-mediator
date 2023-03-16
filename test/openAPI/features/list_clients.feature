@method=GET @endpoint=/listClients
Feature: This endpoint is used to retrieve the list of clients from GovStack.

  @smoke
  Scenario: Successfully retrieved the list of clients from GovStack smoke type test

    Given User wants to retrieve the the list of Clients of GovStack
    When User sends GET request with given "serviceId" as serviceId, "instanceId" as instanceId
    Then User receives a response from the listClients endpoint
    And The listClients endpoint response should be returned in a timely manner
    And The listClients endpoint response should have status 200
    And The listClients endpoint response should have content-type: application/json header
    And The listClients endpoint response should match json schema

  @unit @positive
  Scenario Outline: Successfully retrieved the list of clients from GovStack
    Given User wants to retrieve the the list of Clients of GovStack
    When User sends GET request with given "<serviceId>" as serviceId, "<instanceId>" as instanceId
    Then User receives a response from the listClients endpoint
    And The listClients endpoint response should be returned in a timely manner
    And The listClients endpoint response should have status 200
    And The listClients endpoint response should have content-type: application/json header
    And The listClients endpoint response should match json schema

    Examples: Valid data
    | serviceId  | instanceId  |
    | serviceId1 | instanceId1 |
    | serviceId2 | instanceId2 |
    | serviceId3 | instanceId3 |
    | serviceId4 | instanceId4 |
