# BB OpenAPI spec test

This test ensures that OpenAPI descriptions of one of Building Blocks are usable by IM.
Tested BB is defined in `.env` file. Committed version of repo uses Workflow BB for this test.
Test ckeckouts tested BB to current directory. Then X-Road security server is deployed and configured. For mocking endpoints Caddy instance is used.
All API specifications from `api` directory of checked out repo is loaded.
This is done by calling

```
./test_entrypoint.sh
```

Test checks that services are discoverable and endpoints are invocable.

```
./run-test.sh
```

