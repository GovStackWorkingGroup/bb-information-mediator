Feature: This endpoint is used to list allowed REST services and endpoints for a service provider.	

  List of allowed REST services and endpoints for a service provider

  Request endpoint: GET /{GovStackInstance}/{memberClass}/{memberCode}/{applicationCode}/allowedMethods

  Scenario: Successfully retrieved the list of allowed REST services and endpoints for a service provider
    Given Wants to retrieve the list of allowed REST services and endpoints for a service provider
    When The request to retrieve the list of allowed REST services and endpoints for a service provider is sent
    Then The operation returns the list of allowed REST services and endpoints for a service provider
