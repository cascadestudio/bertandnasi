# Configuration Umami Analytics

Ce guide vous explique comment configurer **Umami Cloud** pour le dashboard analytics du site Bert&Nasi.

## 🎯 Pourquoi Umami ?

- ✅ **Gratuit** : 10,000 événements/mois
- ✅ **Simple** : 5 minutes de setup
- ✅ **RGPD compliant** : Pas de cookies, pas de bannière
- ✅ **Dashboard professionnel** : Style Squarespace
- ✅ **Léger** : Script < 2KB (aucun impact SEO)

---

## 📋 Étapes de configuration

### 1. Créer un compte Umami Cloud

1. Allez sur [https://cloud.umami.is](https://cloud.umami.is)
2. Cliquez sur **"Sign up"**
3. Créez votre compte (gratuit, pas de carte bancaire)

### 2. Ajouter votre site web

1. Une fois connecté, cliquez sur **"Add website"**
2. Remplissez les informations :
   - **Name**: `Bert&Nasi`
   - **Domain**: `bertandnasi.com`
   - **Timezone**: `Europe/Paris` (ou votre timezone)
3. Cliquez sur **"Save"**

### 3. Récupérer votre Website ID

1. Dans le dashboard Umami, cliquez sur **"Settings"** (roue dentée) à côté de votre site
2. Allez dans l'onglet **"Tracking code"**
3. Copiez le **Website ID** (ressemble à `abc123-def456-ghi789`)

### 4. Configurer les variables d'environnement

#### En local (développement)

1. Créez un fichier `.env.local` à la racine du projet :
```bash
cp .env.local.example .env.local
```

2. Ouvrez `.env.local` et ajoutez votre Website ID :
```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=votre-website-id-ici
```

#### Sur Vercel (production)

1. Allez sur [https://vercel.com](https://vercel.com)
2. Sélectionnez votre projet `bertandnasi`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez la variable :
   - **Name**: `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
   - **Value**: votre Website ID copié depuis Umami
   - **Environment**: Cochez `Production`, `Preview`, et `Development`
5. Cliquez sur **"Save"**

### 5. Redéployer le site

Après avoir ajouté la variable sur Vercel :

1. Allez dans l'onglet **Deployments**
2. Cliquez sur les **3 points** à droite du dernier déploiement
3. Sélectionnez **"Redeploy"**
4. Attendez que le déploiement soit terminé

---

## ✅ Vérification

### Vérifier que le tracking fonctionne

1. Visitez votre site en production : `https://bertandnasi.com`
2. Ouvrez la console du navigateur (F12)
3. Cherchez des erreurs liées à Umami (il ne devrait pas y en avoir)
4. Retournez sur votre dashboard Umami Cloud
5. Rafraîchissez la page après 1-2 minutes
6. Vous devriez voir votre visite apparaître dans **"Realtime"**

### Dashboard Umami

Votre dashboard analytics est accessible sur :
- **URL** : [https://cloud.umami.is](https://cloud.umami.is)
- **Login** : Votre email et mot de passe

---

## 📊 Métriques disponibles (tracking automatique)

Umami Cloud trackera automatiquement :

- ✅ **Pages vues** : Toutes les pages visitées
- ✅ **Visiteurs uniques** : Nombre de visiteurs distincts
- ✅ **Sources de trafic** : D'où viennent les visiteurs (Google, direct, réseaux sociaux, etc.)
- ✅ **Pays et régions** : Géolocalisation des visiteurs
- ✅ **Appareils** : Desktop, mobile, tablette
- ✅ **Navigateurs** : Chrome, Firefox, Safari, etc.
- ✅ **Système d'exploitation** : Windows, macOS, iOS, Android, etc.
- ✅ **Pages les plus consultées** : Classement des pages par popularité
- ✅ **Durée de session** : Temps moyen passé sur le site
- ✅ **Taux de rebond** : Pourcentage de visiteurs quittant après 1 page

Toutes ces métriques sont disponibles en temps réel sur le dashboard Umami.

---

## 🔧 Configuration avancée (optionnel)

### Désactiver le tracking en développement

Le tracking est déjà désactivé automatiquement en mode développement (`npm run dev`).

Si vous voulez tester le tracking en local :
1. Commentez la ligne dans `src/components/analytics/UmamiAnalytics.tsx` :
```typescript
// if (process.env.NODE_ENV === 'development' || !websiteId) {
```

### Utiliser un Umami self-hosted

Si vous décidez plus tard de migrer vers une instance Umami self-hosted :

1. Ajoutez la variable d'environnement :
```env
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://votre-domaine-umami.com/script.js
```

2. Le composant utilisera automatiquement cette URL au lieu d'Umami Cloud

---

## 🆘 Support

- **Documentation Umami** : [https://umami.is/docs](https://umami.is/docs)
- **Support Umami** : [https://github.com/umami-software/umami/discussions](https://github.com/umami-software/umami/discussions)

---

## 📈 Limites du plan gratuit

- **10,000 événements/mois** (1 page vue = 1 événement)
- **1 utilisateur** sur le compte
- **Sites illimités**

Pour un site avec **50 visiteurs/jour × 3 pages = 150 pages vues/jour**, vous aurez :
- **~4,500 événements/mois** ✅ (bien en dessous de la limite)

Si vous dépassez 10,000 événements/mois, vous pouvez :
1. Passer au plan payant Umami Cloud (9€/mois pour illimité)
2. Migrer vers Umami self-hosted sur Vercel (gratuit, illimité)
