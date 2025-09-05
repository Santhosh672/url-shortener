# URL Shortener (MERN Stack)

A simple URL Shortener built with the **MERN stack** (MongoDB, Express, React, Node.js).
This project implements **Base62 encoding** for generating short URLs (reference: [GeeksforGeeks System Design – URL Shortener](https://www.geeksforgeeks.org/system-design/system-design-url-shortening-service/)).

Users can enter a long URL, generate a short one, store it in a **local MongoDB**, and be redirected when visiting the short link.

---

## 🚀 Features

* Shorten long URLs using **Base62 encoding**
* Store URLs in **local MongoDB database**
* Redirect users to original URLs when visiting short links
* Simple React frontend for URL input and short URL display

---

## 🛠️ Tech Stack

* **Frontend:** React + Chakra UI
* **Backend:** Node.js + Express
* **Database:** MongoDB (via MongoDB Compass for local testing)

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

### 2️⃣ Install Dependencies

Install required modules for both backend and frontend:

#### Backend

```bash
cd backend
npm install express mongoose cors dotenv
```

#### Frontend

```bash
cd ../frontend
npm install react react-dom react-router-dom axios @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

---

### 3️⃣ Setup MongoDB (Local)

1. Install [MongoDB Compass](https://www.mongodb.com/try/download/compass).
2. Start MongoDB service locally.
3. Note your **MongoDB URI**, usually:

   ```
   mongodb://127.0.0.1:27017/
   ```

---

### 4️⃣ Create `.env` file (Backend)

Inside `/backend/.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/ (example)
```

---

### 5️⃣ Update Frontend API URL

In `/frontend/src/Home.jsx`, update the backend URL:

```js
const backendUrl = http://localhost:5000;
axios.post(backendUrl + "/api/shorten", { originalUrl: enteredUrl })
```

*(Change `localhost:5000` if backend runs elsewhere)*

---

### 6️⃣ Run the App

#### Start Backend

```bash
npm run dev
```

#### Start Frontend

```bash
cd ../frontend
npm run dev
```

---

## 📌 Usage

1. Enter a long URL in the frontend form.
2. Get a **shortened URL** displayed.
3. Copy & paste the shortened URL in browser → redirects to original link.


## 📝 Future Improvements

* Add user authentication
* Track number of clicks per short URL
* Add analytics dashboard
  
