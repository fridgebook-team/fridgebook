# Contribution Guidelines - FridgeBook

---

##  Branching

- `main` → no touch pls (PRs most important)
- `dev` 
- `feature` -> name pls

**Wichtig:** NIE direkt auf main oder dev arbeiten. Immer im Feature-Branch!

---

## Workflow
### 1. Neuen Branch erstellen (für ein neues Feature)
```bash
git checkout dev
git pull origin dev
git checkout -b featurename
```
### 2. Arbeiten & committen
```bash
git add .
git commit -m "feat: kurze beschreibung"
```
Commit-Typen:

- `add:` neues Feature
- `fix:` Bugfix
- `update:` 
- `docs:` 
- `style:` Formatierung
- `refactor:` 

### 3. Regelmäßig den neuesten Stand von dev holen

`git fetch origin`
`git log origin/dev --oneline` (erst checken) oder `git lol` aus KONF
`git merge origin/dev` (einbauen)

### 4. Pushen ( erst nach fetch + merge!)

`git push origin feature`

---

## 🧪 Pull Request (PR) Prozess
1. Sobald Feature fertig ist:

2. Push den Branch (siehe oben)

3. Gehe auf GitHub → Pull Requests → New Pull Request

4. Base: `dev`
   Compare: `feature`

Titel & Beschreibung ausfüllen
(Was macht das Feature? Was wurde geändert?)

Mindestens 1 Teammitglied als Reviewer (bei main 2 bitte)

Warten auf Review

### Nach dem Review:
- Bei Änderungswünschen: Nachbessern, committen, pushen 
- Wenn der featurebranch nicht mehr gebraucht wird:
```bash
git branch -d feature
git push origin --delete feature
```
# ⚠️ Wichtige Regeln
- ✅ Niemals direkt auf main oder dev pushen
- ✅ Immer Pull Requests + Review (mindestens 1 Person)
- ✅ Vor jedem Push: fetch origin + log checken + ggf. merge origin/dev
- ✅ Commit-Nachrichten immer aussagekräftig
- ✅ Keine .env-Dateien, Passwörter oder API-Keys committen!
- ✅ Bei Konflikten: Team fragen!

# 🆘 Hilfe & Fragen
sagt bescheid
