export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API for admin, private, and public routes",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "token"
                },
                BasicAuth: {
                    type: "http",
                    scheme: "basic"
                }
            }
        },
        security: [
            {
                BearerAuth: [],
            },
            {
                BasicAuth: [],
            }
        ] as Array<Record<string, any>>
    },
    apis: ["./src/endpoints/*.ts"],
};

export default options;
