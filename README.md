

<h1 align="center">DataBye 📊👋</h1>
<h2 align="center">CLI Database & File Anonymizer</h2>

<div align="center">

[![npm](https://img.shields.io/npm/v/databye)](https://www.npmjs.com/package/databye)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![GitHub Repo stars](https://img.shields.io/github/stars/nitzano/databye?style=flat)](https://github.com/nitzano/databye/stargazers)
![GitHub License](https://img.shields.io/github/license/nitzano/databye)
![npm](https://img.shields.io/npm/dw/databye)

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
npx databye <command> [options]

# pnpm
pnpm dlx databye <command> [options]

# yarn
yarn dlx databye <command> [options]
```

# Examples

## PostgresSQL

Mask `firstName` column in `users` table in `test` db:
```
npx databye anon-col mask -u postgresql:/localhost -db test -t users -col firstName

// { "firstName": "John" } => { "firstName": "****" }
```

## MongoDB

Scramble `lastName` column in `users` table in `test` db:
```
npx databye anon-col scramble -u mongodb://localhost -db test -t users -col lastName

// { "lastName": "Smith" } => { "lastName": "hSmti" }
```

## SQLite

Mask `firstName` column in `users` table in `dev.db`:
```
npx databye anon-col mask -e sqlite -f /home/dev.db -t users -col firstName
```

## CSV

Mask `email` column in `file.csv`:
```
npx databye anon-col mask  -e csv -f /home/file.csv -col email
```

# Anonymizers

1. 🎭 **Mask** - Masks some or all of the letters of the previous value.
2. 🔀 **Scramble** - Scrambles the order of characters inside a string randomly.

Coming Soon:

1. 🍀 **Fake** - Generate fake data instead of the previous value
2. 🧽 **Erase**  - removes the entire data
3. 👓 **Blur** – Adds random variation to numerical values while keeping them within a reasonable range.
4. ✏️ **Replace** – Substitutes sensitive words or phrases with placeholders or predefined values.
5. 🔐 **Hash** – Replaces the value with a cryptographic hash, making it irrecoverable.

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

Anonymize a single column

```
Usage: databye anon-col [options] [command]

Anonymize a single column in a table

Options:
  -e --engine <engine>           Engine (choices: "postgres", "mongo", "mariadb", "mysql", "mssql", "sqlite")
  --confirm                      Confirm before running (default: true)
  --no-confirm                   skip confirmation
  -t --table <tableName>         Table name
  -col --column <columnName>     Column name
  -db --database <databaseName>  Database name
  -pass --password <password>    database password
  -srv --server <serverName>     server to connect to
  -u --uri <connectionString>    Connection string
  -f --file <filePath>           DB File path
  -usr --user <userName>         Username to use
  -h, --help                     display help for command

Commands:
  scramble                       scramble a single column
  mask [options]                 mask a single column
  help [command]                 display help for command
```

# License

DataBye
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