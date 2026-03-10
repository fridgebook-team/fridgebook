#Contribution Guidelines - FridgeBook 🧊📱
Willkommen im FridgeBook-Team!
Damit wir alle sauber zusammenarbeiten können, halten wir uns an Regeln. Bitte (:

---

##🌿 Branching-Strategie

Arbeit mit **Hybrid-Modell** aus GitHub Flow und Git Flow: 
https://docs.github.com/en/get-started/using-github/github-flow
https://www.gitkraken.com/learn/git/git-flow

- `main` → Nur für Präsentationen & Meilensteine (heilig!)
- `dev` → Unser täglicher Arbeitsstand (hier wird gemerged)
- `feature/[kürzel]/[feature-name]` → persönlicher Arbeitsbranch

**Beispiele:**
`feature/ba/barcode-scanner` // ba = Bianca Amberger
`feature/mp/inventory-ui` // mp = Marialla Pranjic
`feature/be/recipe-api` // Ich glaube ihr könnt euch den Rest denken

**Wichtig:** NIE direkt auf main oder dev arbeiten. Immer im eigenen Feature-Branch!

---

##🔄 Täglicher Workflow
###1. Neuen Branch erstellen (für ein neues Feature)
```bash
git checkout dev
git pull origin dev
git checkout -b feature/[kürzel]/[feature-name]
```
###2. Arbeiten & committen
```bash
git add .
git commit -m "feat: kurze beschreibung"
```
Commit-Typen:

- `feat:` neues Feature
- `fix:` Bugfix
- `docs:` Dokumentation
- `style:` Formatierung
- `refactor:` Code verbessern
- `test:` Tests

###3. Regelmäßig den neuesten Stand von dev holen

`git fetch origin`
`git log origin/dev --oneline` (erst checken) oder `git lol` aus KONF
`git merge origin/dev` (einbauen)

Keine Überraschungen beim Pushen!

###4. Pushen ( erst nach fetch + merge!)

`git push origin feature/[kürzel]/[feature-name]`

---

##🧪 Pull Request (PR) Prozess
1. Sobald dein Feature fertig ist:

2. Push deinen Branch (siehe oben)

3. Gehe auf GitHub → Pull Requests → New Pull Request

4. Base: `dev`
   Compare: `feature/[kürzel]/[feature-name]`

Titel & Beschreibung ausfüllen
(Was macht das Feature? Was wurde geändert?)

Mindestens 1 Teammitglied als Reviewer

Warten auf Review

###Nach dem Review:
- Bei Änderungswünschen: Nachbessern, committen, pushen (der PR updated sich automatisch!)
- Wenn approved: Merge (per "Squash and merge" auf GitHub)

Aufräumen: (darüber können wir noch sprechen)
```bash
git branch -d feature/[kürzel]/[feature-name]
git push origin --delete feature/[kürzel]/[feature-name]
```
#⚠️ Wichtige Regeln
- ✅ Niemals direkt auf main oder dev pushen
- ✅ Immer Pull Requests + Review (mindestens 1 Person)
- ✅ Vor jedem Push: fetch origin + log checken + ggf. merge origin/dev
- ✅ Commit-Nachrichten immer aussagekräftig
- ✅ Keine .env-Dateien, Passwörter oder API-Keys committen!
- ✅ Bei Konflikten: Nicht in Panik verfallen – Team fragen!

#🆘 Hilfe & Fragen
Bei Problemen:
Im GitHub Issue diskutieren
Oder direkt im Team-Chat (WhatsApp/Discord) fragen
