# CS3219 OTOT Task E

* **Name**: Yusuf Bin Musa
* **Matric. Number**: A0218228E
* **Repo Link**: [https://github.com/yusufaine/OTOT-E](https://github.com/yusufaine/OTOT-E)

## Task E: Caching Task

This report would highlight the benefits of using Redis in an application that frequently reads from a database or a remote endpoint.
A local instance of Redis would be used as part of the demonstration, but a [hosted version](https://redis.com/try-free/) of it is also
possible with the main difference is specifying the Redis credentials.

### Requirements

1. Redis
2. Docker (for Redis-alpine)
3. Express (or any backend)

### Running the application

Ensure that a `.env` is filled with the following filled in:

```
EXPRESS_PORT=8080

# if left blank, it assumes local instance of Redis is used
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
```


```bash
# install the modules
yarn

# start redis and run the application
yarn dev

# teardown
yarn shut
```

### Demonstration

The following endpoints are used in the demonstration or are for utility purposes.

1. `/graphql`: Gets data from a public endpoint, approximately 7 seconds per call.
2. `/redis`: Tries to get the same data of (1) from Redis if it exists, else does (1) and populates redis with the `summaries` key.
   * Data is set to expire every 30 seconds.
3. `/redis-clear`: Utility endpoint, flushes redis.

Here, it can be observed that (1) and the intialising of a value in (2) averages around 6 seconds, but after (2) has been populated, it
takes orders of magnitudes faster. (~200x). 

#### Without Redis

![graphql](https://i.ibb.co/jwYHLBN/image.png)

<div style="page-break-after: always"></div>

#### With Redis

![redis](https://i.ibb.co/THJHyKV/image.png)

