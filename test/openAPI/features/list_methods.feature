@method=GET @endpoint=/{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/listMethods
Feature: This endpoint is used to list REST services and endpoints for a service provider.

  @smoke
  Scenario: Successfully retrieved the list of REST services and endpoints for a service provider
    Given Wants to retrieve the list of REST services and endpoints for a service provider
    When User sends GET request with given "serviceId" as serviceId, required path params and header
    Then User receives a response from the listMethods endpoint
    And The listMethods endpoint response should be returned in a timely manner
    And The listMethods endpoint response should have status 200
    And The listMethods endpoint response should have content-type header
    And The listMethods endpoint response should match json schema

  @unit @positive
  Scenario: Successfully retrieved the list of REST services and endpoints for a service provider
    Given Wants to retrieve the list of REST services and endpoints for a service provider
    When User sends GET request with given "serviceId" as serviceId, "<GovStackInstance>" as GovStackInstance "<memberClass>" as memberClass "<memberCode>" as memberCode "<applicationCode>" as applicationCode
    Then User receives a response from the listMethods endpoint
    And The listMethods endpoint response should be returned in a timely manner
    And The listMethods endpoint response should have status 200
    And The listMethods endpoint response should have content-type header
    And The listMethods endpoint response should match json schema

    Examples: Valid data
    | serviceId  | GovStackInstance | memberClass | memberCode   | applicationCode |
    | serviceId1 | identifier       | identifier  | alp4aNum3r1c | alp4aNum3r1c    |
    | serviceId2 | a11a11a11a       | asd2211a    | 12as12       | m3mb3rc0d3      |
    | serviceId3 | a552example      | zzz321a     | m3mb3rc0d3   | aa15            |
    | serviceId4 | valid1dentifi3r  | rand0mid3nt | str1ng       | azxcv55         |
