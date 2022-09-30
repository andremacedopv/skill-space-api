# SkillSpace API

SkillSpace is a course platform built to create customizable courses and manage a community around it. 
This repository contains only the API part of SkillSpace. It is necessary to execute [SkillSpace Front](https://github.com/andremacedopv/skill-space-front) simultaneously to run SkillSpace's complete application.

## ⚙️ Installation
- Install npm
- Install NodeJs
- Install MySQL

## 🚀 How to use

- run `npm install` to install dependencies
- Set the enviroment variables creating a .env file with the following keys:

```yaml
DB_USER = "root"
DB_PASSWORD = "your_password"
TKN_SECRET = "SecretToken"

STORAGE_TYPE=local

BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
```
- Create the database using the following commands
  - `npx run db-create` to create the database
  - `npx run db-migrate` to execute the migrations
  - `npx run db-seed` to create pre-defined elements on the database
- run `npm start` to start the project on port 3333

## Other Database methods
- `npx run db-drop` to delete the database
- `npx run db-reset` to execute the drop, create, migrate and seed commands
