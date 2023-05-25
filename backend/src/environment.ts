let env:any = {
    production: false,

    appName: "Boilerplate web app",
    mainURL: "https://example.com",
    domain: "example.com",

    userNameFormat: new RegExp(/^[A-Za-z0-9]{3,}$/),
    userStartCredits: 0,
    registrationExpiration: 60, //In minutes
    registrationCleanupRoutineFrequency: 30000, //In milliseconds

    tokenExpiration: '1d',
    asymmetricalEncryption_key: "boilerplate web app by thomas gainant",
    symmetricEncryption_algorithm: 'aes-256-cbc',
    symmetricEncryption_key: new TextEncoder().encode("32bytes..works!:Youshouldchange!"),

    dbType: 'postgres',
    dbHost: 'localhost',
    dbPort: 5432,
    dbUsername: 'postgres',
    dbPassword: 'postgres',
    dbDatabase: 'test',

    smtpHost: "smtp.example.com",
    smtpPort: 587,
    smtpUser: "test",
    smtpPassword: "test",

    paymentSecretKey: '',
    paymentFeedbackEndpointSecret: '',
    paymentApiVersion: "2022-11-15",
    paymentSuccessURL: "http://localhost:4200/payment/success",
    paymentCancelURL: "http://localhost:4200/payment/cancelled",
};

export { env };