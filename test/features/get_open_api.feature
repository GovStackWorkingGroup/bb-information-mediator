# @method=GET @endpoint=/{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/getOpenAPI
Feature: Retrieve openAPI description of the specified REST service

  Retrieve openAPI description of the specified REST service

  @smoke
  Scenario: Retrieve the openAPI description of the specified REST service smoke type test

    Given User wants to retrieve the openAPI description of the specified REST service
    When User sends GET request with given "identifier" as GovStackInstance "identifier" as memberClass "alp4aNum3r1c" as memberCode "alp4aNum3r1c" as applicationCode
    Then User receives a resonse
    And The response should match json schema
    And The response should have status 200
    And The response should be returned in a timely manner


  @unit @happyregression
  Scenario Outline: Retrieve the openAPI description of the specified REST service

    Given User wants to retrieve the openAPI description of the specified REST service
    When User sends GET request with given "<GovStackInstance>" as GovStackInstance "<memberClass>" as memberClass "<memberCode>" as memberCode "<applicationCode>" as applicationCode
    Then User receives a resonse
    And The response should match json schema
    And The response should have status 200
    And The response should be returned in a timely manner
    And The response header content-type should be "application/json; charset=utf-8"
    
    
    Examples: Valid data
    | GovStackInstance | memberClass | memberCode   | applicationCode |
    | identifier       | identifier  | alp4aNum3r1c | alp4aNum3r1c    |
    | a11a11a11a       | asd2211a    | 12as12       | m3mb3rc0d3      |
    | a552example      | zzz321a     | m3mb3rc0d3   | aa15            |
    | valid1dentifi3r  | rand0mid3nt | str1ng       | azxcv55         |


  @unit @negativeregression
  Scenario Outline: Unable to retrieve the openAPI description of the specified REST service

    Given User wants to retrieve the openAPI description of the specified REST service
    When User sends GET request with given "<GovStackInstance>" as GovStackInstance "<memberClass>" as memberClass "<memberCode>" as memberCode "<applicationCode>" as applicationCode
    Then User receives a resonse
    And The response should match json schema
    And The response should have status 400
    And The response should be returned in a timely manner
    
    Examples: Invalid data
    | GovStackInstance | memberClass | memberCode   | applicationCode |
    | 1nval1d          | identifier  | alp4aNum3r1c | alp4aNum3r1c    |
    | identifier       | 1nval1d     | alp4aNum3r1c | alp4aNum3r1c    |
    | identifier       | identifier  | _invalid     | alp4aNum3r1c    |
    | identifier       | identifier  | str1ng       | _invalid        |
    | 1nval1d          | 1nval1d     | _invalid     | _invalid        |
