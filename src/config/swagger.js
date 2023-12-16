import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "1.0.0", // by default: '1.0.0'
        title: "Fit Flow", // by default: 'REST API'
        description: "Api UI Documentation", // by default: ''
    },
    servers: [
        {
            url: "http://localhost:3001", // by default: 'http://localhost:3001'
            description: "", // by default: ''
        },
        // { ... }
    ],
    tags: [
        // by default: empty Array
        {
            name: "Users", // Tag name
            description: "Users fit flow", // Tag description
        },
        {
            name: "Exercises", // Tag name
            description: "Exercises fit flow", // Tag description
        },
        {
            name: "Routines", // Tag name
            description: "Routines fit flow", // Tag description
        },
        {
            name: "Category", // Tag name
            description: "Category fit flow", // Tag description
        },

        // { ... }
    ],
    components: {}, // by default: empty object
};

const outputFile = "./swagger-output.json";
const routes = ["../v1/routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: "3.0.0"})(outputFile, routes, doc);
