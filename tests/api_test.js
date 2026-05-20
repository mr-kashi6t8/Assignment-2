const { spawn } = require('child_process');
const path = require('path');

const PORT = 5000;
const BASE_URL = `http://127.0.0.1:${PORT}/items`;

let serverProcess;

function startServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting server for integration testing...');
    serverProcess = spawn('node', [path.join(__dirname, '../server.js')], {
      env: { ...process.env, PORT }
    });

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[Server] ${output.trim()}`);
      if (output.includes('Server is running')) {
        resolve();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`[Server Error] ${data.toString()}`);
    });

    serverProcess.on('error', (err) => {
      reject(err);
    });
  });
}

function stopServer() {
  if (serverProcess) {
    console.log('Stopping server...');
    serverProcess.kill('SIGINT');
  }
}

async function runTests() {
  let createdProductAId;
  let createdProductBId;

  console.log('\n--- STARTING API VERIFICATION TESTS ---\n');

  try {
    // ----------------------------------------------------
    // TEST 1: POST /items (Create Product A)
    // ----------------------------------------------------
    console.log('Test 1: Creating Product A...');
    const res1 = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Wireless Mechanical Keyboard',
        price: 89.99,
        description: 'RGB Backlit, Red Switches, Hot-swappable mechanical keyboard',
        category: 'Electronics',
        stock: 15
      })
    });

    const data1 = await res1.json();
    console.log(`Status: ${res1.status}`);
    console.log('Response:', JSON.stringify(data1, null, 2));

    if (res1.status !== 201 || !data1.success || !data1.data._id) {
      throw new Error('Test 1 Failed: Product A not created properly');
    }
    createdProductAId = data1.data._id;
    console.log('✔ Test 1 Passed.\n');

    // ----------------------------------------------------
    // TEST 2: POST /items (Create Product B)
    // ----------------------------------------------------
    console.log('Test 2: Creating Product B...');
    const res2 = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ergonomic Office Chair',
        price: 199.50,
        description: 'High-back mesh chair with adjustable lumbar support',
        category: 'Furniture',
        stock: 5
      })
    });

    const data2 = await res2.json();
    console.log(`Status: ${res2.status}`);
    console.log('Response:', JSON.stringify(data2, null, 2));

    if (res2.status !== 201 || !data2.success || !data2.data._id) {
      throw new Error('Test 2 Failed: Product B not created properly');
    }
    createdProductBId = data2.data._id;
    console.log('✔ Test 2 Passed.\n');

    // ----------------------------------------------------
    // TEST 3: GET /items (Fetch all records)
    // ----------------------------------------------------
    console.log('Test 3: Fetching all products...');
    const res3 = await fetch(BASE_URL);
    const data3 = await res3.json();
    console.log(`Status: ${res3.status}`);
    console.log(`Fetched Count: ${data3.count}`);

    if (res3.status !== 200 || !data3.success || !Array.isArray(data3.data) || data3.count < 2) {
      throw new Error('Test 3 Failed: Products retrieval issue');
    }
    console.log('✔ Test 3 Passed.\n');

    // ----------------------------------------------------
    // TEST 4: GET /items/:id (Fetch Product A by ID)
    // ----------------------------------------------------
    console.log(`Test 4: Fetching product A by ID: ${createdProductAId}...`);
    const res4 = await fetch(`${BASE_URL}/${createdProductAId}`);
    const data4 = await res4.json();
    console.log(`Status: ${res4.status}`);
    console.log('Response:', JSON.stringify(data4, null, 2));

    if (res4.status !== 200 || !data4.success || data4.data.name !== 'Wireless Mechanical Keyboard') {
      throw new Error('Test 4 Failed: Could not retrieve Product A by correct ID');
    }
    console.log('✔ Test 4 Passed.\n');

    // ----------------------------------------------------
    // TEST 5: PUT /items/:id (Update Product A)
    // ----------------------------------------------------
    console.log(`Test 5: Updating product A (ID: ${createdProductAId})...`);
    const res5 = await fetch(`${BASE_URL}/${createdProductAId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Wireless Mechanical Keyboard (Updated V2)',
        price: 99.99,
        stock: 25,
        category: 'Electronics'
      })
    });

    const data5 = await res5.json();
    console.log(`Status: ${res5.status}`);
    console.log('Response:', JSON.stringify(data5, null, 2));

    if (res5.status !== 200 || !data5.success || data5.data.price !== 99.99 || data5.data.stock !== 25) {
      throw new Error('Test 5 Failed: Product A update was incorrect');
    }
    console.log('✔ Test 5 Passed.\n');

    // ----------------------------------------------------
    // TEST 6: DELETE /items/:id (Delete Product B)
    // ----------------------------------------------------
    console.log(`Test 6: Deleting product B (ID: ${createdProductBId})...`);
    const res6 = await fetch(`${BASE_URL}/${createdProductBId}`, {
      method: 'DELETE'
    });

    const data6 = await res6.json();
    console.log(`Status: ${res6.status}`);
    console.log('Response:', JSON.stringify(data6, null, 2));

    if (res6.status !== 200 || !data6.success || data6.data._id !== createdProductBId) {
      throw new Error('Test 6 Failed: Product B deletion issue');
    }
    console.log('✔ Test 6 Passed.\n');

    // ----------------------------------------------------
    // TEST 7: GET /items/:id (Verify Product B is deleted - 404)
    // ----------------------------------------------------
    console.log(`Test 7: Verifying Product B deletion (fetching ID: ${createdProductBId})...`);
    const res7 = await fetch(`${BASE_URL}/${createdProductBId}`);
    const data7 = await res7.json();
    console.log(`Status: ${res7.status}`);
    console.log('Response:', JSON.stringify(data7, null, 2));

    if (res7.status !== 404 || data7.success !== false) {
      throw new Error('Test 7 Failed: Deleted product B should return 404 Not Found');
    }
    console.log('✔ Test 7 Passed.\n');

    console.log('🎉 ALL API INTEGRATION TESTS PASSED SUCCESSFULLY! 🎉\n');
  } catch (error) {
    console.error('❌ Integration Test Script Failed:', error.message);
    process.exitCode = 1;
  }
}

async function main() {
  try {
    await startServer();
    await runTests();
  } catch (err) {
    console.error('Error starting test run:', err);
  } finally {
    stopServer();
    // Allow process to terminate naturally or force exit based on success/failure
    setTimeout(() => {
      process.exit(process.exitCode || 0);
    }, 1000);
  }
}

main();
