FROM node:20-alpine
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Expose application port
EXPOSE 3000

# Switch to a non-root user
RUN adduser -D appuser
USER appuser

# Command to start the application
CMD ["npm", "start"]
