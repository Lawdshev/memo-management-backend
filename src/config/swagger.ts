import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Memo Management API",
      version: "1.0.0",
      description:
        "REST API for managing memos. Protected routes require a Bearer JWT token obtained from the /api/auth/login endpoint.",
    },
    servers: [
      {
        url: "/",
        description: "Current server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "JWT token obtained from POST /api/auth/login. Include it as: Authorization: Bearer <token>",
        },
      },
      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: {},
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            errors: {},
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", format: "email", example: "jane@example.com" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
            isVerified: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Memo: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            title: { type: "string", example: "Project Update" },
            content: { type: "string", example: "The project is on track..." },
            owner: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            sharedWith: {
              type: "array",
              items: { type: "string" },
              example: ["64f1a2b3c4d5e6f7a8b9c0d3"],
            },
            tags: {
              type: "array",
              items: { type: "string" },
              example: ["project", "update"],
            },
            isDraft: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        PaginatedMemos: {
          type: "object",
          properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 10 },
            totalItems: { type: "integer", example: 42 },
            result: {
              type: "array",
              items: { $ref: "#/components/schemas/Memo" },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
