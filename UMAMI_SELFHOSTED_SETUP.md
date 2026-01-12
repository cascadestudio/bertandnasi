# Umami Self-Hosted sur Vercel - Guide Complet

Ce guide vous explique comment déployer **Umami Analytics** en self-hosted sur Vercel avec une base de données Vercel Postgres. Cette solution est **100% gratuite** et offre le **multi-utilisateurs**.

## 🎯 Avantages du Self-Hosting

- ✅ **Multi-utilisateurs gratuit** : Invitez le client avec son propre compte
- ✅ **Événements illimités** : Pas de limite de 10k/mois
- ✅ **Données chez vous** : Stockées sur Vercel Postgres
- ✅ **Gratuit** : Plan Vercel gratuit suffisant
- ✅ **Dashboard complet** : Identique à Umami Cloud

---

## 📋 Prérequis

- Un compte [Vercel](https://vercel.com) (gratuit)
- Un compte [GitHub](https://github.com) (gratuit)
- ~30-45 minutes

---

## 🚀 Étape 1 : Fork du repo Umami

1. Allez sur le repo officiel Umami :
   **https://github.com/umami-software/umami**

2. Cliquez sur **"Fork"** en haut à droite

3. Dans les options du fork :
   - **Repository name** : `bertandnasi-analytics` (ou le nom que vous voulez)
   - **Description** : `Analytics dashboard for Bert&Nasi`
   - Laissez les autres options par défaut

4. Cliquez sur **"Create fork"**

Vous avez maintenant votre propre copie d'Umami sur :
`https://github.com/VOTRE-USERNAME/bertandnasi-analytics`

---

## 🗄️ Étape 2 : Créer la base de données Vercel Postgres

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)

2. Dans le menu de gauche, cliquez sur **"Storage"**

3. Cliquez sur **"Create Database"**

4. Sélectionnez **"Postgres"** (Powered by Neon)

5. Configuration :
   - **Name** : `bertandnasi-analytics-db`
   - **Region** : `Frankfurt (fra1)` (ou la plus proche de vos utilisateurs)

6. Cliquez sur **"Create"**

7. Une fois créée, allez dans l'onglet **".env.local"**

8. **Copiez la valeur de `POSTGRES_URL`** (vous en aurez besoin à l'étape suivante)

   Elle ressemble à :
   ```
   postgres://default:xxxxxxxxxxxx@ep-xxxxx-xxxxx.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require
   ```

---

## 🌐 Étape 3 : Déployer Umami sur Vercel

### 3.1 Importer le projet

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)

2. Cliquez sur **"Add New..."** → **"Project"**

3. Dans **"Import Git Repository"**, trouvez votre fork `bertandnasi-analytics`

4. Cliquez sur **"Import"**

### 3.2 Configurer les variables d'environnement

Avant de déployer, ajoutez ces variables d'environnement :

| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | La `POSTGRES_URL` copiée à l'étape 2 |
| `APP_SECRET` | Une chaîne aléatoire (voir ci-dessous) |
| `DISABLE_TELEMETRY` | `1` |

**Pour générer `APP_SECRET`** :

Option A - Utiliser un générateur en ligne :
- Allez sur https://generate-secret.vercel.app/32
- Copiez la chaîne générée

Option B - En terminal :
```bash
openssl rand -hex 32
```

### 3.3 Lancer le déploiement

1. Vérifiez que toutes les variables sont configurées

2. Cliquez sur **"Deploy"**

3. Attendez la fin du déploiement (~2-3 minutes)

4. Une fois terminé, vous verrez une URL comme :
   `https://bertandnasi-analytics.vercel.app`

---

## 🔗 Étape 4 : Configurer un domaine personnalisé (Recommandé)

Pour avoir une URL propre comme `analytics.bertandnasi.com` :

1. Dans votre projet Vercel Umami, allez dans **"Settings"** → **"Domains"**

2. Ajoutez : `analytics.bertandnasi.com`

3. Vercel vous donnera les enregistrements DNS à ajouter

4. Dans votre gestionnaire DNS (Vercel, Cloudflare, etc.), ajoutez :
   - **Type** : `CNAME`
   - **Name** : `analytics`
   - **Value** : `cname.vercel-dns.com`

5. Attendez la propagation DNS (~5-10 minutes)

---

## 👤 Étape 5 : Créer le compte administrateur

1. Accédez à votre dashboard Umami :
   - `https://bertandnasi-analytics.vercel.app`
   - ou `https://analytics.bertandnasi.com` si vous avez configuré le domaine

2. Connectez-vous avec les identifiants par défaut :
   - **Username** : `admin`
   - **Password** : `umami`

3. **IMPORTANT** : Changez immédiatement le mot de passe !
   - Cliquez sur **"Settings"** (icône engrenage)
   - Allez dans **"Profile"**
   - Cliquez sur **"Change password"**
   - Entrez un nouveau mot de passe sécurisé

---

## 👥 Étape 6 : Inviter le client via Teams

Umami utilise un système de **Teams** pour partager l'accès.

### 6.1 Créer une Team

1. Dans Umami, allez dans **"Settings"** → **"Teams"**

2. Cliquez sur **"Create team"**

3. Donnez un nom à la team : `Bert&Nasi`

4. Cliquez sur **"Save"**

### 6.2 Récupérer le code d'accès

1. Cliquez sur la team créée

2. Notez le **Team ID** et le **Access Code**

3. Envoyez ces informations au client

### 6.3 Le client rejoint la Team

Le client doit :

1. Aller sur votre instance Umami (ex: `https://analytics.bertandnasi.com`)

2. Cliquer sur **"Create account"** pour créer son propre compte

3. Une fois connecté, aller dans **"Settings"** → **"Teams"**

4. Cliquer sur **"Join team"**

5. Entrer le **Team ID** et l'**Access Code** que vous lui avez fournis

6. Il aura maintenant accès au dashboard

### 6.4 Assigner le site à la Team

1. Allez dans **"Settings"** → **"Websites"**

2. Cliquez sur **"Edit"** (crayon) sur le site Bert&Nasi

3. Dans **"Team"**, sélectionnez la team `Bert&Nasi`

4. Cliquez sur **"Save"**

Maintenant le client aura accès au dashboard du site via son propre compte.

---

## 🌍 Étape 7 : Ajouter le site à tracker

1. Dans Umami, allez dans **"Settings"** → **"Websites"**

2. Cliquez sur **"Add website"**

3. Configuration :
   - **Name** : `Bert&Nasi`
   - **Domain** : `bertandnasi.com`
   - **Timezone** : `Europe/Paris`

4. Cliquez sur **"Save"**

5. Cliquez sur **"Edit"** (icône crayon) sur le site créé

6. Allez dans l'onglet **"Tracking code"**

7. **Copiez le Website ID** (ex: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

---

## 🔧 Étape 8 : Connecter le site Bert&Nasi à Umami

### 8.1 Configurer les variables d'environnement sur Vercel

1. Allez sur Vercel → Projet **bertandnasi** (le site principal, pas Umami)

2. **Settings** → **Environment Variables**

3. Ajoutez/Modifiez ces variables :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Le Website ID copié à l'étape 7 |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | `https://analytics.bertandnasi.com/script.js` (ou votre URL Umami) |

4. Cliquez sur **"Save"**

### 8.2 Redéployer le site

1. Allez dans **"Deployments"**

2. Sur le dernier déploiement, cliquez sur **"..."** → **"Redeploy"**

3. Attendez la fin du déploiement

---

## ✅ Étape 9 : Vérification

1. Visitez `https://bertandnasi.com` en navigation privée

2. Ouvrez la console développeur (F12) → Onglet **"Network"**

3. Cherchez une requête vers `analytics.bertandnasi.com/script.js`
   - Si elle apparaît avec status 200, le script est chargé ✅

4. Allez sur votre dashboard Umami

5. Dans **"Realtime"**, vous devriez voir votre visite apparaître après quelques secondes

---

## 📊 Accès au Dashboard

### Pour vous (Admin)
- **URL** : `https://analytics.bertandnasi.com`
- **Username** : `admin`
- **Password** : Celui que vous avez défini

### Pour le client
- **URL** : `https://analytics.bertandnasi.com`
- **Username** : `client-bertandnasi`
- **Password** : Celui que vous avez créé pour lui

---

## 🔄 Maintenance

### Mises à jour d'Umami

Pour mettre à jour Umami vers une nouvelle version :

1. Allez sur votre fork GitHub `bertandnasi-analytics`

2. Cliquez sur **"Sync fork"** → **"Update branch"**

3. Vercel redéploiera automatiquement

### Sauvegardes

Les données sont stockées sur Vercel Postgres qui fait des sauvegardes automatiques.

Pour exporter manuellement :
1. Allez sur Vercel → Storage → votre database
2. Utilisez l'onglet "Data" pour explorer/exporter

---

## 📈 Limites du plan gratuit Vercel

| Ressource | Limite gratuite | Estimation bertandnasi |
|-----------|-----------------|------------------------|
| Postgres Storage | 256 MB | ~50 MB/an (500k événements) |
| Postgres Compute | 60h/mois | ~5h/mois |
| Bandwidth | 100 GB/mois | < 1 GB/mois |

**Conclusion** : Le plan gratuit est largement suffisant pour ce site.

---

## 🆘 Dépannage

### "Database connection error"
- Vérifiez que `DATABASE_URL` est correct dans les variables d'environnement
- Vérifiez que la base Postgres est bien dans la même région que le déploiement

### "Invalid credentials" à la connexion
- Les identifiants par défaut sont `admin` / `umami`
- Si vous les avez changés et oubliés, vous devrez réinitialiser via la base de données

### Le tracking ne fonctionne pas
- Vérifiez que `NEXT_PUBLIC_UMAMI_WEBSITE_ID` est correct
- Vérifiez que `NEXT_PUBLIC_UMAMI_SCRIPT_URL` pointe vers votre instance Umami
- Ouvrez la console navigateur pour voir les erreurs éventuelles

### Erreur CORS
- Ajoutez votre domaine (bertandnasi.com) dans les paramètres du site sur Umami

---

## 📚 Ressources

- [Documentation officielle Umami](https://umami.is/docs)
- [GitHub Umami](https://github.com/umami-software/umami)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
