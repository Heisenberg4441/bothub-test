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
                url: "http://localhost:3000", // Замените на ваш базовый URL
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "token" // Указывает, что это обычный токен, а не JWT
                },
                BasicAuth: {
                    type: "http",
                    scheme: "basic" // Используется для Basic авторизации
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
        ] as Array<Record<string, any>> // Указание типа для security
    },
    apis: ["./src/endpoints/*.ts"], // Указать путь к вашим файлам с кодом
};

export default options;
