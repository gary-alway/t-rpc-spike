# Migration service

Migration service for Strapi

## Architecture

![image architecture](./design/architecture.png)
![image data model](./design/data-model.png)
![image sample data](./design/sample-data.png)

## Environment variables

| Variable              | Description           |
| --------------------- | --------------------- |
| AWS_ACCESS_KEY_ID     | AWS access key ID     |
| AWS_SECRET_ACCESS_KEY | AWS secret access key |

## Scripts

```bash
# docker compose up
yarn infra:up

# docker compose down
yarn infra:down

# run dev mode
yarn dev
```
