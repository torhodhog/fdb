# Bruk Node.js versjon 18.17.1
FROM node:18.17.1

# Sett arbeidsmappen i containeren
WORKDIR /app

# Kopier alle filer til arbeidsmappen
COPY . .

# Installer nødvendige avhengigheter med legacy-peer-deps og ignorere feil under installasjonen av sharp
RUN npm install --legacy-peer-deps || true

# Installer sharp med verbose logging og ignorer eventuelle skriptfeil
RUN npm install --platform=linux --arch=arm64v8 sharp --legacy-peer-deps || true

# Bygg prosjektet
RUN npm run build

# Start applikasjonen
CMD ["npm", "run", "start"]
