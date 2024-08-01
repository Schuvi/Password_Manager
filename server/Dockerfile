FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port and start the application
EXPOSE 3000
CMD ["node", "index.js"]
