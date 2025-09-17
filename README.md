# ProjectManagement

Project stack:
- Backend: Spring Boot (Java 21) + SQLite
- Frontend: Next.js (React / TypeScript / Mantine)
- Orchestration: Docker Compose

---
## Prerequisites
Java 21, Maven 3.9+, Node 20, Docker (Compose v2). Optional: HTTP client for API tests (`test.http`).

---
## Quick Start (Containers)
```bash
docker compose up --build           # Backend:8080 Frontend:3000
```
Stop & remove (keep DB volume):
```bash
docker compose down
```
Reset (also remove SQLite volume):
```bash
docker compose down -v
```

---
## Local Dev (Hot Reload)
Backend:
```bash
cd backend
mvn spring-boot:run
```
Frontend:
```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
npm install
npm run dev
```
Open: http://localhost:3000

---
## Common Commands
```bash
mvn -f backend/pom.xml test         # Backend tests
cd frontend && npm test             # Frontend tests
docker compose logs -f backend      # Tail backend
docker compose build backend        # Rebuild only backend
```

---
## Environment
Backend override DB path:
```bash
cd backend
SPRING_DATASOURCE_URL=jdbc:sqlite:./pm.db mvn spring-boot:run
```
Frontend API base (public): `NEXT_PUBLIC_API_URL`.

---
## Export Images (Tar creation)
Build images:
```bash
docker build -t projectmanagement-backend:1.0 ./backend
docker build -t projectmanagement-frontend:1.0 ./frontend
```
Save both into one compressed archive:
```bash
docker save projectmanagement-backend:1.0 projectmanagement-frontend:1.0 | gzip > projectmanagement-images-1.0.tar.gz
```
Load on another machine:
```bash
gunzip -c projectmanagement-images-1.0.tar.gz | docker load
```
Verify:
```bash
docker images | grep projectmanagement
```
