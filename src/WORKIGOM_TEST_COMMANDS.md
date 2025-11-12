# 🧪 WORKIGOM - PROJECT-SPECIFIC TEST COMMANDS

## 📋 Ready-to-Use Test Commands for Browser Console

Bu dosya, Workigom projesi için özelleştirilmiş test komutlarını içerir.

---

## 1. 🔧 Initial Setup Check

### Check if Supabase is Configured
```javascript
// Import helpers
import { isSupabaseConfigured, getAuthStorageKey, validateStorageData } from './utils/supabase/client';

// Check configuration
console.log('Supabase configured:', isSupabaseConfigured());
console.log('Storage key:', getAuthStorageKey());
console.log('Validation:', validateStorageData());
```

**Expected Output:**
```
Supabase configured: true
Storage key: sb-xxxxxxxxxxx-auth-token
Validation: { valid: true, reason: 'Valid', key: '...', data: {...} }
```

---

## 2. 🧪 Development Debug Tools

### Full Auth Debug
```javascript
await window.debugAuth()
```

**Expected Output:**
```
🚀 Starting full auth debug...

🔍 LocalStorage Debug
Expected key: sb-xxxxxxxxxxx-auth-token

📊 Storage validation: {
  valid: true,
  reason: 'Valid',
  key: 'sb-xxxxxxxxxxx-auth-token',
  data: {
    hasAccessToken: true,
    hasRefreshToken: true,
    hasUser: true,
    expiresAt: 1699999999
  }
}

📋 All localStorage keys:
  - sb-xxxxxxxxxxx-auth-token
    ✅ Found auth data: {
      hasAccessToken: true,
      hasRefreshToken: true,
      expiresAt: 1699999999,
      user: 'user@example.com'
    }

🔍 Session Debug
✅ Active session found:
  User ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  Email: user@example.com
  Token expires at: 11/12/2025, 3:00:00 PM
  Token expires in: 45 minutes

✅ User verified with backend:
  User ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  Email: user@example.com

✅ Auth debug complete
```

---

## 3. 📝 User Type Specific Tests

### Test Individual User Login
```javascript
// Expected user type: 'individual'
const checkUserType = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.log('❌ No session');
    return;
  }
  
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  console.log('User type:', profile?.user_type);
  console.log('Full name:', profile?.full_name);
  console.log('Phone:', profile?.phone);
  
  if (profile?.user_type === 'individual') {
    console.log('✅ Individual user verified');
  } else {
    console.log('❌ Not an individual user');
  }
};

await checkUserType();
```

### Test Corporate User Login
```javascript
// Expected user type: 'corporate'
const checkCorporateUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.log('❌ No session');
    return;
  }
  
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  console.log('User type:', profile?.user_type);
  console.log('Company name:', profile?.company_name);
  console.log('Tax number:', profile?.tax_number);
  console.log('Address:', profile?.address);
  
  if (profile?.user_type === 'corporate') {
    console.log('✅ Corporate user verified');
    console.log('Company info complete:', !!(profile.company_name && profile.tax_number));
  } else {
    console.log('❌ Not a corporate user');
  }
};

await checkCorporateUser();
```

### Test Admin User Login
```javascript
// Expected email: cicicars.com@gmail.com
const checkAdminUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.log('❌ No session');
    return;
  }
  
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  console.log('User type:', profile?.user_type);
  console.log('Email:', session.user.email);
  
  if (profile?.user_type === 'admin' && session.user.email === 'cicicars.com@gmail.com') {
    console.log('✅ Admin user verified');
  } else {
    console.log('❌ Not the expected admin user');
  }
};

await checkAdminUser();
```

---

## 4. 🔄 Auth Flow Tests

### Test Sign In Flow
```javascript
const testSignIn = async (email, password) => {
  console.log('🔐 Testing sign in...');
  
  // Clear first
  await window.clearAuthData();
  await new Promise(r => setTimeout(r, 1000));
  
  // Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('❌ Sign in failed:', error);
    return;
  }
  
  console.log('✅ Sign in successful');
  console.log('User ID:', data.user.id);
  console.log('Email:', data.user.email);
  
  // Verify storage
  const validation = validateStorageData();
  console.log('Storage validation:', validation);
  
  // Wait for profile to load
  await new Promise(r => setTimeout(r, 2000));
  
  // Check profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();
  
  console.log('Profile loaded:', profile);
  console.log('User type:', profile?.user_type);
};

// Test with your credentials
await testSignIn('your-email@example.com', 'your-password');
```

