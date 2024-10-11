# Use a imagem oficial do Node.js
FROM node:16 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Faça o build da aplicação
RUN npm run build

# Use uma imagem leve para servir o app
FROM nginx:alpine

# Copie os arquivos construídos para o diretório do Nginx
COPY --from=build /app/dist/corridas-app /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

