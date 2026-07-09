# Travelers Mark

A containerized backend project using .NET 8 Web API, PostgreSQL, and Seq.

## Prerequisites

- Docker Desktop installed and running.

## Configuration

Before launching the project, configure the environment and secret files.

### 1. Environment Variables

Initialize the environment configuration file from the provided template:

```bash
cp .env.example .env
```

#### Generating Seq Password Hash

Before configuring the variables, generate the required admin password hash by executing:

```bash
echo 'YourPassword' | docker run --rm -i datalust/seq:2025.2 config hash
```

Replace `YourPassword` with your desired admin password. Copy the resulting output string.

#### Defining Credentials

Open the `.env` file and define the following credentials, using the generated hash from the previous step:

- `SEQ_FIRSTRUN_ADMINUSERNAME`: Seq admin username
- `SEQ_FIRSTRUN_ADMINPASSWORDHASH`: The Seq admin password hash you just generated

*Note: The `.env` file is ignored by Git to ensure sensitive credentials remain local.*

### 2. Database Secrets

Initialize the database secret files from the provided templates inside the `postgres/` directory:

```bash
cp postgres/postgres_user.txt.example postgres/postgres_user.txt
cp postgres/postgres_password.txt.example postgres/postgres_password.txt
cp postgres/postgres_db.txt.example postgres/postgres_db.txt
```

Open each file and replace the content with your required value (each file must contain **only** a single plain text value):

- `postgres_user.txt`: Database admin username
- `postgres_password.txt`: Database admin password
- `postgres_db.txt`: Initial database name

*Note: These files are ignored by Git to prevent exposing database credentials.*

### 3. Backend Application Secrets

Initialize the local secrets file for the backend application:

```bash
cp backend/src/Api/appsettings.Secrets.json.example backend/src/Api/appsettings.Secrets.json
```

#### Generating JWT Secret Key

Before opening the file, generate a secure 256-bit random string for `Jwt:SecretKey` by executing:

```bash
openssl rand -base64 32
```

Copy the resulting output string.

#### Defining Secret Configurations

Open the newly created `appsettings.Secrets.json` and define the following secret configurations:

- `ConnectionStrings:DefaultConnection`: Your local PostgreSQL connection string
- `Jwt:SecretKey`: The secure random string you just generated (Must be at least 256 bits / 32 characters long)

*Note: The `appsettings.Secrets.json` file is ignored by both Git (`.gitignore`) and Docker (`.dockerignore`) to ensure credentials remain local and are never baked into images.*

## Getting Started

Once the configuration files are initialized, launch the project using Docker Compose:

```bash
docker compose -p travelers-mark up -d
```

Once running, you can access the services at the following URLs:

**Seq Dashboard**: `http://localhost:5341`

**Backend API**: `http://localhost:5000`

## Stopping the Project

To stop the containers, run the following command:

```bash
docker compose -p travelers-mark stop
```

*Note: Use `stop` to pause the containers while preserving all data and current state. To remove the containers entirely, use `docker compose -p travelers-mark down`.*

## Request & Response Flow

The backend utilizes a Vertical Slice Architecture (VSA) to process incoming traffic. Every HTTP request and its corresponding response passes through a structured pipeline:

- **Request Flow**: `HTTP Request` ➔ `Middleware` ➔ `Controller` ➔ `MediatR Pipeline (IPipelineBehavior)` ➔ `Handler (IRequestHandler)`
- **Response Flow**: `Response` bubbles back up through the same layers in reverse order (`Handler` ➔ `Pipeline` ➔ `Controller` ➔ `Middleware`)

This structure ensures that cross-cutting concerns (such as FluentValidation) are decoupled from the core business logic handled within individual vertical slices.