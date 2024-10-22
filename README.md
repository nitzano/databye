

<h1 align="center">DataZar 📊👋</h1>
<h2 align="center">CLI Database & File Anonymizer</h2>

<div align="center">

[![npm](https://img.shields.io/npm/v/datazar-cli)](https://www.npmjs.com/package/datazar-cli)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![GitHub Repo stars](https://img.shields.io/github/stars/nitzano/datazar?style=flat)](https://github.com/nitzano/datazar/stargazers)
![GitHub License](https://img.shields.io/github/license/nitzano/datazar)
![npm](https://img.shields.io/npm/dw/datazar-cli)

</div>

A command-line tool to anonymize and transform sensitive data in databases, files, and datasets without writing a single line of code. Supports various databases types and file formats. 

- [Usage](#usage)
- [Examples](#examples)
  - [PostgresSQL](#postgressql)
  - [MongoDB](#mongodb)
  - [SQLite](#sqlite)
  - [CSV](#csv)
- [Anonymizers](#anonymizers)
- [Support](#support)
  - [Databases](#databases)
  - [Files](#files)
- [CLI](#cli)
  - [anon-col](#anon-col)
- [License](#license)


# Usage


```
# npm
npx datazar-cli <command> [options]

# pnpm
pnpm dlx datazar-cli <command> [options]

# yarn
yarn dlx datazar-cli <command> [options]
```

# Examples

## PostgresSQL

Mask `firstName` column in `users` table in `test` db:
```
npx datazar-cli anon-col postgres \ 
  --uri postgresql:/localhost \
  --database test \
  --table users \
  --column firstName \
  mask

// { "firstName": "John" } => { "firstName": "****" }
```

## MongoDB

Scramble `lastName` column in `users` table in `test` db:
```
npx datazar-cli anon-col mongo 
  --uri mongodb://localhost \
  --database test \ 
  --table users \ 
  --column lastName \
  scramble

// { "lastName": "Smith" } => { "lastName": "hSmti" }
```

## SQLite

Mask `firstName` column in `users` table in `dev.db`:
```
npx datazar-cli anon-col sqlite \
   --uri /home/dev.db \
   --table users \
   --column firstName \
    mask
```

## CSV

Fake `email` column in `file.csv` with a fake one:
```
npx datazar-cli anon-col csv \ 
  --file /home/file.csv \ 
  --column email \ 
  fake email
```

# Anonymizers

1. 🎭 **Mask** - Masks some or all of the letters of the previous value.
2. 🔀 **Scramble** - Scrambles the order of characters inside a string randomly.
1. 🍀 **Fake** - Generate fake data instead of the previous value

Coming Soon:

1. 🧽 **Remove**  - removes the entire data
2. 🖋️ **Constant** – Substitutes sensitive words or phrases with placeholders or predefined values.
3. 🔐 **Hash** – Replaces the value with a cryptographic hash, making it irrecoverable.
4. 👓 **Blur** – Adds random variation to numerical values while keeping them within a reasonable range.

# Support

## Databases

1. MongoDB 
2. PostgresSQL
3. MariaDB
4. MySQL
5. MSSQL
6. SQLite
7. Neo4J (Coming Soon)
8. DynamoDB (Coming Soon)
9. Redis (Coming Soon)
10. CouchDB (Coming Soon)

## Files 

1. CSV 
2. JSON (Coming Soon)
3. XML (Coming Soon)
4. XSLX (Coming Soon)
5. Parquet (Coming Soon)
6. YAML (Coming Soon)



# CLI

## anon-col 

Anonymize a single column in a table

```
Usage: anon-col <engine> [engine_options] <anonymizer> [anonymizer_options]
```

# License

DataZar
Copyright (C) 2024 Nitzan Ohana

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.