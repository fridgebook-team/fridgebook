# Lebensmittel-Inventar-System – Technische Recherche

## Zielsetzung

Entwicklung eines Systems zur automatisierten Erfassung und Verwaltung
von Lebensmittelbeständen in Kühlschrank und Vorratskammer.

Kernanforderungen:
  - Minimierung des Entwicklungsaufwands
  - Minimierung des User-Aufwands (Compliance)
  - Geringe Fehlerquote
  - Hoher tatsächlicher Nutzen für die User

============================================================

## 1. Problemanalyse

### Warum bestehende Lösungen scheitern

  KI-Fotoerkennung (Kühlschrank-Kameras)
    -> Hohe Fehlerquote bei Verdeckung, ähnlichen Produkten,
       wechselnder Beleuchtung; hoher Entwicklungsaufwand

  Manuelle Eingabe (Apps wie Bring)
    -> Zu hoher User-Aufwand – wird nach kurzer Zeit nicht mehr gepflegt

  Barcode-Scanner pro Produkt
    -> Unrealistisch im Alltag (niemand scannt 20 Artikel beim Einräumen)

  Reine Fotoerkennung ohne Korrektur
    -> Fehlerquote zu hoch für verlässliches Inventar

### Die drei echten User-Probleme

  1. Nie wieder etwas doppelt kaufen
  2. Nie wieder Lebensmittel wegwerfen (weil schlecht geworden)
  3. Im Supermarkt nicht raten müssen, ob noch etwas da ist

============================================================

## 2. Bewertete Ansätze im Vergleich

  +----------------------+----------------+-------------+-----------+-------------+
  | Ansatz               | Entwicklungs-  | User-Aufwand| Fehler-   | Compliance  |
  |                      | aufwand        |             | quote     |             |
  +----------------------+----------------+-------------+-----------+-------------+
  | Manuelle Liste       | Gering         | Hoch        | Mittel    | Gering      |
  | Barcode-Scanner      | Gering         | Sehr hoch   | Gering    | Sehr gering |
  | KI-Foto (selbst)     | Sehr hoch      | Gering      | Hoch      | Mittel      |
  | KI-Foto (API)        | Mittel         | Gering      | Mittel    | Gut         |
  | Digitaler Bon        | Mittel         | Sehr gering | Sehr gering| Sehr gut   |
  +----------------------+----------------+-------------+-----------+-------------+

============================================================

## 3. Empfohlene Lösung: Handy-basiert mit digitalem Bon

### Kernprinzip

Erfassung dort, wo die Daten bereits digital existieren –
nicht dort, wo sie entstehen.

### Workflow

[EINKAUF]

  Nutzer bezahlt im Supermarkt
         |
         v
  Digitaler Kassenbon (E-Mail / Wallet / App-Screenshot)
         |
         v
  Unser System parsed den Bon automatisch
         |
         v
  Inventar wird aktualisiert

[VERBRAUCH]

  Nutzer hält leere Verpackung ans Handy
         |
         v
  Ein Tipp auf Widget oder NFC-Tag
         |
         v
  Kamera erkennt Produkt (oder manuelle Auswahl)
         |
         v
  Bestand wird reduziert

[ERGEBNIS (für den User)]

  - Automatische Einkaufsliste (basierend auf Bestand)
  - Warnung bei ablaufenden Produkten
  - Kein Doppelkauf mehr
  - Kein Raten im Supermarkt
  - Maximal 10 Sekunden Aufwand pro Tag

============================================================

## 4. Technische Architektur (Vorschlag)

### Komponenten

  FRONTEND (Flutter)

    - iOS & Android App
    - Widget für Homescreen (Schnellzugriff)
    - NFC-Tag-Integration (optional)
    - Kamera-Modus für Verbrauchserfassung
    - Einkaufsliste-View

  BACKEND (Node.js / Python)

    - E-Mail-Parser (Gmail API / IMAP / Forwarding)
    - Bon-OCR für Screenshots (Google Vision API / Tesseract)
    - Produkt-Datenbank (PostgreSQL / SQLite)
    - Bestandslogik & Haltbarkeitsberechnung
    - REST API für Frontend

  EXTERNE DIENSTE

    - Google Vision API (Produkterkennung als Fallback)
    - OpenAI API (falls komplexes Parsing nötig)
    - Lieferdienst-API (Rewe, Flink, etc. – optional)

### Datenmodell (vereinfacht)

  -- Produkte
  id, name, category, typical_shelf_life_days

  -- Bestand
  product_id, quantity, purchase_date, estimated_expiry_date

  -- Einkäufe (aus Bons)
  id, timestamp, source (email/screenshot/manual)

  -- Einkaufspositionen
  purchase_id, product_id, quantity, price

  -- Verbräuche
  id, product_id, timestamp, method (camera/manual)

============================================================

## 5. Digitaler Bon – Realisierbarkeit

### Verfügbarkeit in D/A/CH

  +----------------+----------------+------------------------+
  | Händler        | Digitaler Bon  | Zugänglichkeit         |
  +----------------+----------------+------------------------+
  | Rewe           | Ja (in App)    | Screenshot             |
  | dm             | Ja (in App)    | Screenshot             |
  | Lidl           | Ja (in App)    | Screenshot             |
  | Kaufland       | Ja (in App)    | Screenshot             |
  | Edeka          | Teilweise      | Regional unterschiedl. |
  | Billa (AT)     | Ja (in App)    | Screenshot             |
  | Hofer (AT)     | Nein           | Nur Papierbon          |
  | Spar (AT)      | Teilweise      | Jö-Bonus-App           |
  +----------------+----------------+------------------------+

