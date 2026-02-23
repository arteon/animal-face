#!/bin/bash
set -euo pipefail

STAGE=${1:-dev}
REGION="ap-northeast-2"

echo "=== Animal Face - Deployment (${STAGE}) ==="

# 1. Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js required"; exit 1; }
command -v aws >/dev/null 2>&1 || { echo "AWS CLI required"; exit 1; }
command -v npx >/dev/null 2>&1 || { echo "npx required"; exit 1; }

# 2. Check SSM parameter exists
echo "[1/5] Checking SSM parameters..."
aws ssm get-parameter --name "/animal-face/${STAGE}/db-password" --with-decryption --region ${REGION} > /dev/null 2>&1 || {
    echo "ERROR: SSM parameter /animal-face/${STAGE}/db-password not found."
    echo "Create it with: aws ssm put-parameter --name '/animal-face/${STAGE}/db-password' --value 'YOUR_PASSWORD' --type SecureString --region ${REGION}"
    exit 1
}

# 3. Deploy backend
echo "[2/5] Deploying backend..."
cd "$(dirname "$0")"
npx serverless deploy --stage ${STAGE} --region ${REGION}

# 4. Get outputs
echo "[3/5] Getting deployment outputs..."
API_URL=$(npx serverless info --stage ${STAGE} --region ${REGION} 2>/dev/null | grep -o 'https://[^ ]*' | head -1)
S3_BUCKET="animal-face-frontend-${STAGE}"
CF_DIST_ID=$(aws cloudformation describe-stacks --stack-name "animal-face-${STAGE}" --region ${REGION} --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' --output text 2>/dev/null || echo "")

# 5. Build and deploy frontend
echo "[4/5] Building frontend..."
cd ../frontend
VITE_API_URL="${API_URL}" npm run build

echo "[5/5] Deploying frontend to S3..."
aws s3 sync dist/ "s3://${S3_BUCKET}" --delete --region ${REGION}

# 6. Invalidate CloudFront cache
if [ -n "${CF_DIST_ID}" ]; then
    echo "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id "${CF_DIST_ID}" --paths "/*" --region ${REGION}
fi

echo ""
echo "=== Deployment Complete ==="
echo "API: ${API_URL}"
echo "S3:  s3://${S3_BUCKET}"
[ -n "${CF_DIST_ID}" ] && echo "CF:  ${CF_DIST_ID}"
