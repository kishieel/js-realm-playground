#!/bin/bash

docker compose exec auth-1 yarn prisma migrate dev
docker compose exec auth-2 yarn prisma migrate dev
docker compose exec users-1 yarn prisma migrate dev
docker compose exec users-2 yarn prisma migrate dev
docker compose exec posts-1 yarn prisma migrate dev
docker compose exec posts-2 yarn prisma migrate dev
