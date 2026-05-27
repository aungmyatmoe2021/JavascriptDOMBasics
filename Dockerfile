FROM nginx:latest AS builder

WORKDIR /usr/share/nginx/html

COPY . .

FROM nginx:latest AS runner

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/share/nginx/html /usr/share/nginx/html

RUN chown -R appuser:appgroup /usr/share/nginx/html

USER appuser