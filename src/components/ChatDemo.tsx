import { useState, useEffect, useRef, type ReactNode } from "react";

const GOLD = "oklch(0.78 0.12 75)";
const GOLD_DARK = "oklch(0.70 0.13 75)";
const GOLD_BG = "oklch(0.78 0.12 75 / 0.15)";
const GOLD_BG_SOFT = "oklch(0.78 0.12 75 / 0.12)";
const GOLD_BORDER = "oklch(0.78 0.12 75 / 0.4)";
const NAVY = "oklch(0.165 0.015 260)";
const NAVY_DEEP = "oklch(0.35 0.08 260)";
const NAVY_BTN = "oklch(0.22 0.04 260)";
const MUTED = "oklch(0.50 0.02 260)";
const BORDER = "oklch(0.905 0.008 260)";
const CARD_BG = "oklch(0.97 0.003 260)";
const SURFACE = "oklch(0.995 0.001 260)";
const SUCCESS = "oklch(0.65 0.17 145)";
const SUCCESS_BG = "oklch(0.65 0.17 145 / 0.1)";
const DANGER = "oklch(0.577 0.245 27.325)";
const DANGER_BG = "oklch(0.577 0.245 27.325 / 0.1)";

function SparkleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg className="flex-shrink-0" style={{ width: size, height: size }} fill={GOLD} viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function CheckIcon({ size = 14, color = SUCCESS }: { size?: number; color?: string }) {
  return (
    <svg className="flex-shrink-0" style={{ width: size, height: size }} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ReceiptThumb() {
  return (
    <div
      className="flex items-center gap-2 rounded-lg px-3 py-2 border"
      style={{ background: "white", borderColor: "rgba(255,255,255,0.25)" }}
    >
      <div
        className="w-9 h-11 rounded flex items-center justify-center flex-shrink-0"
        style={{ background: "oklch(0.93 0.005 260)" }}
      >
        <svg className="w-5 h-5" fill="none" stroke={MUTED} strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] font-semibold truncate" style={{ color: NAVY }}>
          Απόδειξη_Shell.jpg
        </span>
        <span className="text-[10px]" style={{ color: MUTED }}>
          142 KB
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Response cards
// ──────────────────────────────────────────────────────────────

function CardShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span style={{ color: MUTED }}>{label}</span>
      <span className="text-right" style={{ color: NAVY }}>{value}</span>
    </div>
  );
}

function CardHeader({ label, badge, badgeColor = GOLD, badgeBg = GOLD_BG_SOFT }: {
  label: string;
  badge: string;
  badgeColor?: string;
  badgeBg?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>
        {label}
      </span>
      <span
        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
        style={{ background: badgeBg, color: badgeColor }}
      >
        {badge}
      </span>
    </div>
  );
}

function PrimaryAction({ confirmed, idleLabel, doneLabel }: {
  confirmed: boolean;
  idleLabel: string;
  doneLabel: string;
}) {
  return (
    <button
      className="mt-3 w-full text-xs font-semibold py-2 rounded-lg cursor-default"
      style={{
        background: confirmed ? SUCCESS : GOLD,
        color: confirmed ? "white" : NAVY_BTN,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {confirmed ? (
        <span className="flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {doneLabel}
        </span>
      ) : (
        idleLabel
      )}
    </button>
  );
}

function InvoiceCard({ confirmed }: { confirmed: boolean }) {
  return (
    <CardShell>
      <CardHeader label="Τιμολόγιο Παροχής Υπηρεσιών" badge="Προσχέδιο" />
      <div className="space-y-1.5 text-xs">
        <Row label="Πελάτης" value="Μαρία Νικολάου" />
        <Row label="Περιγραφή" value="Σχεδιασμός Ιστοσελίδας" />
        <div className="my-1" style={{ borderTop: `1px solid ${BORDER}` }} />
        <Row label="Καθαρή αξία" value="€300,00" />
        <Row label="ΦΠΑ 24%" value="€72,00" />
        <div
          className="pt-1.5 mt-1.5 flex justify-between font-semibold"
          style={{ color: NAVY, borderTop: `1px solid ${BORDER}` }}
        >
          <span>Σύνολο</span>
          <span>€372,00</span>
        </div>
      </div>
      <PrimaryAction confirmed={confirmed} idleLabel="Υποβολή στο myDATA" doneLabel="Υποβλήθηκε στο myDATA" />
    </CardShell>
  );
}

function DeliveryNoteCard({ confirmed }: { confirmed: boolean }) {
  return (
    <CardShell>
      <CardHeader label="Δελτίο Αποστολής" badge="ΔΑ 9.3" />
      <div className="space-y-1.5 text-xs">
        <Row label="Παραλήπτης" value="ACME Α.Ε." />
        <Row label="ΑΦΜ" value="094XXXXXX" />
        <div className="my-1" style={{ borderTop: `1px solid ${BORDER}` }} />
        <div className="flex justify-between gap-3">
          <span style={{ color: MUTED }}>Είδος</span>
          <span className="text-right" style={{ color: NAVY }}>
            5× Dell Latitude 5540
          </span>
        </div>
        <Row label="Παράδοση" value="Αύριο, 15/04" />
        <Row label="Μεταφορέας" value="Ίδια μέσα" />
      </div>
      <PrimaryAction confirmed={confirmed} idleLabel="Έκδοση & αποστολή στο myDATA" doneLabel="Εκδόθηκε & διαβιβάστηκε" />
    </CardShell>
  );
}

function InsightsCard({ confirmed }: { confirmed: boolean }) {
  return (
    <CardShell>
      <CardHeader label="Εκτίμηση Φ2 · Μάρ/Απρ 2026" badge="Υπολογίστηκε" />
      <div
        className="text-3xl font-bold tabular-nums mb-3"
        style={{
          color: NAVY,
          animation: confirmed ? "none" : "slideUp 0.4s ease-out",
        }}
      >
        €1.248,40
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: BORDER }}>
            <div className="h-full rounded-full" style={{ width: "100%", background: GOLD }} />
          </div>
          <span className="tabular-nums" style={{ color: NAVY }}>€1.840,00</span>
        </div>
        <div className="flex justify-between text-[10px]" style={{ color: MUTED }}>
          <span>ΦΠΑ εσόδων</span>
          <span className="tabular-nums">27 τιμολόγια</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: BORDER }}>
            <div className="h-full rounded-full" style={{ width: "32%", background: MUTED }} />
          </div>
          <span className="tabular-nums" style={{ color: NAVY }}>−€591,60</span>
        </div>
        <div className="flex justify-between text-[10px]" style={{ color: MUTED }}>
          <span>ΦΠΑ εξόδων</span>
          <span className="tabular-nums">14 έξοδα</span>
        </div>
      </div>
      <div
        className="mt-3 pt-3 flex items-center gap-1.5 text-[11px]"
        style={{ borderTop: `1px solid ${BORDER}`, color: MUTED }}
      >
        <ClockIcon />
        <span>
          Προθεσμία: <span style={{ color: NAVY, fontWeight: 600 }}>26 Μαΐου 2026</span>
        </span>
      </div>
    </CardShell>
  );
}

