# mcitmocks

## Setup

### Database

- This project uses PostgreSQL for a database, so please download Postgres
  from [their website](https://www.postgresql.org) if you do not already have it.
- Create a database named `mcitmocks_dev` to use in the dev environment
- Set up user with the username `mcitmocks` and password `password` to access the DB.

### Starting the Server

- Please download and use `yarn` as a package manager
- The server files are located at the root.
- By default, this should start at `localhost:8080`

```js
yarn
yarn start
```

### Starting the Client

- Please download and use `yarn` as a package manager
- The client files are located in the client folder and use a separate `package.json`.
- In order to use live reload features during development, we've set up a proxy.
- For development, please have the server running first in the background.

```js
cd client
yarn
yarn start
```

- By default, this will start at `localhost:3000`

### Environment Variables

There are two `.env` files that are required to operate the app, one at the room and one in `client/.env`. Please use the `.env.example` as an example for what the files should look like But use the real environment variables I've provided to you separately.

### Connecting the Database

mcitmocks uses [Prisma](https://www.prisma.io/) as our DB Client. The [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) may also be useful.

In order to run migrations and update to the latest DB schema, use:

```
yarn run prisma migrate dev
```

If you have an existing database you need to (and are able to) overwrite, use:

```
yarn run prisma migrate reset
```

See the [Prisma documentation](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/) for more information.
