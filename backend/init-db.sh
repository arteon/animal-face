#!/bin/bash
set -euo pipefail

STAGE=${1:-dev}
REGION="ap-northeast-2"

echo "=== Initialize Database ==="

# Get RDS endpoint
RDS_HOST=$(aws cloudformation describe-stacks --stack-name "animal-face-${STAGE}" --region ${REGION} --query 'Stacks[0].Outputs[?OutputKey==`RDSEndpoint`].OutputValue' --output text)
DB_PASSWORD=$(aws ssm get-parameter --name "/animal-face/${STAGE}/db-password" --with-decryption --region ${REGION} --query 'Parameter.Value' --output text)

echo "RDS Host: ${RDS_HOST}"
echo "Applying schema..."

PGPASSWORD="${DB_PASSWORD}" psql -h "${RDS_HOST}" -U animalface_admin -d animal_face -f "$(dirname "$0")/schema.sql"

echo "Schema applied successfully!"
