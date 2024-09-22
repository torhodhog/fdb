# Bruk en base image med Node.js
FROM node:18

# Sett arbeidskatalogen
WORKDIR /app

# Kopier package.json og package-lock.json
COPY package*.json ./

# Installer avhengigheter
RUN npm install --legacy-peer-deps

# Kopier resten av applikasjonen
COPY . .

# Bygg applikasjonen
RUN npm run build

# Start applikasjonen
CMD ["npm", "start"]