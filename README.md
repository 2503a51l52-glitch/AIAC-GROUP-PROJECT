📄 README.md
# Monolith to Microservices Refactor — Notification Service Extraction

This project demonstrates how to refactor a monolithic Node.js application into a microservices-based architecture by extracting the **Notification Service** as an independent microservice.  
The monolith communicates with the Notification Service using REST APIs, improving modularity, scalability, maintainability, and deployment flexibility.

---

## 🚀 Project Overview

### Monolith Features
- `/order` → Create order and send order notification  
- `/user` → Create user and send welcome notification  
- Uses a **NotificationClient** to communicate with microservice  
- Feature flag to switch between legacy and new service  
- Runs on **http://localhost:4000**

### Notification Service Features
- `/notify` → Accepts and validates notification requests  
- Email & SMS provider stubs  
- AJV-based schema validation  
- Clean dispatcher architecture  
- Runs on **http://localhost:3000**

---

## 🧱 Architecture



┌──────────────────┐ HTTP POST ┌────────────────────────┐
│ MONOLITH APP │ --------------------▶ │ NOTIFICATION SERVICE │
└──────────────────┘ └────────────────────────┘
│ │
│ Validates + Sends │
▼ ▼
Order/User Modules Email / SMS Providers


---

## 📂 Folder Structure

### Monolith


monolith-medium/
├── app.js
├── package.json
├── routes/
│ ├── order.js
│ └── user.js
└── src/libs/
├── NotificationClient.js
└── legacyProvider.js


### Notification Service


notification-service-medium/
├── src/
│ ├── index.js
│ ├── dispatch/dispatcher.js
│ ├── providers/
│ │ ├── emailProvider.js
│ │ └── smsProvider.js
│ └── validators/notificationValidator.js
└── package.json


---

## 🏃‍♂️ How to Run the Project

### 1️⃣ Run the Notification Service (FIRST)
Open CMD:
```cmd
cd notification-service-medium
npm install
npm start


Service starts at:
👉 http://localhost:3000

Test:

curl http://localhost:3000/healthz

2️⃣ Run the Monolith (SECOND)

Open NEW CMD window:

cd monolith-medium
npm install
set USE_NOTIFICATION_SERVICE=true
set NOTIFY_URL=http://localhost:3000
npm start


Monolith starts at:
👉 http://localhost:4000

3️⃣ Test the Integration
Create an order:
curl -X POST http://localhost:4000/order ^
  -H "Content-Type: application/json" ^
  -d "{\"orderId\":\"1001\",\"userEmail\":\"sam@example.com\",\"userName\":\"Sam\"}"

Create a user:
curl -X POST http://localhost:4000/user ^
  -H "Content-Type: application/json" ^
  -d "{\"userId\":\"501\",\"email\":\"sam@example.com\",\"name\":\"Samyu\"}"


You should see messages in the notification service terminal:

(emailProvider) sending to sam@example.com body:...

✅ Features Demonstrated
✔ Microservice extraction
✔ Clean API communication
✔ Request validation
✔ Provider-based architecture
✔ Feature flags (toggle new/old system)
✔ Realistic development structure
🔮 Future Improvements

Add real email sending (Nodemailer, Gmail API)

Add SMS integration (Twilio API)

Store notification logs in MongoDB

Add async processing with RabbitMQ/Kafka

Add retry mechanism and rate limiting

Deploy both services using Docker or Kubernetes

🏁 Conclusion

This project is a complete demonstration of how a monolithic application can be modernized into microservices.
By separating the Notification Service, the architecture becomes cleaner, scalable, independently deployable, and future-ready.
