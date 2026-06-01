# Task Memory: task_10.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Implement Docker Compose execution for backend and frontend so
  `docker compose up --build` serves the API on port 8000 and the React app on
  port 80.

## Important Decisions
- Production frontend will call relative `/api/*` paths through an nginx proxy
  to the `backend` Compose service to avoid browser-side Docker DNS and CORS
  issues.
- Backend Docker image will install the package with `pip install .` from
  `pyproject.toml` and will not copy or use the repository `.venv`.

## Learnings
- Baseline check on 2026-05-30: `backend/Dockerfile`,
  `frontend/Dockerfile`, `docker-compose.yml`, `docker-compose.dev.yml`, and
  `.dockerignore` were all absent.
- Docker verification requires `COMPOSE_BAKE=false DOCKER_BUILDKIT=0` in this
  workspace because default BuildKit/Bake fails before build with a gRPC header
  error related to non-printable characters.

## Files / Surfaces
- Planned surfaces: Dockerfiles, Compose files, root `.dockerignore`, frontend
  API base URL handling, nginx proxy config, and Docker configuration tests.
- Touched: `backend/Dockerfile`, `frontend/Dockerfile`,
  `frontend/nginx.conf`, `docker-compose.yml`, `docker-compose.dev.yml`,
  `.dockerignore`, `frontend/src/servicos/clienteApiPlanta.ts`,
  `frontend/package-lock.json`, and
  `backend/tests/test_docker_configuracao.py`.

## Errors / Corrections
- First Compose build reached `frontend/Dockerfile` and failed at `npm ci`
  because `frontend/package-lock.json` was out of sync with `package.json`
  for esbuild optional packages. Ran `npm install` locally to refresh the
  lockfile while preserving `npm ci` in the Dockerfile.
- Retry showed the refreshed lockfile is valid locally with npm 11, but npm 10
  in `node:20-alpine` still rejects nested optional peer entries from Vite 8
  under Vitest. Switched the Docker image install step to `npm install` to keep
  the demo build functional on the Node 20 base image.

## Ready for Next Run
- Task 10 verified with backend pytest coverage 99%, frontend test coverage
  92.59% statements, production frontend build, Docker Compose up/build,
  backend health curl, frontend HTML curl, proxied `/api/planta/estado` curl,
  and Compose down.