### Test Session Persistence (Page Reload)
```javascript
const testSessionPersistence = async () => {
  console.log('🔄 Testing session persistence...');
  
  // Check before reload
  const before = await supabase.auth.getSession();
  console.log('Before reload - Has session:', !!before.data.session);
  
  if (!before.data.session) {
    console.log('❌ No session to test. Please login first.');
    return;
  }
  
  console.log('User email:', before.data.session.user.email);
  console.log('Token expires in:', Math.round((before.data.session.expires_at! * 1000 - Date.now()) / 1000 / 60), 'minutes');
  
  console.log('\n📝 Now reload the page and run this again to verify session persists');
  
  // After manual reload, run again:
  const after = await supabase.auth.getSession();
  console.log('\nAfter reload - Has session:', !!after.data.session);
  
  if (after.data.session?.user.id === before.data.session.user.id) {
    console.log('✅ Session persisted successfully');
  } else {
    console.log('❌ Session lost after reload');
  }
};

await testSessionPersistence();
```

### Test Sign Out Flow
```javascript
const testSignOut = async () => {
  console.log('👋 Testing sign out...');
  
  // Check before
  const before = await supabase.auth.getSession();
  console.log('Before sign out - Has session:', !!before.data.session);
  
  if (!before.data.session) {
    console.log('ℹ️ No session to sign out from');
    return;
  }
  
  // Sign out
  await supabase.auth.signOut();
  
  // Wait a bit
  await new Promise(r => setTimeout(r, 1000));
  
  // Check after
  const after = await supabase.auth.getSession();
  console.log('After sign out - Has session:', !!after.data.session);
  
  // Check storage
  const validation = validateStorageData();
  console.log('Storage validation:', validation);
  
  if (!after.data.session && !validation.valid) {
    console.log('✅ Sign out successful - session and storage cleared');
  } else {
    console.log('❌ Sign out incomplete');
  }
};

await testSignOut();
```

---

## 5. 🎯 Role-Based Route Access Tests

### Test Individual User Routes
```javascript
const testIndividualRoutes = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.log('❌ No session');
    return;
  }
  
  const { data: profile } = await supabase
    .from('users')
    .select('user_type')
    .eq('id', session.user.id)
    .single();
  
  if (profile?.user_type !== 'individual') {
    console.log('❌ Not an individual user');
    return;
  }
  
  console.log('✅ Individual user - Can access:');
  console.log('  - /individual/home');
  console.log('  - /individual/jobs');
  console.log('  - /individual/applications');
  console.log('  - /individual/earnings');
  console.log('  - /individual/profile');
};

await testIndividualRoutes();
```

### Test Corporate User Routes
```javascript
const testCorporateRoutes = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.log('❌ No session');
    return;
  }
  
  const { data: profile } = await supabase
    .from('users')
    .select('user_type')
    .eq('id', session.user.id)
    .single();
  
  if (profile?.user_type !== 'corporate') {
    console.log('❌ Not a corporate user');
    return;
  }
  
  console.log('✅ Corporate user - Can access:');
  console.log('  - /corporate/home');
  console.log('  - /corporate/post-job');
  console.log('  - /corporate/job-listings');
  console.log('  - /corporate/applicants');
  console.log('  - /corporate/profile');
};

await testCorporateRoutes();
```

---

## 6. 🔍 Storage Structure Validation

### Validate Storage JSON Structure
```javascript
const validateStorageStructure = () => {
  const storageKey = getAuthStorageKey();
  const rawData = localStorage.getItem(storageKey);
  
  if (!rawData) {
    console.log('❌ No storage data found');
    return;
  }
  
  try {
    const parsed = JSON.parse(rawData);
    
    console.log('📊 Storage structure:');
    console.log('  access_token:', typeof parsed.access_token, parsed.access_token ? '✅' : '❌');
    console.log('  refresh_token:', typeof parsed.refresh_token, parsed.refresh_token ? '✅' : '❌');
    console.log('  expires_at:', typeof parsed.expires_at, parsed.expires_at ? '✅' : '❌');
    console.log('  expires_in:', typeof parsed.expires_in, parsed.expires_in ? '✅' : '❌');
    console.log('  token_type:', parsed.token_type, parsed.token_type === 'bearer' ? '✅' : '❌');
    console.log('  user:', typeof parsed.user, parsed.user ? '✅' : '❌');
    
    if (parsed.user) {
      console.log('\n👤 User object:');
      console.log('  id:', parsed.user.id ? '✅' : '❌');
      console.log('  email:', parsed.user.email ? '✅' : '❌');
      console.log('  user_metadata:', parsed.user.user_metadata ? '✅' : '❌');
    }
    
    const requiredFields = [
      'access_token',
      'refresh_token',
      'expires_at',
      'user'
    ];
    
    const hasAll = requiredFields.every(field => parsed[field]);
    
    if (hasAll) {
      console.log('\n✅ All required fields present');
    } else {
      console.log('\n❌ Missing required fields');
    }
    
  } catch (error) {
    console.error('❌ Failed to parse storage JSON:', error);
  }
};

validateStorageStructure();
```

