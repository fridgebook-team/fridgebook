# Contribution Guidelines - FridgeBook 🧊📱

Willkommen im FridgeBook-Team!  
Damit alle sauber zusammenarbeiten können, halten wir uns an diese Regeln. Bitte :)

---

## 🌿 Branching-Strategie

Wir arbeiten mit einem **Hybrid-Modell** aus GitHub Flow und Git Flow:

- `main` → Nur für Präsentationen & Meilensteine (heilig!)
- `dev` → Unser täglicher Arbeitsstand (hier wird gemerged)
- `feature/[kürzel]/[feature-name]` → Dein persönlicher Arbeitsbranch

- Bruno fragen!

**Beispiele:**
- `feature/ba/barcode-scanner` // ba = Bianca Amberger
- `feature/mp/inventory-ui` // mp = Mariella Pranjic
- `feature/be/recipe-api` // be = Bruno Exler 

> **Wichtig:**  NIE direkt auf `main` oder `dev` arbeiten. Immer im eigenen Feature-Branch!

---

## 🔄 Täglicher Workflow

### 1. Neuen Branch erstellen (für ein neues Feature)
```bash
git checkout dev
git pull origin dev
git checkout -b feature/[kürzel]/[feature-name]
