#!/bin/bash
# Quick Setup Guide - Physical Therapy Injury Management System
# دليل الإعداد السريع - نظام إدارة الإصابات الرياضية

echo "======================================================"
echo "🏥 Physio Injury Management System - Quick Setup"
echo "======================================================"
echo ""

# Step 1: Check Node.js
echo "📦 Checking environment..."
node --version
npm --version
echo ""

# Step 2: Install dependencies (if needed)
echo "📥 Installing dependencies..."
npm install
echo ""

# Step 3: Create Supabase tables
echo "🗄️  Setting up Supabase database..."
echo ""
echo "⚠️  IMPORTANT - Manual Step Required:"
echo ""
echo "1. Go to: https://supabase.com/dashboard"
echo "2. Select your project"
echo "3. Go to SQL Editor"
echo "4. Click 'New Query'"
echo "5. Copy and paste the entire contents of: supabase/schema.sql"
echo "6. Click 'Run'"
echo ""
echo "Wait for confirmation that all tables were created successfully."
echo ""

# Step 4: Verify connection
echo "🔌 Testing Supabase connection..."
npm run test:supabase 2>/dev/null || echo "⚠️  Run 'npm run test:supabase' after setting up"
echo ""

# Step 5: Migration info
echo "======================================================"
echo "📊 Data Migration"
echo "======================================================"
echo ""
echo "To import existing injury data from hardcoded catalog:"
echo ""
echo "Option 1: Using Admin Panel (Recommended)"
echo "  1. Start dev server: npm run dev"
echo "  2. Go to: http://localhost:5173/admin/injuries"
echo "  3. Click 'Import Legacy Data' button"
echo ""
echo "Option 2: Using Terminal"
echo "  1. Run: npm run migrate:data"
echo ""
echo "Option 3: Manual SQL Insert"
echo "  1. Use supabase/migrations/insert-sample-data.sql"
echo "  2. Paste in SQL Editor and run"
echo ""

# Step 6: Next steps
echo "======================================================"
echo "✅ Setup Complete!"
echo "======================================================"
echo ""
echo "Next steps:"
echo "  1. Verify tables created in Supabase dashboard"
echo "  2. Run data migration"
echo "  3. Test admin panel: http://localhost:5173/admin/injuries"
echo "  4. Review imported data"
echo "  5. Add Arabic translations"
echo "  6. Update InjuryDetailPage.tsx to use Supabase"
echo "  7. Update InjuryProtocolsPage.tsx to use Supabase"
echo "  8. Test all pages"
echo ""
echo "📖 Full documentation: see INJURY_MANAGEMENT_SETUP.md"
echo ""
