#!/bin/sh

set -e

aws dynamodb --profile local --endpoint-url http://localhost:8000 --no-cli-pager create-table \
    --table-name redirects \
    --attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=N \
    --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST || true