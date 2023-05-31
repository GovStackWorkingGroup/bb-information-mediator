# GovStack: "Information Mediator" Working Group

Architecture and specification sketches for the ITU/DIAL/GIZ/Estonia GovStack
project

## Introduction

The information mediator provides a gateway between external digital
applications and other ICT Building Blocks, thereby ensuring interoperability
and implementation of standards, which is essential for integrating various ICT
Building Blocks and applications.

The scope of the information mediator BB has changed over time, but currently it
consists of two critical "layers":

1. Secure Exchange of Information (think X-Road)
2. A Global PubSub Service

Diagrams for these layers are provided in the `./diagrams` folder and are a good
place to start.

## Documents

0. [The Overview Slides](https://docs.google.com/presentation/d/1ialGb9OavEo1T2v8dzy6JVp-aOHnERLCXLbO4NNs1CY)

1. [The IM BB Specification](https://docs.google.com/document/d/1PhAUsLhQnVwqDjnkTIl9XXi7Yghtn1TlBvOEt2aoNEw)
   itself
2. [The Diagrams](https://lucid.app/lucidspark/ae9dba58-c15d-43b2-b8ef-9d15f6bd746c)
   on LucidChart
3. [Running Meeting Notes](https://docs.google.com/document/d/1i51twkx7B7QrPTpcdZ4LlJ5B8jJi_Stpokq1VeRjFhw)
   (note that this has largely been replaced by the "Key Decision Log" at the
   bottom of the Specification document)

## Other

### Notes for the Workflow Engine BB

1. a potential
   [workflow engine spec](https://docs.openfn.org/documentation/portability#proposal-v2-latest)

## Test data

In order to properly call the tests, a file with input data has been created.

The data must exist in tested software before running the tests.

This data are compatible with the data used in the tests and they are stored in
the `openAPI` folder in the `test-data.json`.

## Run Cucumber tests

Cucumber-js is used to execute test harness to check compability of application
api with BB test definitions.

### Mock server

Launch the mock server from examples/mock folder. The instruction is located in
'examples/mock' folder in file README.md

### Cucumber tests

To install project's dependencies, navigate to folder 'test' and execute the
following command:

```
yarn install
```

Then to execute all tests scenarios use the following command:

```
yarn test
```

or

```
npx cucumber-js
```

To execute specific test scenario use the following command:

```
npx cucumber-js features/<file_name>
```

example:

```
npx cucumber-js features/data_update_or_create.feature
```
