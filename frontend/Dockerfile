# Dockerfile for Frontend
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Install serve to serve the built frontend
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Start the frontend
CMD ["serve", "-s", "build", "-l", "3000"]
