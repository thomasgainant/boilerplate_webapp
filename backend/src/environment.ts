let env:any = {
    production: false,

    appName: "Boilerplate web app",
    mainURL: "https://example.com",
    domain: "example.com",

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