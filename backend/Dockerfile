FROM python:3.12-bullseye

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    postgresql-client &&\
    rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . .

RUN python3 manage.py migrate