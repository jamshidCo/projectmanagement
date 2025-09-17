# Lightweight Node base image
FROM node:20-alpine

# Work directory inside container
WORKDIR /app

# Create a simple placeholder server (remove once real frontend exists)
RUN printf 'const http=require("http");const p=3000;http.createServer((q,r)=>{r.end("Frontend placeholder running on port "+p);}).listen(p,()=>console.log("Dummy frontend started on",p));\n' > server.js

# Non-root user for safety
RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3000

# Start the placeholder server
CMD ["node","server.js"]
