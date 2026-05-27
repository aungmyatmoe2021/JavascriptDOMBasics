FROM nginx:latest

RUN addgroup -S appgroup && adduser -S appuser -G appgrou

WORKDIR /usr/share/nginx/html

COPY . .

RUN chown -R appuser:appgroup /app

USER appuser