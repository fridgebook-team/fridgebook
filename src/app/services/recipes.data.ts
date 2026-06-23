import { Recipe } from '../models/recipe';

export const RECIPES: Recipe[] = [
  {
    id: 0,
    name: 'Creamy Tuscan Ravioli',
    subtitle: 'Cremige Pasta mit Spinat und Tomaten in 15 Minuten',
    image: 'images/recipes/ravioli.jpg',
    time: '15 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: false,
    isVeggie: true,
    matchPercentage: 100,
    borderColor: '#000000',
    description: 'Schnelle cremige Pasta mit viel Geschmack.',
    tags: ['Schnell', 'Pasta', 'Comfort Food'],
    ingredients: [
      { amount: '250 g', name: 'Ravioli' },
      { amount: '120 g', name: 'Kirschtomaten' },
      { amount: '80 g', name: 'Spinat' },
      { amount: '150 ml', name: 'Sahne' },
      { amount: '1 Zehe', name: 'Knoblauch' }
    ],
    steps: [
      { title: 'Kochen', description: 'Ravioli garen.' },
      { title: 'Sauce', description: 'Knoblauch, Tomaten und Sahne erhitzen.' }
    ],
    tips: [
      { icon: 'bi bi-lightbulb', text: 'Mit Parmesan verfeinern.' }
    ]
  },

  {
    id: 1,
    name: 'Spaghetti Aglio e Olio',
    subtitle: 'Knoblauch-Öl Pasta in nur 20 Minuten',
    image: 'images/recipes/1.jpg',
    time: '20 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: true,
    isVeggie: true,
    matchPercentage: 60,
    borderColor: '#b38728',
    description: 'Klassische italienische Pasta mit Knoblauch, Olivenöl und Chili.',
    tags: ['Schnell', 'Pasta', 'Italienisch'],
    ingredients: [
      { amount: '200 g', name: 'Spaghetti' },
      { amount: '3 Zehen', name: 'Knoblauch' },
      { amount: '4 EL', name: 'Olivenöl' },
      { amount: '1 TL', name: 'Chiliflocken' },
      { amount: 'Salz', name: 'nach Geschmack' }
    ],
    steps: [
      { title: 'Pasta kochen', description: 'Spaghetti al dente kochen.' },
      { title: 'Aromatisieren', description: 'Knoblauch in Öl anbraten und mit Chili mischen.' }
    ],
    tips: [
      { icon: 'bi bi-lightbulb', text: 'Mit frischer Petersilie toppen.' }
    ]
  },

  {
    id: 2,
    name: 'Chicken Teriyaki Bowl',
    subtitle: 'Süß-salzige Hähnchen-Reis-Bowl',
    image: 'images/recipes/2.jpg',
    time: '30 Min',
    difficulty: 'Mittel',
    servings: '2',
    isVegan: false,
    isVeggie: false,
    matchPercentage: 40,
    borderColor: '#b38728',
    description: 'Japanisch inspirierte Bowl mit Hähnchen und Teriyaki-Sauce.',
    tags: ['Bowl', 'Asiatisch', 'Proteinreich'],
    ingredients: [
      { amount: '200 g', name: 'Hähnchenbrust' },
      { amount: '150 g', name: 'Reis' },
      { amount: '4 EL', name: 'Teriyaki-Sauce' },
      { amount: '1 Stück', name: 'Brokkoli' },
      { amount: '1 TL', name: 'Sesam' }
    ],
    steps: [
      { title: 'Reis kochen', description: 'Reis garen.' },
      { title: 'Hähnchen braten', description: 'Hähnchen anbraten und mit Sauce glasieren.' }
    ],
    tips: [
      { icon: 'bi bi-lightbulb', text: 'Mit Frühlingszwiebeln servieren.' }
    ]
  },

  {
    id: 3,
    name: 'Vegan Buddha Bowl',
    subtitle: 'Bunte Gemüse-Bowl mit Quinoa',
    image: 'images/recipes/3.jpg',
    time: '25 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: true,
    isVeggie: true,
    matchPercentage: 85,
    borderColor: '#4A5D23',
    description: 'Gesunde Bowl voller frischer Zutaten und Proteine.',
    tags: ['Gesund', 'Vegan', 'Bowl'],
    ingredients: [
      { amount: '120 g', name: 'Quinoa' },
      { amount: '1 Stück', name: 'Avocado' },
      { amount: '100 g', name: 'Kichererbsen' },
      { amount: '1 Stück', name: 'Karotte' },
      { amount: '2 EL', name: 'Tahini' }
    ],
    steps: [
      { title: 'Quinoa kochen', description: 'Quinoa garen und abkühlen lassen.' },
      { title: 'Bowl bauen', description: 'Alle Zutaten anrichten und Dressing hinzufügen.' }
    ],
    tips: [
      { icon: 'bi bi-lightbulb', text: 'Mit Zitronensaft abrunden.' }
    ]
  },

  {
    id: 4,
    name: 'Tomato Basil Pasta',
    subtitle: 'Frische Tomaten-Pasta mit Basilikum',
    image: 'images/recipes/4.jpg',
    time: '15 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: true,
    isVeggie: true,
    matchPercentage: 70,
    borderColor: '#4A5D23',
    description: 'Leichte Pasta mit fruchtiger Tomatensauce.',
    tags: ['Pasta', 'Frisch', 'Schnell'],
    ingredients: [
      { amount: '200 g', name: 'Pasta' },
      { amount: '200 g', name: 'Tomaten' },
      { amount: '1 Bund', name: 'Basilikum' },
      { amount: '2 EL', name: 'Olivenöl' },
      { amount: '1 Zehe', name: 'Knoblauch' }
    ],
    steps: [
      { title: 'Sauce kochen', description: 'Tomaten mit Knoblauch erhitzen.' },
      { title: 'Mischen', description: 'Pasta unterheben und Basilikum hinzufügen.' }
    ],
    tips: [
      { icon: 'bi bi-lightbulb', text: 'Mit Pfeffer abschmecken.' }
    ]
  },

  {
    id: 5,
    name: 'Creamy Garlic Mushrooms',
    subtitle: 'Cremige Champignons in Knoblauchsauce',
    image: 'images/recipes/5.jpg',
    time: '20 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: false,
    isVeggie: true,
    matchPercentage: 65,
    borderColor: '#b38728',
    description: 'Herzhafte Pilzpfanne mit cremiger Sauce.',
    tags: ['Pilze', 'Cremig', 'Beilage'],
    ingredients: [
      { amount: '250 g', name: 'Champignons' },
      { amount: '150 ml', name: 'Sahne' },
      { amount: '2 Zehen', name: 'Knoblauch' },
      { amount: '1 EL', name: 'Butter' },
      { amount: 'Salz', name: 'nach Geschmack' }
    ],
    steps: [
      { title: 'Pilze anbraten', description: 'Champignons goldbraun braten.' },
      { title: 'Sauce', description: 'Sahne und Knoblauch hinzufügen.' }
    ],
    tips: [
      { icon: 'bi bi-lightbulb', text: 'Mit Kräutern verfeinern.' }
    ]
  },

  {
    id: 6,
    name: 'Mushroom Truffle Risotto',
    subtitle: 'Cremiges Risotto mit aromatischen Pilzen',
    image: 'images/recipes/6.jpg',
    time: '35 Min',
    difficulty: 'Mittel',
    servings: '2',
    isVegan: false,
    isVeggie: true,
    matchPercentage: 78,
    borderColor: '#4A5D23',
    description: 'Cremiges Risotto mit Champignons und Trüffelöl.',
    tags: ['Risotto', 'Cremig', 'Comfort Food'],
    ingredients: [
        { amount: '180 g', name: 'Risottoreis' },
        { amount: '200 g', name: 'Champignons' },
        { amount: '1 L', name: 'Gemüsebrühe' },
        { amount: '1 EL', name: 'Butter' },
        { amount: '1 TL', name: 'Trüffelöl' }
    ],
    steps: [
        { title: 'Anbraten', description: 'Reis und Pilze kurz anrösten.' },
        { title: 'Köcheln', description: 'Brühe nach und nach einrühren.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Parmesan servieren.' }
    ]
    },
    {
    id: 7,
    name: 'Thai Coconut Curry',
    subtitle: 'Würziges Curry mit Kokosmilch und Gemüse',
    image: 'images/recipes/7.jpg',
    time: '30 Min',
    difficulty: 'Mittel',
    servings: '2',
    isVegan: true,
    isVeggie: true,
    matchPercentage: 84,
    borderColor: '#4A5D23',
    description: 'Aromatisches Curry mit Kokos und Thai-Gewürzen.',
    tags: ['Curry', 'Asiatisch', 'Vegan'],
    ingredients: [
        { amount: '200 ml', name: 'Kokosmilch' },
        { amount: '150 g', name: 'Paprika' },
        { amount: '100 g', name: 'Zucchini' },
        { amount: '1 EL', name: 'Curry Paste' },
        { amount: '150 g', name: 'Reis' }
    ],
    steps: [
        { title: 'Gemüse anbraten', description: 'Gemüse kurz anrösten.' },
        { title: 'Köcheln', description: 'Mit Kokosmilch und Curry köcheln lassen.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Limette servieren.' }
    ]
    },
    {
    id: 8,
    name: 'BBQ Chicken Wrap',
    subtitle: 'Herzhafter Wrap mit rauchigem BBQ Chicken',
    image: 'images/recipes/8.jpg',
    time: '20 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: false,
    isVeggie: false,
    matchPercentage: 55,
    borderColor: '#b38728',
    description: 'Schneller Wrap mit BBQ-Hähnchen und Gemüse.',
    tags: ['Wrap', 'Schnell', 'Proteinreich'],
    ingredients: [
        { amount: '2 Stück', name: 'Tortilla Wraps' },
        { amount: '200 g', name: 'Hähnchenbrust' },
        { amount: '3 EL', name: 'BBQ Sauce' },
        { amount: '50 g', name: 'Salat' },
        { amount: '50 g', name: 'Mais' }
    ],
    steps: [
        { title: 'Braten', description: 'Hähnchen anbraten und marinieren.' },
        { title: 'Füllen', description: 'Alle Zutaten im Wrap zusammenrollen.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Joghurt-Sauce toppen.' }
    ]
    },
    {
    id: 9,
    name: 'Mediterranean Couscous Bowl',
    subtitle: 'Leichte Bowl mit frischem Couscous',
    image: 'images/recipes/9.png',
    time: '15 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: true,
    isVeggie: true,
    matchPercentage: 91,
    borderColor: '#4A5D23',
    description: 'Frische mediterrane Bowl mit Gemüse und Kräutern.',
    tags: ['Bowl', 'Mediterran', 'Schnell'],
    ingredients: [
        { amount: '150 g', name: 'Couscous' },
        { amount: '100 g', name: 'Gurke' },
        { amount: '100 g', name: 'Tomaten' },
        { amount: '1 EL', name: 'Olivenöl' },
        { amount: '1 TL', name: 'Zitronensaft' }
    ],
    steps: [
        { title: 'Couscous zubereiten', description: 'Mit heißem Wasser quellen lassen.' },
        { title: 'Mischen', description: 'Mit Gemüse und Dressing vermengen.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit frischer Petersilie verfeinern.' }
    ]
    },
    {
    id: 10,
    name: 'Cheesy Nacho Bake',
    subtitle: 'Ofengericht mit Käse und knusprigen Nachos',
    image: 'images/recipes/10.jpg',
    time: '25 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: false,
    isVeggie: true,
    matchPercentage: 72,
    borderColor: '#b38728',
    description: 'Käsig, knusprig und perfekt zum Teilen.',
    tags: ['Ofen', 'Snack', 'Comfort Food'],
    ingredients: [
        { amount: '150 g', name: 'Nachos' },
        { amount: '100 g', name: 'Cheddar' },
        { amount: '100 g', name: 'Tomatensalsa' },
        { amount: '50 g', name: 'Mais' },
        { amount: '1 Stück', name: 'Jalapeños' }
    ],
    steps: [
        { title: 'Schichten', description: 'Alles in eine Auflaufform geben.' },
        { title: 'Backen', description: 'Im Ofen überbacken bis goldbraun.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Sour Cream servieren.' }
    ]
    },
    {
    id: 11,
    name: 'Avocado Pasta',
    subtitle: 'Cremige Pasta mit Avocado Sauce',
    image: 'images/recipes/11.jpg',
    time: '15 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: true,
    isVeggie: true,
    matchPercentage: 88,
    borderColor: '#4A5D23',
    description: 'Schnelle grüne Pasta mit gesunder Avocado.',
    tags: ['Pasta', 'Gesund', 'Schnell'],
    ingredients: [
        { amount: '200 g', name: 'Pasta' },
        { amount: '1 Stück', name: 'Avocado' },
        { amount: '1 Zehe', name: 'Knoblauch' },
        { amount: '1 EL', name: 'Zitronensaft' },
        { amount: '2 EL', name: 'Olivenöl' }
    ],
    steps: [
        { title: 'Pasta kochen', description: 'Al dente garen.' },
        { title: 'Mixen', description: 'Avocado Sauce pürieren und unterheben.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Chili toppen.' }
    ]
    },
    {
    id: 12,
    name: 'Teriyaki Salmon Bowl',
    subtitle: 'Asiatische Bowl mit Lachs und Reis',
    image: 'images/recipes/12.jpg',
    time: '30 Min',
    difficulty: 'Mittel',
    servings: '2',
    isVegan: false,
    isVeggie: false,
    matchPercentage: 60,
    borderColor: '#b38728',
    description: 'Süß-salzige Bowl mit glasierter Teriyaki-Soße.',
    tags: ['Bowl', 'Fisch', 'Asiatisch'],
    ingredients: [
        { amount: '200 g', name: 'Lachs' },
        { amount: '150 g', name: 'Reis' },
        { amount: '3 EL', name: 'Teriyaki Sauce' },
        { amount: '50 g', name: 'Edamame' },
        { amount: '1 TL', name: 'Sesam' }
    ],
    steps: [
        { title: 'Lachs braten', description: 'Kurz anbraten und glasieren.' },
        { title: 'Servieren', description: 'Mit Reis und Gemüse anrichten.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Frühlingszwiebeln toppen.' }
    ]
    },
    {
    id: 13,
    name: 'Veggie Stir Fry Noodles',
    subtitle: 'Gebratene Nudeln mit Gemüse',
    image: 'images/recipes/13.jpg',
    time: '20 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: true,
    isVeggie: true,
    matchPercentage: 86,
    borderColor: '#4A5D23',
    description: 'Schnelles asiatisches Nudelgericht mit Gemüse.',
    tags: ['Nudeln', 'Asiatisch', 'Schnell'],
    ingredients: [
        { amount: '200 g', name: 'Nudeln' },
        { amount: '100 g', name: 'Karotten' },
        { amount: '100 g', name: 'Paprika' },
        { amount: '2 EL', name: 'Sojasauce' },
        { amount: '1 EL', name: 'Sesamöl' }
    ],
    steps: [
        { title: 'Nudeln kochen', description: 'Kurz vorkochen.' },
        { title: 'Anbraten', description: 'Alles im Wok vermengen.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Sesam bestreuen.' }
    ]
    },
    {
    id: 14,
    name: 'French Toast Deluxe',
    subtitle: 'Süßes Frühstück mit Zimt und Ahornsirup',
    image: 'images/recipes/14.jpg',
    time: '15 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: false,
    isVeggie: true,
    matchPercentage: 92,
    borderColor: '#4A5D23',
    description: 'Knuspriger French Toast für den perfekten Start.',
    tags: ['Frühstück', 'Süß', 'Comfort Food'],
    ingredients: [
        { amount: '4 Scheiben', name: 'Brot' },
        { amount: '2 Stück', name: 'Eier' },
        { amount: '100 ml', name: 'Milch' },
        { amount: '1 TL', name: 'Zimt' },
        { amount: '2 EL', name: 'Ahornsirup' }
    ],
    steps: [
        { title: 'Mischung', description: 'Eier und Milch verquirlen.' },
        { title: 'Braten', description: 'Brot goldbraun braten.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Beeren servieren.' }
    ]
    },

    {
    id: 15,
    name: 'Classic Margherita Pizza',
    subtitle: 'Knusprige Pizza mit Tomate, Mozzarella und Basilikum',
    image: 'images/recipes/15.jpg',
    time: '25 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: false,
    isVeggie: true,
    matchPercentage: 89,
    borderColor: '#4A5D23',
    description: 'Italienische Pizza mit frischen Zutaten und knusprigem Boden.',
    tags: ['Pizza', 'Italienisch', 'Comfort Food'],
    ingredients: [
        { amount: '1 Stück', name: 'Pizzateig' },
        { amount: '100 g', name: 'Tomatensauce' },
        { amount: '150 g', name: 'Mozzarella' },
        { amount: '1 Handvoll', name: 'Basilikum' },
        { amount: '1 EL', name: 'Olivenöl' }
    ],
    steps: [
        { title: 'Belegen', description: 'Teig mit Sauce und Zutaten belegen.' },
        { title: 'Backen', description: 'Bei hoher Hitze knusprig backen.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Ofen richtig heiß vorheizen.' }
    ]
    },
    {
    id: 16,
    name: 'Juicy Beef Burger',
    subtitle: 'Saftiger Burger mit Patty, Salat und Sauce',
    image: 'images/recipes/16.jpg',
    time: '25 Min',
    difficulty: 'Mittel',
    servings: '2',
    isVegan: false,
    isVeggie: false,
    matchPercentage: 62,
    borderColor: '#b38728',
    description: 'Klassischer Burger mit saftigem Rindfleisch-Patty.',
    tags: ['Burger', 'Fast Food', 'Proteinreich'],
    ingredients: [
        { amount: '2 Stück', name: 'Burger Buns' },
        { amount: '200 g', name: 'Rinderhack' },
        { amount: '2 Scheiben', name: 'Cheddar' },
        { amount: '50 g', name: 'Salat' },
        { amount: '2 EL', name: 'Burger Sauce' }
    ],
    steps: [
        { title: 'Patty braten', description: 'Fleisch zu Patties formen und braten.' },
        { title: 'Zusammenbauen', description: 'Burger schichten und servieren.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit karamellisierten Zwiebeln toppen.' }
    ]
    },
    {
    id: 17,
    name: 'Crispy Chicken Schnitzel',
    subtitle: 'Knuspriges Schnitzel mit goldener Panade',
    image: 'images/recipes/17.jpg',
    time: '30 Min',
    difficulty: 'Mittel',
    servings: '2',
    isVegan: false,
    isVeggie: false,
    matchPercentage: 58,
    borderColor: '#b38728',
    description: 'Klassisches Schnitzel goldbraun und knusprig gebraten.',
    tags: ['Schnitzel', 'Deutsch', 'Comfort Food'],
    ingredients: [
        { amount: '2 Stück', name: 'Hähnchenbrust' },
        { amount: '1 Stück', name: 'Ei' },
        { amount: '50 g', name: 'Paniermehl' },
        { amount: '30 g', name: 'Mehl' },
        { amount: '2 EL', name: 'Öl' }
    ],
    steps: [
        { title: 'Panieren', description: 'Fleisch in Mehl, Ei und Panade wenden.' },
        { title: 'Braten', description: 'Goldbraun in Öl braten.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Zitrone servieren.' }
    ]
    },
    {
    id: 18,
    name: 'Golden Crispy Fries',
    subtitle: 'Knusprige Ofenpommes mit Salz und Gewürzen',
    image: 'images/recipes/18.jpg',
    time: '35 Min',
    difficulty: 'Einfach',
    servings: '2',
    isVegan: true,
    isVeggie: true,
    matchPercentage: 95,
    borderColor: '#4A5D23',
    description: 'Perfekt knusprige Pommes aus dem Ofen.',
    tags: ['Snacks', 'Beilage', 'Vegan'],
    ingredients: [
        { amount: '500 g', name: 'Kartoffeln' },
        { amount: '2 EL', name: 'Olivenöl' },
        { amount: '1 TL', name: 'Paprikapulver' },
        { amount: '1 TL', name: 'Salz' },
        { amount: '1 Prise', name: 'Pfeffer' }
    ],
    steps: [
        { title: 'Schneiden', description: 'Kartoffeln in Streifen schneiden.' },
        { title: 'Backen', description: 'Im Ofen knusprig backen.' }
    ],
    tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit veganer Mayo servieren.' }
    ]
    }

];