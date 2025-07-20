FROM alpine:3.17

# Install curl & unzip
RUN apk add --no-cache unzip curl

# Download PocketBase binary
RUN curl -L -o pb.zip https://github.com/pocketbase/pocketbase/releases/download/v0.20.7/pocketbase_0.20.7_linux_amd64.zip \
    && unzip pb.zip \
    && rm pb.zip

# Start PocketBase on port 10000
CMD ["./pocketbase", "serve", "--http", "0.0.0.0:10000"]
