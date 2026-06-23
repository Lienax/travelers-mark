# Travelers Mark

A containerized backend project using .NET 8 Web API, PostgreSQL, and Seq.

## Prerequisites

- Docker Desktop installed and running.

## Configuration

Before launching the project, configure the environment and secret files.

### 1. Environment Variables

Initialize the configuration file from the provided template:

```bash
cp .env.example .env
```

Define the following credentials in the `.env` file:

- `SEQ_FIRSTRUN_ADMINUSERNAME`: Seq admin username
- `SEQ_FIRSTRUN_ADMINPASSWORDHASH`: Seq admin password hash (generated via CLI)

*Note: The `.env` file is ignored by Git to ensure sensitive credentials remain local.*

### Generating Seq Password Hash

To generate the required hash for `SEQ_FIRSTRUN_ADMINPASSWORDHASH`, execute:

```bash
echo 'YourPassword' | docker run --rm -i datalust/seq:2025.2 config hash
```

Replace `YourPassword` with your desired admin password. Copy the resulting output string and use it as the value for `SEQ_FIRSTRUN_ADMINPASSWORDHASH` in `.env`.

### 2. Database Secrets

Create the following files in the `postgres/` directory. Each file must contain **only** the required value in plain text:

- `postgres_user.txt`: Database admin username
- `postgres_password.txt`: Database admin password
- `postgres_db.txt`: Initial database name

*Note: These files are ignored by Git. Copy the provided `.example` templates in the `postgres/` directory to create these files.*

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