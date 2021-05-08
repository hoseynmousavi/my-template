#!/bin/bash
npm i --legacy-peer-deps &&
npm i -g pm2 &&
rm package-lock.json &&
cp -n env-sample.txt .env &&
echo "MODULES INSTALLED"
