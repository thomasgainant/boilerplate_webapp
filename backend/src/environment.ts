let env:any = {
    production: false,

    appName: "Boilerplate web app",
    mainURL: "https://example.com",
    domain: "example.com",

    userNameFormat: new RegExp(/^[A-Za-z0-9]{3,}$/),
    registrationExpiration: 60, //In minutes
    registrationCleanupRoutineFrequency: 30000, //In milliseconds

    tokenExpiration: '1d',
    salt: "boilerplate web app by thomas gainant",

    dbType: 'postgres',
    dbHost: 'localhost',
    dbPort: 5432,
    dbUsername: 'postgres',
    dbPassword: 'postgres',
    dbDatabase: 'test',

    smtpHost: "smtp.example.com",
    smtpPort: 587,
    smtpUser: "test",
    smtpPassword: "test"
};

export { env };