import Fastify, { FastifyInstance } from "fastify";
import FromData from "form-data";
import fs from "fs";
import { start } from "../src/app";

describe("activities", () => {
  let app: FastifyInstance;
  let activityId = "";

  beforeAll(async () => {
    app = Fastify();
    await start(app);
  });

  afterAll(() => {
    app.close();
  });

  it("should return the an empty list of activities", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/activities",
    });

    expect(response.statusCode).toBe(200);

    const receivedActivities = response.json();

    expect(receivedActivities).toEqual([]);
  });

  it("should create a list of activities from the uploaded file and return them", async () => {
    // use a sample CSV file for testing
    const csvFilePath = "./__tests__/activities_sample.csv";
    const form = new FromData();
    form.append("file", fs.createReadStream(csvFilePath));

    const response = await app.inject({
      method: "POST",
      url: "/activities",
      payload: form,
      headers: {
        Accept: "application/json",
        "Content-Type": `multipart/form-data; boundary=${form.getBoundary()}`,
      },
    });

    expect(response.statusCode).toBe(201);
    const createdActivities = response.json();
    expect(createdActivities.length).toBe(20);
    expect(createdActivities[0]).toEqual({
      id: expect.any(String),
      name: "Activity_1",
      description: "Description of activity 1",
      emissionVolume: 1000,
      unit: "kg",
      activityDate: new Date("2025-01-01T00:00:00Z").toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should return all the uploaded activities", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/activities",
    });

    expect(response.statusCode).toBe(200);

    const activitiesList = response.json();
    expect(activitiesList.length).toBe(20);
    expect(activitiesList[0]).toEqual({
      id: expect.any(String),
      name: "Activity_1",
      description: "Description of activity 1",
      emissionVolume: 1000,
      unit: "kg",
      activityDate: new Date("2025-01-01T00:00:00Z").toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    activityId = activitiesList[19].id;
  });

  it("should return the activity with the given id", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/activities/${activityId}`,
    });

    expect(response.statusCode).toBe(200);

    const activity = response.json();

    expect(activity).toEqual({
      id: expect.any(String),
      name: "Activity_20",
      description: "Description of activity 20",
      emissionVolume: 10500,
      unit: "l",
      activityDate: new Date("2025-08-02T00:00:00Z").toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should update the description of an activity with the given id", async () => {
    const response = await app.inject({
      method: "PUT",
      url: `/activities/${activityId}`,
      payload: {
        description: "Updated description",
      },
    });

    expect(response.statusCode).toBe(200);

    const updatedActivity = response.json();

    expect(updatedActivity).toEqual({
      id: expect.any(String),
      name: "Activity_20",
      description: "Updated description",
      emissionVolume: 10500,
      unit: "l",
      activityDate: new Date("2025-08-02T00:00:00Z").toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should update all the fields of an activity with the given id", async () => {
    const response = await app.inject({
      method: "PUT",
      url: `/activities/${activityId}`,
      payload: {
        name: "Updated Activity",
        description: "Updated new description",
        emissionVolume: 2000,
        emissionUnit: "kg",
        activityDate: new Date("2025-01-01T00:00:00Z").toISOString(),
      },
    });

    expect(response.statusCode).toBe(200);

    const updatedActivity = response.json();

    expect(updatedActivity).toEqual({
      id: expect.any(String),
      name: "Updated Activity",
      description: "Updated new description",
      emissionVolume: 2000,
      unit: "kg",
      activityDate: new Date("2025-01-01T00:00:00Z").toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should delete the activity with the given id", async () => {
    const response = await app.inject({
      method: "DELETE",
      url: `/activities/${activityId}`,
    });

    expect(response.statusCode).toBe(204);

    const getResponse = await app.inject({
      method: "GET",
      url: `/activities/${activityId}`,
    });

    expect(getResponse.statusCode).toBe(404);

    const getAllResponse = await app.inject({
      method: "GET",
      url: "/activities",
    });
    expect(getAllResponse.statusCode).toBe(200);
    const activitiesList = getAllResponse.json();
    expect(activitiesList.length).toBe(19);
    expect(activitiesList).not.toContainEqual(
      expect.objectContaining({
        id: activityId,
      })
    );
  });
});
