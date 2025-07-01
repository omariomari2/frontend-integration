# Running the Project: JobSeek Frontend & Backend

This guide will help you set up and run both the **frontend** and **backend** of the JobSeek project on your local machine.

---

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (v8 or higher recommended)
- **Git**
- (Optional) **Expo Go** app for mobile testing ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

---

## MongoDB Requirements & Options

The backend requires a MongoDB database. You have several options:

### 1. **Local MongoDB (Recommended for Development)**
- [Download and install MongoDB Community Edition](https://www.mongodb.com/try/download/community)
- Start MongoDB:
  - On Windows (as a service):
    ```sh
    net start MongoDB
    ```
  - Or run in a terminal:
    ```sh
    mongod
    ```
    (You may need to specify the data directory, e.g., `mongod --dbpath C:\data\db`)

### 2. **MongoDB with Docker**
- If you have Docker installed, run:
  ```sh
  docker run -d -p 27017:27017 --name mongo mongo
  ```

### 3. **MongoDB Atlas (Cloud, Free Tier)**
- [Sign up for MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a free cluster and get your connection string (e.g., `mongodb+srv://...`)
- Update your backend connection string (see below)

### 4. **Update the Backend Connection String**
- The backend expects MongoDB at `mongodb://localhost:27017` by default.
- To use a different MongoDB URI (e.g., Atlas), set the `MONGODB_URI` environment variable in a `.env` file in `backend-main/`:
  ```env
  MONGODB_URI=your-mongodb-connection-string
  ```

---

## 1. Clone the Repository

```sh
git clone https://github.com/your-username/frontend-integration.git
cd frontend-integration
```

---

## 2. Install Dependencies

### Backend
```sh
cd backend-main
npm install
```

### Frontend
```sh
cd ../frontend-main
npm install
```

---

## 3. Running the Backend

From the `backend-main` directory:

```sh
npm start
```
- This will start the backend server (usually on `http://localhost:5000` or as configured).
- Make sure the backend is running before starting the frontend for full API functionality.

---

## 4. Running the Frontend (Web)

From the `frontend-main` directory:

```sh
npm run web
```
- This will start the Expo web server (default: `http://localhost:8081` or next available port).
- If prompted about port usage, accept the suggested port.
- Open the provided URL in your browser.

### Running on Mobile (Optional)
- Install the **Expo Go** app on your device.
- Run:
  ```sh
  npm start
  ```
- Scan the QR code with Expo Go to preview the app on your device.

---

## 5. Troubleshooting

### Metro/Expo Bundler Errors
- If you see errors like `Unable to resolve ... from ...` or module not found:
  1. **Clear the cache:**
     ```sh
     npx expo start -c
     ```
  2. **Delete and reinstall node_modules:**
     ```sh
     rm -rf node_modules package-lock.json
     npm install
     ```
     (On Windows, delete these manually if needed.)

### MongoDB Connection Errors
- If you see errors like `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`:
  - Make sure MongoDB is running (locally, via Docker, or Atlas).
  - If using Atlas or a remote DB, check your connection string and network/firewall settings.
  - Ensure your `.env` file in `backend-main/` has the correct `MONGODB_URI`.

### Port Already in Use
- If you see `Port 8081 is being used by another process`, accept the next available port or stop the process using that port.

### Backend Not Connecting
- Ensure the backend is running before using features that require API calls (profile, jobs, etc).
- Check the API base URL in frontend config if you changed backend port.

### Dependency Issues
- If you see errors about missing or incompatible packages, try:
  ```sh
  npm install
  ```
  in both `backend-main` and `frontend-main`.

---

## 6. Common Commands

| Command                | Directory         | Description                       |
|------------------------|-------------------|-----------------------------------|
| `npm install`          | backend-main/     | Install backend dependencies      |
| `npm install`          | frontend-main/    | Install frontend dependencies     |
| `npm start`            | backend-main/     | Start backend server              |
| `npm run web`          | frontend-main/    | Start frontend (web)              |
| `npm start`            | frontend-main/    | Start Expo (mobile/web)           |
| `npx expo start -c`    | frontend-main/    | Start Expo with cache clear       |

---

## 7. Additional Notes

- **Environment Variables:**
  - If required, create a `.env` file in `backend-main` or `frontend-main` and set necessary variables (see README for details).
- **API Base URL:**
  - The frontend expects the backend at `http://localhost:5000` by default. Change in `frontend-main/src/config/api.ts` if needed.
- **Platform Support:**
  - Web: Fully supported
  - Mobile: Use Expo Go for preview

---

## 8. Getting Help

- If you encounter issues, check the terminal output for errors and follow troubleshooting steps above.
- For persistent problems, search the error message online or consult the project README.

---

Happy coding! 