@method=GET @endpoint=/{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/allowedMethods
Feature: This endpoint is used to list allowed REST services and endpoints for a service provider.	

  List of allowed REST services and endpoints for a service provider

  @smoke
  Scenario: Successfully retrieved the list of allowed REST services and endpoints for a service provider smoke type test
    
    Given Wants to retrieve the list of allowed REST services and endpoints for a service provider
    When The GET request with given "serviceId1" as serviceId, "identifier" as GovStackInstance, "identifier" as memberClass, "alp4aNum3r1c" as memberCode and "alp4aNum3r1c" as applicationCode is sent
    Then User receives a response from the allowedMethods endpoint
    And The allowedMethods endpoint response should be returned in a timely manner
    And The allowedMethods endpoint response should have status 200
    And The allowedMethods endpoint response should have content-type: application/json header
    And The allowedMethods endpoint response should match json schema


  @unit @positive
  Scenario Outline: Successfully retrieved the list of allowed REST services and endpoints for a service provider
    
    Given Wants to retrieve the list of allowed REST services and endpoints for a service provider
    When The GET request with given "<serviceId>" as serviceId, "<GovStackInstance>" as GovStackInstance, "<memberClass>" as memberClass, "<memberCode>" as memberCode and "<applicationCode>" as applicationCode is sent
    Then User receives a response from the allowedMethods endpoint
    And The allowedMethods endpoint response should be returned in a timely manner
    And The allowedMethods endpoint response should have status 200
    And The allowedMethods endpoint response should have content-type: application/json header
    And The allowedMethods endpoint response should match json schema

    Examples: Valid data
    | serviceId  | GovStackInstance | memberClass | memberCode   | applicationCode |
    | serviceId1 | identifier       | identifier  | alp4aNum3r1c | alp4aNum3r1c    |
    | serviceId2 | a11a11a11a       | asd2211a    | 12as12       | m3mb3rc0d3      |
    | serviceId3 | a552example      | zzz321a     | m3mb3rc0d3   | aa15            |
    | serviceId4 | valid1dentifi3r  | rand0mid3nt | str1ng       | azxcv55         |
