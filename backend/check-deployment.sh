#!/bin/bash

# Deployment Status Checker for Workigom Backend
# This script helps verify if the backend is properly deployed and accessible

BACKEND_URL="https://workigom-backend.onrender.com"
FRONTEND_URL="https://workigom.vercel.app"

echo "=================================================="
echo "🔍 Workigom Backend Deployment Status Check"
echo "=================================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "Test 1: Health Check Endpoint"
echo "URL: $BACKEND_URL/api/health"
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/health" 2>/dev/null)
if [ "$HEALTH_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Health check returned 200 OK"
    HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/api/health" 2>/dev/null)
    echo "Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ FAIL${NC} - Health check returned $HEALTH_STATUS"
    echo -e "${YELLOW}Action: Check if backend is deployed and running on Render${NC}"
fi
echo ""

# Test 2: Jobs Endpoint
echo "Test 2: Jobs API Endpoint"
echo "URL: $BACKEND_URL/api/jobs"
JOBS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/jobs" 2>/dev/null)
if [ "$JOBS_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Jobs endpoint returned 200 OK"
    echo "Getting first 5 lines of response..."
    curl -s "$BACKEND_URL/api/jobs" 2>/dev/null | head -5
else
    echo -e "${RED}❌ FAIL${NC} - Jobs endpoint returned $JOBS_STATUS"
    if [ "$JOBS_STATUS" = "404" ]; then
        echo -e "${YELLOW}Action: Backend needs redeployment. Follow DEPLOY_INSTRUCTIONS.md${NC}"
    elif [ "$JOBS_STATUS" = "000" ]; then
        echo -e "${YELLOW}Action: Backend is not accessible. Check Render service status${NC}"
    else
        echo -e "${YELLOW}Action: Unexpected status. Check Render logs for errors${NC}"
    fi
fi
echo ""

# Test 3: CORS Headers
echo "Test 3: CORS Configuration"
CORS_HEADERS=$(curl -s -I -H "Origin: $FRONTEND_URL" "$BACKEND_URL/api/health" 2>/dev/null | grep -i "access-control")
if [ -n "$CORS_HEADERS" ]; then
    echo -e "${GREEN}✅ PASS${NC} - CORS headers present"
    echo "$CORS_HEADERS"
else
    echo -e "${YELLOW}⚠️  WARNING${NC} - No CORS headers detected"
    echo -e "${YELLOW}Action: Verify CORS_ORIGIN environment variable on Render${NC}"
fi
echo ""

# Test 4: Response Time
echo "Test 4: Response Time"
START_TIME=$(date +%s%N)
curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1
END_TIME=$(date +%s%N)
RESPONSE_TIME=$(( (END_TIME - START_TIME) / 1000000 ))
echo "Response time: ${RESPONSE_TIME}ms"
if [ $RESPONSE_TIME -lt 2000 ]; then
    echo -e "${GREEN}✅ PASS${NC} - Response time is good"
else
    echo -e "${YELLOW}⚠️  WARNING${NC} - Response time is slow"
    echo -e "${YELLOW}Action: Check Render service region and tier${NC}"
fi
echo ""

# Summary
echo "=================================================="
echo "📊 Summary"
echo "=================================================="
if [ "$HEALTH_STATUS" = "200" ] && [ "$JOBS_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ ALL TESTS PASSED${NC}"
    echo ""
    echo "Your backend is properly deployed and accessible!"
    echo "The /api/jobs endpoint is working correctly."
    echo ""
    echo "Next steps:"
    echo "1. Test from frontend: $FRONTEND_URL"
    echo "2. Check browser console for any errors"
    echo "3. Verify jobs are loading in the UI"
else
    echo -e "${RED}❌ SOME TESTS FAILED${NC}"
    echo ""
    echo "Action Required:"
    echo "1. Review the failed tests above"
    echo "2. Follow the recommended actions"
    echo "3. Check DEPLOY_INSTRUCTIONS.md for detailed steps"
    echo "4. After fixing, run this script again"
fi
echo "=================================================="
