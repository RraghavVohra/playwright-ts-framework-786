import { test, expect } from '@playwright/test';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Japneet Q7 — "Can you mock events? If yes, how?"
// Attempt #4. Every prior attempt used page.setContent() instead of a real
// navigation. Playwright's docs say routing should be set up "before
// navigating the page" — this version tests whether a genuine page.goto()
// against a real local server (instead of injected content) is what
// routeWebSocket() actually requires to engage.

test('mocked WebSocket pushes a fake event into the page', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  // A tiny real HTTP server, serving a real HTML file — a genuine navigation
  // target, not injected content.
  const html = fs.readFileSync(path.join(__dirname, 'ws-demo-page/index.html'));
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
  await new Promise<void>(resolve => server.listen(8081, resolve));

  await page.routeWebSocket(/localhost:8080\/ws/, ws => {
    console.log('NODE SIDE: routeWebSocket handler fired — route matched');
    ws.onMessage(message => {
      console.log('NODE SIDE: page sent:', message);
      if (message === 'ready') {
        ws.send(JSON.stringify({ event: 'price_update', value: 102.5 }));
      }
    });
  });

  await page.goto('http://localhost:8081/'); // REAL navigation, not setContent()

  await expect(page.locator('#price')).toHaveText('102.5');

  server.close();
});