function OverdueCard({ confirmed }: { confirmed: boolean }) {
  const rows = [
    { name: "Παπαδόπουλος Α.Ε.", amount: "€1.240", days: 18, number: "Α-138" },
    { name: "Studio Lambda ΙΚΕ", amount: "€720", days: 11, number: "Α-142" },
    { name: "Ν. Αντωνίου", amount: "€380", days: 4, number: "Α-147" },
  ];
  return (
    <CardShell>
      <CardHeader label="Απλήρωτα Τιμολόγια" badge="Σύνολο €2.340" />
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.number}
            className="flex items-center gap-2 pb-2"
            style={{ borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : "none" }}
          >
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate" style={{ color: NAVY }}>{r.name}</div>
              <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
                <span style={{ color: MUTED }}>{r.number}</span>
                <span style={{ color: MUTED }}>·</span>
                <span
                  className="px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: DANGER_BG, color: DANGER }}
                >
                  {r.days}μ καθυστέρηση
                </span>
              </div>
            </div>
            <div className="text-xs font-semibold tabular-nums flex-shrink-0" style={{ color: NAVY }}>
              {r.amount}
            </div>
            <button
              className="text-[10px] font-semibold px-2 py-1 rounded-md cursor-default flex-shrink-0"
              style={{
                background: i === 0 && confirmed ? SUCCESS_BG : GOLD_BG_SOFT,
                color: i === 0 && confirmed ? SUCCESS : GOLD_DARK,
                border: `1px solid ${i === 0 && confirmed ? "oklch(0.65 0.17 145 / 0.3)" : GOLD_BORDER}`,
                transition: "background 0.3s, color 0.3s",
              }}
            >
              {i === 0 && confirmed ? "Στάλθηκε ✓" : "Υπενθύμιση"}
            </button>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function PaymentReminderCard({ confirmed }: { confirmed: boolean }) {
  return (
    <CardShell>
      <CardHeader label="Υπενθύμιση μέσω μέιλ" badge="Προσχέδιο" />
      <div className="space-y-2 text-xs">
        <div className="flex gap-2">
          <span className="w-11 flex-shrink-0" style={{ color: MUTED }}>Προς</span>
          <span className="min-w-0 truncate" style={{ color: NAVY }}>
            Παπαδόπουλος Α.Ε. · accounting@papadopoulos.gr
          </span>
        </div>
        <div className="flex gap-2">
          <span className="w-11 flex-shrink-0" style={{ color: MUTED }}>Θέμα</span>
          <span className="min-w-0" style={{ color: NAVY }}>
            Υπενθύμιση πληρωμής · Τιμολόγιο Α-138
          </span>
        </div>
        <div className="my-1" style={{ borderTop: `1px solid ${BORDER}` }} />
        <div className="space-y-1.5 leading-relaxed" style={{ color: NAVY }}>
          <p>Αγαπητέ κ. Παπαδόπουλε,</p>
          <p>
            Σας υπενθυμίζουμε ευγενικά ότι το τιμολόγιο{" "}
            <span style={{ fontWeight: 600 }}>Α-138</span> ύψους{" "}
            <span style={{ fontWeight: 600 }}>€1.240,00</span> εκκρεμεί προς εξόφληση εδώ και{" "}
            <span style={{ fontWeight: 600 }}>18 ημέρες</span>. Θα εκτιμούσαμε την ενημέρωσή σας για τον προγραμματισμό της εξόφλησης.
          </p>
          <p>Με εκτίμηση,</p>
        </div>
      </div>
      <PrimaryAction confirmed={confirmed} idleLabel="Αποστολή μέιλ" doneLabel="Εστάλη στον πελάτη" />
    </CardShell>
  );
}

function ReceiptExpenseCard({ confirmed }: { confirmed: boolean }) {
  return (
    <CardShell>
      <CardHeader label="Έξοδο · Καύσιμα" badge="Από απόδειξη" />
      <div className="space-y-1.5 text-xs">
        <Row label="Προμηθευτής" value="Shell Καλλιθέα" />
        <Row label="ΑΦΜ" value="099XXXXXX" />
        <Row label="Ημερομηνία" value="14/04/2026" />
        <div className="my-1" style={{ borderTop: `1px solid ${BORDER}` }} />
        <Row label="Καθαρή αξία" value="€36,29" />
        <Row label="ΦΠΑ 24%" value="€8,71" />
        <div
          className="pt-1.5 mt-1.5 flex justify-between font-semibold"
          style={{ color: NAVY, borderTop: `1px solid ${BORDER}` }}
        >
          <span>Σύνολο</span>
          <span>€45,00</span>
        </div>
      </div>
      <PrimaryAction confirmed={confirmed} idleLabel="Αποθήκευση εξόδου" doneLabel="Αποθηκεύτηκε" />
    </CardShell>
  );
}

// ──────────────────────────────────────────────────────────────
// Scenarios
// ──────────────────────────────────────────────────────────────

type Scenario = {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  userMessage: string;
  withAttachment?: boolean;
  thinking: readonly string[];
  responseIntro: string;
  ResponseCard: (props: { confirmed: boolean }) => ReactNode;
};

const SCENARIOS: readonly Scenario[] = [
  {
    id: "invoice",
    label: "Τιμολόγιο",
    description: "Μία πρόταση, ένα έτοιμο τιμολόγιο παροχής υπηρεσιών. Με ΑΦΜ, ΦΠΑ και αποστολή.",
    icon: <DocIcon />,
    userMessage: "Τιμολόγιο 300€ για σχεδιασμό ιστοσελίδας στη Μαρία Νικολάου",
    thinking: ["Αναζήτηση ΑΦΜ πελάτη...", "Δημιουργία προσχεδίου...", "Έτοιμο!"],
    responseIntro: "Ετοίμασα το τιμολόγιο παροχής υπηρεσιών:",
    ResponseCard: InvoiceCard,
  },
  {
    id: "delivery",
    label: "Δελτίο αποστολής",
    description: "Προϊόντα, ποσότητες και διεύθυνση παράδοσης, χωρίς να ανοίξετε τη φόρμα 9.3.",
    icon: <TruckIcon />,
    userMessage: "Δελτίο αποστολής για 5 laptops Dell στην ACME Α.Ε., παράδοση αύριο",
    thinking: ["Αναζήτηση πελάτη ACME Α.Ε....", "Σύνταξη ΔΑ 9.3...", "Έτοιμο!"],
    responseIntro: "Ετοίμασα το δελτίο αποστολής:",
    ResponseCard: DeliveryNoteCard,
  },
  {
    id: "insights",
    label: "Στατιστικά",
    description: "Ρωτήστε για έσοδα, ΦΠΑ ή περιθώρια. Οι υπολογισμοί γίνονται επιτόπου.",
    icon: <ChartIcon />,
    userMessage: "Πόσο ΦΠΑ θα πληρώσω στην επόμενη Φ2;",
    thinking: ["Υπολογισμός εσόδων Μαρ-Απρ...", "Αφαίρεση ΦΠΑ εξόδων...", "Έτοιμο!"],
    responseIntro: "Η εκτίμησή μου για τη Φ2 Μαρ/Απρ:",
    ResponseCard: InsightsCard,
  },
  {
    id: "overdue",
    label: "Απλήρωτα",
    description: "Δείτε με μια ματιά ποιος σας οφείλει, ιεραρχημένα κατά καθυστέρηση.",
    icon: <ClockIcon />,
    userMessage: "Ποια τιμολόγια είναι απλήρωτα;",
    thinking: ["Έλεγχος ληξιπρόθεσμων...", "Εύρεση 3 τιμολογίων...", "Έτοιμο!"],
    responseIntro: "Βρήκα 3 απλήρωτα τιμολόγια:",
    ResponseCard: OverdueCard,
  },
  {
    id: "reminder",
    label: "Υπενθύμιση πληρωμής",
    description: "Πείτε ποιον πελάτη να υπενθυμίσει και ο βοηθός συντάσσει ένα ευγενικό μέιλ πληρωμής, έτοιμο να σταλεί.",
    icon: <MailIcon />,
    userMessage: "Στείλε ευγενική υπενθύμιση στον Παπαδόπουλο για το Α-138",
    thinking: [
      "Εύρεση τιμολογίου Α-138...",
      "Σύνταξη μηνύματος στα ελληνικά...",
      "Έτοιμο!",
    ],
    responseIntro: "Ετοίμασα αυτό το μέιλ. Θέλετε να το στείλω;",
    ResponseCard: PaymentReminderCard,
  },
  {
    id: "receipt",
    label: "Σάρωση απόδειξης",
    description: "Φωτογραφία οποιασδήποτε απόδειξης. Καταχωρείται ως έξοδο με ΦΠΑ αυτόματα.",
    icon: <CameraIcon />,
    userMessage: "Καταχώρισε αυτή την απόδειξη",
    withAttachment: true,
    thinking: ["Ανάγνωση απόδειξης...", "Εξαγωγή στοιχείων...", "Έτοιμο!"],
    responseIntro: "Διάβασα την απόδειξη και ετοίμασα το έξοδο:",
    ResponseCard: ReceiptExpenseCard,
  },
] as const;

// ──────────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────────

type StepItem =
  | { type: "typing"; text: string; delay: number }
  | { type: "send"; delay: number }
  | { type: "thinking"; text: string; delay: number }
  | { type: "response"; delay: number }
  | { type: "confirm"; delay: number };

function buildSteps(scenario: Scenario): StepItem[] {
  const steps: StepItem[] = [];
  if (scenario.withAttachment) {
    steps.push({ type: "send", delay: 900 });
  } else {
    steps.push({ type: "typing", text: scenario.userMessage, delay: 0 });
    steps.push({ type: "send", delay: 1400 });
  }
  scenario.thinking.forEach((text, i, arr) => {
    const isFirst = i === 0;
    const isLast = i === arr.length - 1;
    steps.push({ type: "thinking", text, delay: isFirst ? 500 : isLast ? 700 : 900 });
  });
  steps.push({ type: "response", delay: 500 });
  steps.push({ type: "confirm", delay: 1000 });
  return steps;
}

export default function ChatDemo() {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isHoveringTabs, setIsHoveringTabs] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(-1);
  const [typedText, setTypedText] = useState("");
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);
  const [showResponse, setShowResponse] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUserBubble, setShowUserBubble] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rotateTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reducedMotion = useRef(false);

  const scenario = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  // Start when section enters viewport (first run only)
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setStep(0);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Reset animation state when scenario changes
  useEffect(() => {
    if (!hasStarted) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setTypedText("");
    setThinkingSteps([]);
    setShowResponse(false);
    setShowConfirm(false);
    setShowUserBubble(false);
    setStep(0);
  }, [activeId, hasStarted]);

  // Run animation sequence
  useEffect(() => {
    if (step < 0) return;
    const STEPS = buildSteps(scenario);
    if (step >= STEPS.length) return;
    const current = STEPS[step];
    const reduced = reducedMotion.current;

    if (current.type === "typing") {
      if (reduced) {
        setTypedText(current.text);
        timerRef.current = setTimeout(() => setStep(step + 1), 200);
        return;
      }
      const fullText = current.text;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTypedText(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(interval);
          timerRef.current = setTimeout(() => setStep(step + 1), 500);
        }
      }, 32);
      return () => clearInterval(interval);
    }

    if (current.type === "send") {
      setShowUserBubble(true);
      setTypedText("");
      timerRef.current = setTimeout(() => setStep(step + 1), reduced ? 200 : current.delay);
    }

    if (current.type === "thinking") {
      timerRef.current = setTimeout(
        () => {
          setThinkingSteps((prev) => [...prev, current.text]);
          timerRef.current = setTimeout(() => setStep(step + 1), reduced ? 150 : current.delay);
        },
        reduced ? 50 : 200
      );
    }

    if (current.type === "response") {
      setThinkingSteps([]);
      timerRef.current = setTimeout(
        () => {
          setShowResponse(true);
          timerRef.current = setTimeout(() => setStep(step + 1), reduced ? 200 : current.delay);
        },
        reduced ? 50 : 300
      );
    }

    if (current.type === "confirm") {
      timerRef.current = setTimeout(() => setShowConfirm(true), reduced ? 150 : current.delay);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step, scenario]);

  // Auto-rotate to next scenario after confirm + dwell
  useEffect(() => {
    if (!autoRotate || !hasStarted || isHoveringTabs || !showConfirm) return;
    rotateTimerRef.current = setTimeout(() => {
      const idx = SCENARIOS.findIndex((s) => s.id === activeId);
      setActiveId(SCENARIOS[(idx + 1) % SCENARIOS.length].id);
    }, 2800);
    return () => {
      if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
    };
  }, [showConfirm, autoRotate, hasStarted, isHoveringTabs, activeId]);

  const handleTabClick = (id: string) => {
    if (id === activeId) return;
    setAutoRotate(false);
    setActiveId(id);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Scenario menu */}
        <div
          className="lg:col-span-5"
          onMouseEnter={() => setIsHoveringTabs(true)}
          onMouseLeave={() => setIsHoveringTabs(false)}
        >
          {/* Mobile / tablet: horizontal pill tabs */}
          <div className="flex flex-wrap gap-2 justify-center lg:hidden mb-2">
            {SCENARIOS.map((s) => {
              const active = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleTabClick(s.id)}
                  aria-pressed={active}
                  aria-label={s.label}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
                  style={{
                    background: active ? GOLD_BG : "transparent",
                    color: active ? GOLD_DARK : MUTED,
                    border: `1px solid ${active ? GOLD_BORDER : BORDER}`,
                  }}
                >
                  <span style={{ color: active ? GOLD_DARK : MUTED }}>{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop: vertical numbered list */}
          <div className="hidden lg:block">
            <div
              className="mb-5 flex items-center gap-3 text-[10px] font-semibold tracking-[0.22em] uppercase"
              style={{ color: MUTED }}
            >
              <span className="h-px w-6" style={{ background: GOLD }} />
              Επιλέξτε σενάριο
            </div>
            <div className="space-y-1.5">
              {SCENARIOS.map((s, i) => {
                const active = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleTabClick(s.id)}
                    aria-pressed={active}
                    aria-label={s.label}
                    className="w-full group flex items-start gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 hover:-translate-y-[1px]"
                    style={{
                      background: active ? GOLD_BG : "transparent",
                      border: `1px solid ${active ? GOLD_BORDER : BORDER}`,
                      boxShadow: active ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
                    }}
                  >
                    <span
                      className="font-heading text-lg font-light tabular-nums leading-none mt-[3px] tracking-tight"
                      style={{ color: active ? GOLD_DARK : "oklch(0.72 0.03 260)" }}
                    >
                      {`0${i + 1}`}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className="flex items-center gap-2 text-[13px] font-semibold leading-tight"
                        style={{ color: active ? GOLD_DARK : NAVY }}
                      >
                        <span style={{ color: active ? GOLD_DARK : MUTED }}>{s.icon}</span>
                        {s.label}
                      </span>
                      <span
                        className="block mt-1 text-[11.5px] leading-relaxed"
                        style={{ color: MUTED }}
                      >
                        {s.description}
                      </span>
                    </span>
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-opacity"
                      style={{
                        background: GOLD,
                        opacity: active ? 1 : 0,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chat card */}
        <div className="lg:col-span-7">
          <div
            className="rounded-2xl border overflow-hidden shadow-xl"
            style={{ background: SURFACE, borderColor: BORDER }}
          >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ background: CARD_BG, borderColor: BORDER }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: GOLD_BG }}
          >
            <SparkleIcon />
          </div>
          <span className="text-sm font-semibold" style={{ color: NAVY }}>
            katastixo.com
          </span>
          <span
            className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: SUCCESS_BG, color: SUCCESS }}
          >
            Ενεργό
          </span>
        </div>

        {/* Chat area */}
        <div className="p-4 lg:p-5 space-y-3 min-h-[400px] lg:min-h-[520px]">
          {/* Input / typing */}
          {!showUserBubble && !scenario.withAttachment && (
            <div
              className="flex items-center gap-2 rounded-lg border px-3 py-2.5"
              style={{ borderColor: BORDER }}
            >
              <span className="text-sm flex-1" style={{ color: typedText ? NAVY : MUTED }}>
                {typedText || "Πληκτρολογήστε..."}
              </span>
              {typedText && (
                <div className="w-1.5 h-5 rounded-full animate-pulse" style={{ background: GOLD }} />
              )}
            </div>
          )}

          {!showUserBubble && scenario.withAttachment && (
            <div
              className="flex items-center gap-2 rounded-lg border px-3 py-2.5"
              style={{ borderColor: BORDER }}
            >
              <CameraIcon />
              <span className="text-sm flex-1" style={{ color: MUTED }}>
                Επισύναψη απόδειξης...
              </span>
              <div className="w-1.5 h-5 rounded-full animate-pulse" style={{ background: GOLD }} />
            </div>
          )}

          {/* User bubble */}
          {showUserBubble && (
            <div className="flex justify-end" style={{ animation: "slideUp 0.3s ease-out" }}>
              <div className="flex flex-col items-end gap-1.5 max-w-[85%]">
                {scenario.withAttachment && <ReceiptThumb />}
                <div
                  className="rounded-2xl rounded-tr-sm px-4 py-2.5"
                  style={{ background: NAVY_DEEP, color: "white" }}
                >
                  <p className="text-sm">{scenario.userMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Thinking steps */}
          {thinkingSteps.length > 0 && (
            <div className="flex items-start gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: GOLD_BG }}
              >
                <SparkleIcon />
              </div>
              <div className="space-y-1.5">
                {thinkingSteps.map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-medium"
                    style={{ color: MUTED, animation: "slideUp 0.25s ease-out" }}
                  >
                    {text === "Έτοιμο!" ? (
                      <CheckIcon />
                    ) : (
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin"
                        style={{ borderColor: GOLD, borderTopColor: "transparent" }}
                      />
                    )}
                    {text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI response with scenario card */}
          {showResponse && (
            <div
              className="flex items-start gap-2.5"
              style={{ animation: "slideUp 0.4s ease-out" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: GOLD_BG }}
              >
                <SparkleIcon />
              </div>
              <div className="space-y-2 max-w-[85%] flex-1 min-w-0">
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-2.5"
                  style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
                >
                  <p className="text-sm" style={{ color: NAVY }}>
                    {scenario.responseIntro}
                  </p>
                </div>
                <scenario.ResponseCard confirmed={showConfirm} />
              </div>
            </div>
          )}
        </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