---

## 7. 🚨 Error Scenario Tests

### Test Invalid Email
```javascript
const testInvalidEmail = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'nonexistent@example.com',
    password: 'wrongpassword'
  });
  
  if (error) {
    console.log('✅ Correctly rejected invalid credentials');
    console.log('Error:', error.message);
  } else {
    console.log('❌ Should have rejected invalid credentials');
  }
};

await testInvalidEmail();
```

### Test Duplicate Email Registration
```javascript
const testDuplicateEmail = async (existingEmail) => {
  const { data, error } = await supabase.auth.signUp({
    email: existingEmail,
    password: 'testpassword123'
  });
  
  if (error) {
    console.log('✅ Correctly prevented duplicate email');
    console.log('Error:', error.message);
  } else {
    console.log('❌ Should have prevented duplicate email');
  }
};

await testDuplicateEmail('existing-user@example.com');
```

---

## 8. 📊 Performance Tests

### Measure Login Time
```javascript
const measureLoginTime = async (email, password) => {
  console.log('⏱️ Measuring login performance...');
  
  // Clear first
  await window.clearAuthData();
  await new Promise(r => setTimeout(r, 1000));
  
  const start = performance.now();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  const loginTime = performance.now() - start;
  
  if (error) {
    console.error('❌ Login failed:', error);
    return;
  }
  
  // Wait for profile
  const profileStart = performance.now();
  
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();
  
  const profileTime = performance.now() - profileStart;
  const totalTime = performance.now() - start;
  
  console.log('📊 Performance Results:');
  console.log('  Login time:', Math.round(loginTime), 'ms');
  console.log('  Profile fetch time:', Math.round(profileTime), 'ms');
  console.log('  Total time:', Math.round(totalTime), 'ms');
  
  if (totalTime < 2000) {
    console.log('✅ Performance is good (< 2s)');
  } else {
    console.log('⚠️ Performance could be improved (> 2s)');
  }
};

await measureLoginTime('your-email@example.com', 'your-password');
```

---

## 9. 🧹 Cleanup & Reset

### Complete System Reset
```javascript
const completeReset = async () => {
  console.log('🧹 Performing complete system reset...');
  
  // 1. Sign out
  console.log('1. Signing out...');
  await supabase.auth.signOut();
  
  // 2. Clear localStorage
  console.log('2. Clearing localStorage...');
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('sb-')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  // 3. Clear sessionStorage
  console.log('3. Clearing sessionStorage...');
  sessionStorage.clear();
  
  // 4. Verify
  console.log('4. Verifying...');
  const { data: { session } } = await supabase.auth.getSession();
  const validation = validateStorageData();
  
  if (!session && !validation.valid) {
    console.log('✅ Complete reset successful');
  } else {
    console.log('⚠️ Reset incomplete');
  }
  
  console.log('\n5. Reloading page in 2 seconds...');
  setTimeout(() => location.reload(), 2000);
};

await completeReset();
```

---

## 10. 📚 Quick Reference

### One-Liner Commands

```javascript
// Check session
(await supabase.auth.getSession()).data.session ? '✅ Logged in' : '❌ Not logged in'

// Get user type
(await supabase.from('users').select('user_type').eq('id', (await supabase.auth.getSession()).data.session?.user.id).single()).data?.user_type

// Check storage validity
validateStorageData().valid ? '✅ Valid' : '❌ Invalid'

// Get storage key
getAuthStorageKey()

// Time until token expires (minutes)
Math.round(((await supabase.auth.getSession()).data.session?.expires_at! * 1000 - Date.now()) / 1000 / 60)

// Check if admin
(await supabase.auth.getSession()).data.session?.user.email === 'cicicars.com@gmail.com' ? '✅ Admin' : '❌ Not admin'
```

---

## 11. 🎯 Common Workflows

### New User Registration Test
```javascript
// Step 1: Clear
await window.clearAuthData();

// Step 2: Register via UI or:
// (Use UI for signup - it handles profile creation)

// Step 3: Verify
await window.debugAuth();
```

### Existing User Login Test
```javascript
// Step 1: Clear
await window.clearAuthData();

// Step 2: Login via UI

// Step 3: Verify
await window.debugSession();
```

### Session Recovery Test
```javascript
// Step 1: Login

// Step 2: Reload page

// Step 3: Verify auto-login
await window.debugAuth();
```

---

**Project:** Workigom  
**Version:** v1.2.0  
**Last Updated:** 11 Kasım 2025  
**Environment:** Development & Production  
**Admin Email:** cicicars.com@gmail.com
