FROM nginx:latest

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/share/nginx/html

COPY . .

RUN chown -R appuser:appgroup /usr/share/nginx/html

USER appuser