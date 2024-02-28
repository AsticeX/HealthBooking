import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vaccine API",
      version: "1.0.0",
      description: "API documentation for VacAlert Express API",
    },
  },
  apis: ["./swagger/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
