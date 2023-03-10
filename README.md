# cook-unity 

# Design Decisions

The application was implemented using typescript, express and nodejs. Even though the same application could have been done using a different stack that might be better for this use case (e.g: golang) I decided to implemented it with typescript because it is widely used in the company (and I was just curious :P)
In real-life scenario I should consider the functional and non-functional (quality attributes) of the application we want to build in order to decide the programming language. (e.g: in this case since we expect to have between 1k to 5M requests per minute which is ~83k rps we might have wanted to use golang which was designed specifically for efficient and concurrent handling of requests and I/O operations).


# Architecture

The application was developed using clean architecture design guidelines.

The code is separated into independent layers (domain, infrastructure and presentation) where each of these has its own responsibility. This makes it easier to maintain and evolve the code, test each layer isolated and as a whole (e.g: it easy to create mocks), etc.

 
`__mocks__` directory contains mocks for the 2 APIs that the system is integrated with.

`__test__` directory contains unit tests (jest)

 
# How to run the app locally

- create a `.env` file in the root of the project and add your `FIXER_API_KEY=XXXXXXXXXXXXXX`
  


# Further Improvements and Next Steps

- Some tests where added as an example but we definitely need more coverage
- The system uses an in-memory repository for the example (since we just need to keep track of the longestDistance value and country name), it would be easy to replace it for a postgres database or similar just by changing the implementation of the repository interface. 
> **Note:**  I also added a Map of (ip, trace) in memory just for testing purposes, this could get big since the map stores ipv4 (2^32) -> Trace objects. For production we should consider using a different implementation.
- Add a cache (Redis?) for the API calls for both integrations. Make sure to select a reasonable TTL for the records (e.g: ip addresses change every 24 hs in general.)
- API calls could be done in parallel. Now when creating a new trace we are calling both Fixer and ip-api sequentially.
- Add circuit breaker to API integrations ('node-circuit-breaker')
- Add dependency injection (inversify?)
- Add integration tests
- Add docker-compose support for multicontainer setup for both production and for development
- Add CI/CD pipelines, so every time we push a new change to the repo new images are created and eventually automatically deployed to production (e.g: when we merge/rebase to main/master or every time we create a new tag in the repo)
