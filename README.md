# Backend Live Coding Test

This project is a backend application designed to manage activities. It includes endpoints for creating, retrieving, updating, and deleting activities, as well as bulk creation via file upload.

---

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: Version `18.X.X` or higher
- **npm**: Version `8.X.X` or higher

---

### How to run

To start the server, follow these steps:

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

The server will start on the host and port specified in the `.env` file (default: `localhost:3001`).

---

### Activity Data Model

The activity data model is defined in [`src/database/index.ts`](src/database/index.ts). It includes the following fields:

- `id`: Unique identifier (string)
- `name`: Name of the activity (string)
- `description`: Description of the activity (string)
- `emissionVolume`: Emission volume (number)
- `unit`: Unit of measurement (string)
- `activityDate`: Date of the activity (Date)
- `createdAt`: Timestamp when the activity was created (Date)
- `updatedAt`: Timestamp when the activity was last updated (Date)

---

### Tasks

The following endpoints need to be implemented in [`src/app.ts`](src/app.ts):

### 1. POST `/activities`
- **Description**: Supports bulk creation of activities via file upload.
- **Details**:
  - Accepts a CSV file with the following columns:
    - `name`
    - `description`
    - `emission_volume`
    - `emission_unit`
    - `activity_date`
  - Use the sample file [`src/file_samples/activities.csv`](src/file_samples/activities.csv) for testing.
  - Parses the CSV file and transforms it into an array of activities.
  - Adds the activities to the in-memory `activitiesList`.

### 2. GET `/activities`
- **Description**: Retrieves the list of all activities.
- **Response**:
  - Status code: `200`
  - JSON array of activities.

### 3. GET `/activities/{id}`
- **Description**: Retrieves a specific activity by its ID.
- **Response**:
  - Status code: `200` (if found) or `404` (if not found)
  - JSON object of the activity.

### 4. PATCH `/activities/{id}`
- **Description**: Updates an existing activity by its ID.
- **Request Body**:
  - `name`
  - `description`
  - `emissionVolume`
  - `unit`
  - `activityDate`
- **Response**:
  - Status code: `200` (if updated) or `404` (if not found)
  - JSON object of the updated activity.

### 5. DELETE `/activities/{id}`
- **Description**: Deletes an activity by its ID.
- **Response**:
  - Status code: `204` (if deleted) or `404` (if not found)

---

## Testing

To run the tests, use the following command:
```sh
npm test
```

This will execute all test cases and generate a coverage report.

---
