# syntax=docker/dockerfile:1

# Base stage
FROM node:17-alpine as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci  # Using npm's ci command for more reproducible builds
COPY . .

# Development stage
FROM base as development
EXPOSE 3000
CMD ["npm", "start"]

# Build stage
FROM base as build
RUN npm run build

# Production stage
FROM nginx:alpine as production
EXPOSE 80
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
