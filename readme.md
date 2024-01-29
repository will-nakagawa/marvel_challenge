# Marvel API Exfiltrate Data 

This is a challenge solution to exfiltrate data from marvel api. It was built in nodejs with hapijs and kex frameworks, and postgres as database. 

## 🚀 Starting

Create a .env file in the root of the project with your marvel private and public key.

```
MARVEL_PRIVATE_KEY={YOUR_MARVEL_PRIVE_KEY_HERE}
MARVEL_PUBLIC_KEY={YOUR_MARVEL_PUBLIC_KEY_HERE}
MARVEL_BASE_URL=https://gateway.marvel.com/v1/public
DB_HOST=postgres
DB_DATABASE=marvel
DB_USERNAME=postgres
DB_PASSWORD=example
DB_URL=postgres://postgres:example@postgres:5432
PORT=4000
```

Get docker containers up and running postgres and nodejs app.

```
docker-compose up -d
```

It will trigger the first data collect job and start a web service with a route that you can re-trigger the data collection for updates. Check the logs to get trace information and done!

```
http://localhost:4000/characters/start <--- this will retrigger data collection
```
You can also run a command line within the container or in a local installation with the command:

```
npm run command-line
```

## 📋 Run with Docker

```
docker-compose up -d
```

### 🔧 Local Instalation without docker

Remember that you will need to have postgres installed up and running and edit the .env file.

To create a first migration use the command bellow

```
npm run knex:migrate:latest
```

or create a character table in your postgres instance - init.sql file

```
CREATE TABLE public."characters" (
	id int4 NOT NULL,
	"name" varchar(255) NOT NULL,
	description varchar(1000) NULL,
	picture varchar(1000) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT characters_name_unique UNIQUE (name),
	CONSTRAINT characters_pkey PRIMARY KEY (id)
);
```

To install it locally first run "npm install" to install the packages dependencies:

```
npm intall
```

To run as a dev:

```
npm run dev
```

To run as a service:

```
npm start
```

To run as command line:

```
npm run command-line
```

## 🛠️ Tools

Tools that was used to build this:

* [nodejs](https://nodejs.org/en) - Nodejs
* [hapijs](https://hapi.dev/) - Hapijs
* [kexjs](https://knexjs.org/) - Kexjs
