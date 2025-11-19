
# Monolith (Medium)
Endpoints:
- GET /             -> welcome
- POST /order       -> create order (calls notification)
- POST /user        -> create user (calls notification)
- GET /healthz
Env to use notification service:
  USE_NOTIFICATION_SERVICE=true
  NOTIFY_URL=http://localhost:3000
