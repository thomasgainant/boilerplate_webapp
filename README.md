# Boilerplate web app

My base project for my web app projects. Separated into a backend and frontend part but the frontend part can be used for creating mobile apps too.

Simply fork this project to have a working web application project on which you can build a whole new project.

## Backend

Tech stack : NestJS 8 + RxJS 7.2 + TypeORM 0.3 + Passport 0.6 + PostgreSQL

Created on Typescript 4.3 but works fine on 4.x

Thought so the DB runs in a Docker container. Be careful with the port configuration as they have to be correctly mapped on your container.

Run the app using `npm run start`

### Configuration

- Change the DB connection data in the environment.ts file under /src (user, password, port, database...)
- Change the driver in this environment.ts file to another DBMS if needed, TypeORM handles a lot of different ones (MySQL, MariaDB, SQLite, Mongo, etc...)
- Change the length of the validity of your authentication token if needed, using the `tokenExpiration` property. Outside of this expiration range, logged in users will have to log again for authentication.
- Create a new entity in the src/data folder by copying the example.entity.ts file and renaming its content accordingly. This is used by the TypeORM repository to map an object to a database structure (happens at the start of the app) and vice versa (when using a Repository directly in a Service's code).
- Create a new domain/functionality using this new entity by using the nest command `nest g resource [domainname]`. This will generate a new folder with a controller mapping generic CRUD endpoints in the API and a service in which your business logic on your entity should happen. Use the entities you created in the src/data.
- Create mock data by populating the `addMockData()` method inside the app.service.ts file. There is already, for instance, an example user "admin".

### User authentication

An endpoint is implemented so you can send your user login information in order to log in to an account. You can log into the application using the dummy account "admin".

**POST on /login**
`{
  "login": "admin",
  "password": "admin"
}`

You will receive a token which is to be saved on the frontend part and sent as a Bearer token, in the header of every request in which authenticating a user is needed. The token is by default valid for one day (see configuration).

You can then secure your application by adding the correct decorators on the endpoint where authentication is needed, just like on the example `/user` endpoint defined in the app.controller.ts file. What does your endpoint do with your authenticated user is up to you to be implemented. If your endpoint is inside a distinct module, don't forget to add the AuthModule to the imports of your module, just like in the default AppModule.

### Docs

Use the [official NestJS documentation](https://docs.nestjs.com/).

For database/ORM related problems, use the [NestJS database doc](https://docs.nestjs.com/techniques/database) and the [TypeORM documentation](https://typeorm.io/).

## Frontend

Tech stack : Angular 13.3 + RxJS 7.5 + Custom state management + TailwindCSS 3.2

Created on on Typescript 4.6.

Angular can be easily updated to 14 if needed, use the [official update guide](https://update.angular.io/).

Run the app using `ng serve --o`

### Configuration

- Creating new functionalities follows the typical Angular process, using commands such as `ng g c [componentname]`. This is an Angular app.
- For new state management functionalities, create a new Store/Query couple in the src/data/[domain] folder by copying the example.store.ts and example.query.ts files and renaming them and the name of the classes inside of them
- Use the environment files in /src/environments to save your API access in production and development environment.

### Docs

[Official Angular documentation](https://angular.io/api/core/Component)

For styling, check the [official Tailwind documentation](https://tailwindcss.com/docs/display).

### Switch web frontend to mobile

If you need a mobile client app instead of an only web one, this is an Angular app so easily added on a [Capacitor](https://capacitorjs.com/) app.