#!/bin/bash

cd ../

npx prisma migrate dev --name init

cd  script