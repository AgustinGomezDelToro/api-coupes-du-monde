# API Coupes du Monde

Cette API fournit des données historiques sur les Coupes du Monde de football, les pays champions, les meilleurs joueurs et les matchs historiques des champions. Elle gère aussi l’authentification des utilisateurs.

## 🚀 Installation

1. **Cloner le projet**
   ```sh
   git clone <url-du-repo>
   cd flutter-tp-CDM
   ```
2. **Installer les dépendances**
   ```sh
   npm install
   ```
3. **Configurer les variables d’environnement**
   Créez un fichier `.env` à la racine avec :
   ```env
   DATABASE_URL=<votre_url_mongodb>
   JWT_SECRET=<votre_clé_secrète>
   ```

## 🏃‍♂️ Lancer en local

```sh
vercel dev
```

L’API sera disponible sur `http://localhost:3000`.

---

## 📚 Liste des routes de l’API

### Authentification et utilisateurs

- **POST `/api/signup`**  
  Crée un nouvel utilisateur (inscription) et retourne un token JWT.

- **POST `/api/login`**  
  Authentifie un utilisateur existant et retourne un token JWT.

---

### Données sur les Coupes du Monde

- **GET `/api/routes/champions`**  
  Retourne la liste de tous les pays champions du monde (informations de base).

- **GET `/api/routes/championsByYear?year=YYYY`**  
  Retourne le champion du monde pour une année donnée.

- **GET `/api/routes/championById?id=ID`**  
  Retourne les détails d’un champion à partir de son identifiant (ou nom si pas d’id).

- **GET `/api/routes/years`**  
  Retourne la liste de toutes les années de Coupe du Monde disponibles.

- **GET `/api/routes/bestPlayers`**  
  Retourne la liste des meilleurs joueurs de chaque Coupe du Monde.

- **GET `/api/routes/bestPlayerStats?year=YYYY`**  
  Retourne les statistiques du meilleur joueur pour une année donnée (si disponibles).

- **GET `/api/routes/championMatches?year=YYYY`**  
  Retourne la liste des matchs et résultats du pays champion pour une année donnée.

---

## 📝 Exemple d’utilisation (curl)

**Inscription :**
```sh
curl -X POST "http://localhost:3000/api/signup" \
  -H "Content-Type: application/json" \
  -d '{"name": "Nom Prénom", "email": "user@example.com", "password": "MotDePasse123"}'
```

**Login :**
```sh
curl -X POST "http://localhost:3000/api/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "MotDePasse123"}'
```

**Accès à une route protégée :**
```sh
curl -X GET "http://localhost:3000/api/routes/championMatches?year=2002" \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

---

## 👨‍💻 Licence

Projet pédagogique pour l’ESGI – Réalisation d’une API et d’une application Flutter web connectée. 