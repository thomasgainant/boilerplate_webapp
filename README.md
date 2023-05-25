# Boilerplate web app

My base project for my web app projects. Separated into a backend and frontend part but the frontend part can be used for creating mobile apps too.

Simply fork this project to have a working web application project on which you can build a whole new project.

## Backend

Tech stack : NestJS 9 + RxJS 7.2 + TypeORM 0.3 + Passport 0.6 + PostgreSQL

Other notable modules: dayjs 1.11, nodemailer 6.8, uuid 9.0.0, crypto module

Created on Typescript 4.3 but works fine on 4.x

Thought so the DB runs in a Docker container. Be careful with the port configuration as they have to be correctly mapped on your container.

Run the app using `npm run start`

### Configuration

Configuring your app is mostly made through changes inside the environment.ts file under /src:

- Change the DB connection data (user, password, port, database...)
- Change the driver to another DBMS if needed, using the `dbType` property. TypeORM handles a lot of different ones (MySQL, MariaDB, SQLite, Mongo, etc...).
- Change the length of the validity of your authentication token if needed, using the `tokenExpiration` property. Outside of this expiration range, logged in users will have to log again for authentication.
- Change your SMTP email server data in order to be able to get users registered (your app must be able to send emails with a confirmation link).
- Change the private key `symmetricalEncryption_key` used for symmetric encryption (must be 32 letters long for the default algorithm)
- Give your Stripe secret key in the `paymentSecretKey` property
- Give your Stripe webhook secret key in the `paymentFeedbackEndpointSecret` property
- Change the redirection URLs from Stripe to the frontend when a payment was successfully processed or failed, using the property `paymentSuccessURL` and `paymentCancelURL`

### Implementation

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

### User registration

Two endpoints are offered for user registration:

/register will create an unconfirmed user when it receives the correct data scheme, as described in the createUserDto.ts. It will then send a confirmation link to the user's email address.

/confirm will be used for confirming the user registration. This endpoint needs a confirmation key which has been sent to the user via email when he asked for registration.

For users asking for registration but never confirming it, there is a cleanup routine which deletes all the users who stayed unconfirmed for too long. This period before expiration of the unconfirmed registration is configurable inside the environment.ts file at the `registrationExpiration` property.

Don't forget to configure your SMTP data, the registration expiration date and the frequency of the cleanup routine in the environment.ts file in order to make everything work good.

### Product purchase

It is possible to have a basic cashflow in your app through the use of Stripe. Two endpoints are used to enable this:

/payment/:productId will start a purchase for a product with the given id. This endpoint will give the url to redirect the client to, directly to a Stripe checkout form.

/payment/feedback is used by Stripe to send feedback from the events happening during the purchase (for instance, a payment has been processed or failed). You have to configure a webhook correctly (giving the right URL to this endpoint, the events you want to observe, etc.) inside the Stripe dashboard, which will take care of this feedback.

Your Stripe account need to be configued and you need to give its provided keys inside your environment.ts file.

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