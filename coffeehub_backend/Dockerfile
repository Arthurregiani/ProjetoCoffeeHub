# Use uma imagem base Python
FROM python:3.11-slim-buster

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /code

# Copie o arquivo de requisitos e instale as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que o Django usará
EXPOSE 8000

# Comando padrão para iniciar o servidor Django (será sobrescrito pelo docker-compose)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
