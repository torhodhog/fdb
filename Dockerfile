FROM node:18

# Sett arbeidskatalogen
WORKDIR /app

# Kopier package.json og yarn.lock
COPY package.json yarn.lock ./

# Installer avhengigheter med yarn
RUN yarn install --ignore-engines

# Kopier resten av applikasjonen
COPY . .

# Bygg applikasjonen
RUN yarn build

# Start applikasjonen
CMD ["yarn", "start"]