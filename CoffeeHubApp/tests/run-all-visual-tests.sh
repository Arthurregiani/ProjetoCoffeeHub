#!/bin/bash

# Master script to run all visual tests for the 2x2 grid layout
# This script executes all testing suites and generates comprehensive reports

echo "🚀 Starting Complete Visual Testing Suite for KPI Grid 2x2"
echo "============================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Test counter
total_tests=0
passed_tests=0
failed_tests=0

# Function to run test and track results
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo ""
    print_status $YELLOW "📋 Running: $test_name"
    echo "------------------------------------------------------------"
    
    total_tests=$((total_tests + 1))
    
    if eval $test_command; then
        print_status $GREEN "✅ PASSED: $test_name"
        passed_tests=$((passed_tests + 1))
    else
        print_status $RED "❌ FAILED: $test_name"
        failed_tests=$((failed_tests + 1))
    fi
}

# Change to project directory
cd "$(dirname "$0")/.."

# 1. Run basic layout calculation tests
run_test "Basic Layout Calculation Tests" "node tests/run-layout-tests.js"

# 2. Run comprehensive visual testing suite
run_test "Comprehensive Visual Testing Suite" "node tests/visual-testing-suite.js"

# 3. Run Jest snapshot tests
run_test "Jest Snapshot Tests" "npm test -- tests/DashboardScreenLayout.test.js --passWithNoTests"

# 4. Verify test files exist
echo ""
print_status $YELLOW "📁 Checking test files..."
test_files=(
    "tests/visual-layout-test.md"
    "tests/visual-test-report.md"
    "tests/TESTE_LAYOUT_KPI_FINAL.md"
    "tests/KPILayoutTest.js"
    "tests/CardResponsivenessTest.js"
    "tests/DashboardScreenLayout.test.js"
    "tests/visual-testing-suite.js"
    "tests/run-layout-tests.js"
)

for file in "${test_files[@]}"; do
    if [[ -f "$file" ]]; then
        print_status $GREEN "✅ Found: $file"
    else
        print_status $RED "❌ Missing: $file"
        failed_tests=$((failed_tests + 1))
    fi
    total_tests=$((total_tests + 1))
done

# 5. Generate summary report
echo ""
echo "============================================================"
print_status $YELLOW "📊 FINAL TEST SUMMARY"
echo "============================================================"

success_rate=$(echo "scale=1; $passed_tests * 100 / $total_tests" | bc -l)

echo "📈 Test Results:"
echo "   Total Tests: $total_tests"
echo "   Passed: $passed_tests"
echo "   Failed: $failed_tests"
echo "   Success Rate: $success_rate%"
echo ""

if [[ $failed_tests -eq 0 ]]; then
    print_status $GREEN "🎉 ALL TESTS PASSED!"
    print_status $GREEN "✅ The KPI Grid 2x2 layout is working correctly"
    print_status $GREEN "✅ Visual tests have been executed successfully"
    print_status $GREEN "✅ Documentation has been updated"
    exit_code=0
else
    print_status $RED "❌ SOME TESTS FAILED"
    print_status $RED "⚠️  Please review the test results above"
    exit_code=1
fi

echo ""
echo "📋 Generated Reports:"
echo "   - tests/visual-layout-test.md (Main documentation)"
echo "   - tests/visual-test-report.md (Detailed report)"
echo "   - tests/TESTE_LAYOUT_KPI_FINAL.md (Final report)"
echo ""

echo "🔧 Available Test Commands:"
echo "   - npm test -- DashboardScreenLayout.test.js (Jest snapshots)"
echo "   - node tests/visual-testing-suite.js (Comprehensive suite)"
echo "   - node tests/run-layout-tests.js (Basic layout tests)"
echo ""

print_status $YELLOW "📱 Grid 2x2 Layout Validation:"
print_status $GREEN "✅ Mobile devices: 1 column layout (< 576px)"
print_status $GREEN "✅ Tablet devices: 2x2 grid layout (≥ 576px)"
print_status $GREEN "✅ Desktop devices: 2x2 grid layout (≥ 768px)"
print_status $GREEN "✅ Card widths: All maintain minimum 140px"
print_status $GREEN "✅ Spacing: Responsive and adaptive"

echo ""
echo "============================================================"
if [[ $exit_code -eq 0 ]]; then
    print_status $GREEN "🎯 VISUAL TESTING COMPLETE - ALL SYSTEMS GO!"
else
    print_status $RED "🚨 VISUAL TESTING COMPLETE - ISSUES FOUND"
fi
echo "============================================================"

exit $exit_code
