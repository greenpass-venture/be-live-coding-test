import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { FastifyInstance } from "fastify";

export const start = async (app: FastifyInstance) => {
  app.register(cors, {
    origin: "http://localhost:3000",
  });

  app.register(multipart);

  /**
   * Do not modify the endpoint url
   *
   * The uploaded file will be available in the `request` object.
   * You can use the `request.file()` method to get the uploaded file.
   * The file will be in the `multipart/form-data` format.
   *
   * The uploaded file will be a CSV file with the following columns:
   * - name
   * - description
   * - emission_volume
   * - emission_unit
   * - activity_date
   *
   * Use the `csv-parse` library to parse the CSV file and transform it into an array of Activity objects.
   *
   * The `activity_date` column should be transformed into a Date object.
   * The `emission_volume` column should be transformed into a number.
   * The `createdAt` and `updatedAt` fields should be set to the current date and time.
   * The `id` field should be generated using the `uuid` library.
   *
   * Save the activities into activitiesList array from the /database/index.ts.
   *
   * The response should have a status code of 201.
   * The response should be in JSON format.
   * The response should contain the created activities.
   */
  app.post("/activities", async (request, reply) => {
    throw new Error("Not Implemented");
  });

  /**
   * Do not modify the endpoint url
   *
   * The response should have a status code of 200.
   * The response should be in JSON format.
   * The response should contain the list of activities.
   * The response should contain the following fields:
   * - id
   * - name
   * - description
   * - emissionVolume
   * - unit
   * - activityDate
   * - createdAt
   * - updatedAt
   */
  app.get("/activities", async (request, reply) => {
    throw new Error("Not Implemented");
  });

  /**
   * Do not modify the endpoint url
   *
   * The response should have a status code of 200.
   * The response should be in JSON format.
   * The response should contain the activity with the given id.
   * The response should contain the following fields:
   * - id
   * - name
   * - description
   * - emissionVolume
   * - unit
   * - activityDate
   * - createdAt
   * - updatedAt
   */
  app.get("/activities/:id", async (request, reply) => {
    throw new Error("Not Implemented");
  });

  /**
   * Do not modify the endpoint url
   *
   * The request body should contain at least one of the following fields:
   * - name
   * - description
   * - emissionVolume
   * - emissionUnit
   * - activityDate
   *
   * The response should have a status code of 201.
   * The response should be in JSON format.
   * The response should contain the updated activity.
   */
  app.patch("/activities/:id", async (request, reply) => {
    throw new Error("Not Implemented");
  });

  /**
   * Do not modify the endpoint url
   *
   * The response should have a status code of 204.
   * The response should be empty.
   */
  app.delete("/activities/:id", async (request, reply) => {
    throw new Error("Not Implemented");
  });

  await app.listen({ port: 3001, host: "localhost" });
};
