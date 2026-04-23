import { chromium, type Page } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/demos");

const APP_URL = process.env.DEMO_APP_URL ?? "http://localhost:3000";
const EMAIL = process.env.DEMO_EMAIL ?? "kdolives11@gmail.com";
const PASSWORD = process.env.DEMO_PASSWORD ?? "lamia35100";

const HIDE_DEV_CHROME = `
  nextjs-portal,
  [data-nextjs-toast],
  [aria-label="Open Next.js Dev Tools"] { display: none !important; }
`;

type Shot = {
  file: string;
  url: string;
  waitMs?: number;
  prepare?: (page: Page) => Promise<void>;
};

const SHOTS: Shot[] = [
  { file: "01-dashboard.png", url: "/" },
  { file: "02-invoices-list.png", url: "/invoices" },
  { file: "03-create-invoice.png", url: "/create" },
  { file: "04-customers.png", url: "/customers" },
  {
    file: "05-customer-detail.png",
    url: "/customers",
    prepare: async (page) => {
      const href = await page.evaluate(() => {
        const rows = Array.from(
          document.querySelectorAll<HTMLAnchorElement>('a[href^="/customers/"]')
        ).filter((a) => !(a.getAttribute("href") ?? "").includes("edit"));
        const top = rows.find((a) => a.textContent?.includes("ΠΑΡΘΕΝΩΝ")) ?? rows[0];
        return top?.getAttribute("href") ?? null;
      });
      if (href) await page.goto(APP_URL + href, { waitUntil: "networkidle" });
    },
    waitMs: 2000,
  },
  {
    file: "06-agent.png",
    url: "/agent",
    prepare: async (page) => {
      await page.waitForTimeout(1500);
      await page.evaluate(() => {
        const inp = document.querySelector<HTMLInputElement>(
          'input[placeholder*="Πληκτρολογ"]'
        );
        if (!inp) return;
        const setter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        )!.set!;
        setter.call(
          inp,
          "Κόψε μου τιμολόγιο 850€ στην ΟΛΥΜΠΟΣ ΛΟΓΙΣΜΙΚΟ ΕΠΕ για ανάπτυξη ιστοσελίδας."
        );
        inp.dispatchEvent(new Event("input", { bubbles: true }));
      });
    },
  },
  { file: "07-products.png", url: "/products" },
  { file: "08-expenses.png", url: "/expenses" },
  { file: "09-delivery-note-create.png", url: "/delivery-notes/create" },
  { file: "10-settings.png", url: "/settings" },
  {
    file: "11-invoice-detail.png",
    url: "/invoices",
    prepare: async (page) => {
      await page.waitForTimeout(1500);
      const mark = await page.evaluate(() => {
        const row = Array.from(document.querySelectorAll("tr, [role='row']")).find(
          (r) => /MARK\s+400\d{9,}/i.test(r.textContent ?? "")
        );
        const m = row?.textContent?.match(/(400\d{9,})/);
        return m?.[1] ?? null;
      });
      if (mark) await page.goto(`${APP_URL}/invoice/${mark}`, { waitUntil: "networkidle" });
    },
    waitMs: 3000,
  },
];

async function login(page: Page) {
  await page.goto(`${APP_URL}/login`, { waitUntil: "networkidle" });
  await page.getByRole("textbox", { name: "Email" }).fill(EMAIL);
  await page.getByRole("textbox", { name: "Κωδικός" }).fill(PASSWORD);
  await page.getByRole("button", { name: "Σύνδεση", exact: true }).click();
  await page.waitForURL(`${APP_URL}/`, { timeout: 15000 });
}

async function capture(page: Page, shot: Shot) {
  const target = APP_URL + shot.url;
  await page.goto(target, { waitUntil: "networkidle" });
  await page.waitForTimeout(shot.waitMs ?? 1500);
  if (shot.prepare) await shot.prepare(page);
  await page.addStyleTag({ content: HIDE_DEV_CHROME });
  const out = resolve(OUT_DIR, shot.file);
  await page.screenshot({ path: out, fullPage: false, type: "png" });
  console.log(`  captured ${shot.file}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log(`logging in as ${EMAIL} @ ${APP_URL}`);
  await login(page);

  for (const shot of SHOTS) {
    try {
      await capture(page, shot);
    } catch (err) {
      console.error(`  failed ${shot.file}: ${(err as Error).message}`);
    }
  }

  await browser.close();
  console.log(`done -> ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
