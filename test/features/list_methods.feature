Feature: This endpoint is used to list REST services and endpoints for a service provider.

  List of REST services and endpoints for a service provider

  Request endpoint: GET /{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/listMethods

  Scenario: Successfully retrieved the list of REST services and endpoints for a service provider
    Given Wants to retrieve the list of REST services and endpoints for a service provider
    When The request to retrieve the list of REST services and endpoints for a service provider is sent
    Then The operation returns the list of REST services and endpoints for a service provider
