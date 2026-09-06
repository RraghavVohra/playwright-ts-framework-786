import { test, expect } from '@playwright/test';
import { getAuthData } from './helpers/auth.helper';

let token: string;
let cookies: string;
let categoryId: number;

// Single beforeAll — token + cookies + categoryId sab yahan fetch karo
test.beforeAll(async ({ request }) => {
  // Step 1 — auth-state.json se token aur cookies lo
  const authData = getAuthData();
  token = authData.token;
  cookies = authData.cookies;

  // Step 2 — partnerCategory API se categoryId fetch karo
  const catResponse = await request.post(`${process.env.BASE_URL}/framework/api/partner-category`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      startlimit: 0,
      endlimit: 20,
      search: "",
      sort: "",
      action: "list"
    }
  });

  const catBody = await catResponse.json();
  categoryId = catBody.response.data[0].id;
  console.log('✅ Category ID fetched:', categoryId);
});

// TC_API_33 — Happy Path
test('TC_API_33 - Happy Path: Partner added successfully', async ({ request }) => {
  const timestamp = Date.now();

  const response = await request.post(`${process.env.BASE_URL}/framework/api/partners`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      action: "add",
      UID: `AUTO-${timestamp}`,
      EUIN: "",
      first_name: "Auto",
      last_name: `Partner_${timestamp}`,
      category: [categoryId],
      email: `autopartner_${timestamp}@test.com`,
      phone: [`99${timestamp.toString().slice(-8)}`],
      company: "Bizight Solutions Pvt. Ltd.",
      company_website: "",
      designation: "Senior Test Architect",
      branch_manager: "",
      zonal_manager: "",
      rm_id: "",
      agent_manager: "",
      button_name: [""],
      digicard: "",
      url: [""],
      region_id: "",
      state_id: "",
      city_id: "",
      branch_id: "",
      cluster: "",
      user_type: "p",
      access_type: "C",
      contact_limit: "",
      level_id: "",
      base_type_parent: ""
    }
  });

  const rawBody = await response.text();
  const cleanBody = rawBody.replace('subdomain_details', '').trim();
  const body = JSON.parse(cleanBody);

  console.log('TC_API_33 Response:', body);
  console.log('TC_API_33 Partner ID:', body.partner_id);
  console.log('TC_API_33 Category ID used:', categoryId);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("200");
  expect(body.status).toBe("success");
  expect(body.message).toBe("Partner Details Added Successfully!!");
  expect(body.partner_id).toBeTruthy();
});

// TC_API_34 — Duplicate UID
test('TC_API_34 - Duplicate UID: Already exists', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/partners`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      action: "add",
      UID: "RR-786",
      EUIN: "",
      first_name: "Rolls",
      last_name: "Royce",
      category: [categoryId],
      email: `duplicate_${Date.now()}@test.com`,
      phone: [`98${Date.now().toString().slice(-8)}`],
      company: "Bizight Solutions Pvt. Ltd.",
      company_website: "",
      designation: "Senior Test Architect",
      branch_manager: "",
      zonal_manager: "",
      rm_id: "",
      agent_manager: "",
      button_name: [""],
      digicard: "",
      url: [""],
      region_id: "",
      state_id: "",
      city_id: "",
      branch_id: "",
      cluster: "",
      user_type: "p",
      access_type: "C",
      contact_limit: "",
      level_id: "",
      base_type_parent: ""
    }
  });

  const body = await response.json();
  console.log('TC_API_34 Response:', body);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("403");
  expect(body.status).toBe("failed");
  expect(body.message).toBe("Duplicate Entry for ARN No.");
});

// TC_API_35 — Duplicate Phone
test('TC_API_35 - Duplicate Phone: Already exists', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/partners`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      action: "add",
      UID: `AUTO-${Date.now()}`,
      EUIN: "",
      first_name: "Rolls",
      last_name: "Royce",
      category: [categoryId],
      email: `unique_${Date.now()}@test.com`,
      phone: ["9493949311"],
      company: "Bizight Solutions Pvt. Ltd.",
      company_website: "",
      designation: "Senior Test Architect",
      branch_manager: "",
      zonal_manager: "",
      rm_id: "",
      agent_manager: "",
      button_name: [""],
      digicard: "",
      url: [""],
      region_id: "",
      state_id: "",
      city_id: "",
      branch_id: "",
      cluster: "",
      user_type: "p",
      access_type: "C",
      contact_limit: "",
      level_id: "",
      base_type_parent: ""
    }
  });

  const body = await response.json();
  console.log('TC_API_35 Response:', body);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("403");
  expect(body.status).toBe("failed");
  expect(body.message).toBe("Email or Mobile already exists");
});

// TC_API_36 — No Auth Token
test('TC_API_36 - No Auth Token: Unauthorized', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/partners`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      action: "add",
      UID: `AUTO-${Date.now()}`,
      first_name: "Test",
      last_name: "Partner",
      category: [categoryId],
      email: `test_${Date.now()}@test.com`,
      phone: [`97${Date.now().toString().slice(-8)}`]
    }
  });

  const body = await response.json();
  console.log('TC_API_36 Status:', response.status());
  console.log('TC_API_36 Response:', body.message);
  expect(response.status()).toBe(404);
});