### Technische Umsetzungsoptionen

  +-------------------+-------------------------------------------+
  | Methode           | Vorteil / Nachteil                        |
  +-------------------+-------------------------------------------+
  | E-Mail-Parsing    | + Vollautomatisch                         |
  |                   | - Händler muss Bon per E-Mail senden      |
  |                   | - Unterschiedliche Formate                |
  +-------------------+-------------------------------------------+
  | Screenshot + OCR  | + Funktioniert bei allen Händlern mit App |
  |                   | - User muss Screenshot machen (2 Sek.)    |
  +-------------------+-------------------------------------------+
  | Wallet-Pass       | + Elegant                                 |
  |                   | - Kaum unterstützt                        |
  +-------------------+-------------------------------------------+
  | Händler-API       | + Perfekt                                 |
  |                   | - Nicht öffentlich verfügbar              |
  +-------------------+-------------------------------------------+

Empfehlung: E-Mail-Parsing als primärer Weg, Screenshot-OCR als Fallback.

============================================================

## 6. Verbrauchserfassung – UX-Optimierung

### Warum nicht beim Entnehmen erfassen?

  - Zu viele Interaktionen (jedes Öffnen des Kühlschranks)
  - Hohe Frustration

### Bessere Lösung: Erfassung bei Leermeldung

Der natürliche Moment: Die leere Verpackung ist in der Hand.

  +------------------------+-------------------+---------------------+
  | Methode                | User-Aufwand      | Technischer Aufwand |
  +------------------------+-------------------+---------------------+
  | Widget-Tipp + Kamera   | 2 Sekunden        | Gering              |
  | NFC-Tag am Mülleimer   | 1 Sekunde         | Mittel (Hardware)   |
  | KI-Mülleimer (auto)    | 0 Sekunden        | Hoch (nicht empf.)  |
  +------------------------+-------------------+---------------------+

============================================================

## 7. Entwicklungs-Stufen (Roadmap)

### Stufe 1 – MVP (4–6 Wochen)

  - Flutter App mit:
    * Widget für Schnellzugriff
    * Kamera-Erfassung für Verbrauch (mit API-basierter Produkterkennung)
    * Manuelle Einkaufserfassung (als Fallback)

  - Backend mit:
    * Produkt-Datenbank
    * Bestandslogik
    * Einfacher Einkaufsliste

### Stufe 2 – Digitaler Bon (2–3 Wochen)

  - E-Mail-Parsing-Integration (Gmail API)
  - Screenshot-OCR als Alternative
  - Automatische Inventar-Aktualisierung nach Einkauf

### Stufe 3 – Automation & Integration (optional)

  - Lieferdienst-API-Anbindung (Ein-Klick-Nachbestellung)
  - Haltbarkeitsvorhersage basierend auf Produktkategorie
  - Mehrere Haushaltsmitglieder / geteilte Inventare

============================================================

## 8. Entscheidungsmatrix

  +------------------------+---------------------+-----------------------+
  | Kriterium              | Unser Ansatz        | KI-Kühlschrank        |
  +------------------------+---------------------+-----------------------+
  | Entwicklungsaufwand    | Mittel              | Hoch                  |
  | User-Aufwand           | Sehr gering         | Gering                |
  | Fehlerquote            | Sehr gering         | Mittel–Hoch           |
  | Compliance             | Hoch                | Mittel                |
  | Hardware-Kosten        | Keine (nur Handy)   | Hoch                  |
  | Skalierbarkeit         | Hoch                | Mittel                |
  +------------------------+---------------------+-----------------------+

============================================================

## 9. Offene Fragen / To-Dos

  [ ] Welche Händler unterstützen E-Mail-Bons? API-Recherche erforderlich.
  [ ] Gibt es einen standardisierten Weg, Wallet-Pässe zu generieren?
  [ ] Wie gut ist Google Vision API mit deutschsprachigen Produktverpackungen?
  [ ] Welche NFC-Tags sind für Mülleimer-Integration geeignet?
  [ ] Datenschutz: Wo werden Bon-Daten gespeichert? (On-Premise / Cloud?)

============================================================

## 10. Fazit

Wir setzen auf:

  1. Handy-First (kein dediziertes Tablet)
  2. Digitaler Bon als primäre Einkaufserfassung
  3. Widget + Kamera für Verbrauchserfassung
  4. Flutter + Node.js/Python als Technologie-Stack
  5. Keine Hardware-Entwicklung

Dieser Ansatz minimiert:
  - Entwicklungsaufwand
  - User-Aufwand (max. 10 Sekunden pro Tag)
  - Fehlerquote

Und maximiert:
  - Tatsächliche Nutzung
  - Skalierbarkeit

============================================================

## 11. Nächste Schritte

  1. Prototyp Backend: E-Mail-Parsing für einen Händler implementieren
  2. Prototyp App: Widget + Kamera für Verbrauchserfassung
  3. Test mit 3–5 Haushalten: 2 Wochen Nutzung, Feedback sammeln
  4. Entscheidung auf Basis der Testergebnisse

============================================================

Letzte Aktualisierung: März 2026
