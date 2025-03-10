# Build the UI
FROM node:lts-alpine3.15 AS client-builder
WORKDIR /app/client

COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock

ARG TARGETARCH
RUN yarn config set cache-folder /usr/local/share/.cache/yarn-${TARGETARCH}
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn-${TARGETARCH} yarn --network-timeout 1000000 

COPY client /app/client
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn-${TARGETARCH} yarn build --network-timeout 1000000 


# Build the service
FROM golang:1.17-alpine AS service-builder
ENV CGO_ENABLED=0
RUN apk add --update make
WORKDIR /plugin
COPY . .
RUN make bin

# Bring it all together
FROM alpine:3.15
LABEL org.opencontainers.image.title="Khulnasoft Tunnel" \
    org.opencontainers.image.description="Run unlimited vulnerability scans against remote or locally stored images. Understand any security issues that may be present in images before you pull and use them." \
    org.opencontainers.image.vendor="Khulnasoft Security Software" \
    com.docker.desktop.extension.api.version=">= 0.2.0" \
    com.docker.desktop.extension.icon="https://raw.githubusercontent.com/khulnasoft/tunnel-docker-extension/main/tunnel.svg" \
    com.docker.extension.publisher-url="https://tunnel.khulnasoft.com" \
    com.docker.extension.screenshots="[{\"alt\": \"Tunnel Dark Screenshot\", \"url\": \"https://raw.githubusercontent.com/khulnasoft/tunnel-docker-extension/main/.github/images/screenshot.png\"},{\"alt\": \"Tunnel light screenshot\", \"url\": \"https://raw.githubusercontent.com/khulnasoft/tunnel-docker-extension/main/.github/images/screenshot_light.png\"}]" \
    com.docker.extension.detailed-description="<h1>Free and Unlimited Vulnerability Scanning</h1><h3>Take control of your application security with Tunnel</h3>Tunnel is the world’s most popular open source vulnerability and misconfiguration scanner. It is reliable, fast, extremely easy to use, and it works wherever you need it. <ul><li>Scan locally stored images by choosing from the list</li><li>Scan remote images simply by entering the name in the search box</li><li>Filter by the severity of the vulnerability or optionally only show issues with fixes</li></ul>" \
    com.docker.extension.additional-urls="[{\"title\":\"Tunnel Website\",\"url\":\"https://tunnel.khulnasoft.com/\"},{\"title\":\"Issues\",\"url\":\"https://github.com/khulnasoft/tunnel/issues\"},{\"title\":\"Slack\",\"url\":\"https://slack.khulnasoft.com/\"}]" \
    com.docker.extension.category="security"

COPY --from=client-builder /app/client/dist ui
COPY --from=service-builder /plugin/bin/creds-service /
COPY tunnel.svg .
COPY metadata.json .
COPY service/docker-compose.yaml .

CMD /creds-service 