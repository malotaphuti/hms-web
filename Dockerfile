FROM node:lts-alpine as builder

# Install dependencies for development
RUN apk add --no-cache python3-dev g++ make

# Set working directory
WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Create a production image based on the builder
FROM alpine:latest

# Set working directory
WORKDIR /app

# Copy the built Next.js app from the builder
COPY --from=builder /app/_next /app/_next
COPY --from=builder /app/public /app/public

# Expose the port for Next.js (replace with your desired port)
EXPOSE 3000

# Command to run the Next.js production server
CMD ["node", "_next/server/index.js"]