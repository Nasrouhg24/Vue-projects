
# Project Setup

Avant de démarrer, vous devez vous assurer que toutes les dépendances sont installées. Ensuite, vous pouvez configurer et démarrer le serveur `json-server` et l'application Vue.js.

## 1. **Installer les dépendances du projet**

Ouvrez un terminal dans le répertoire du projet, puis exécutez la commande suivante pour installer toutes les dépendances du projet :

```bash
npm install
```

Cette commande installe toutes les bibliothèques nécessaires pour faire fonctionner votre application Vue.js.

## 2. **Démarrer le serveur `json-server`**

Ensuite, pour démarrer un serveur API simulé avec `json-server`, exécutez la commande suivante dans le terminal. Cela va démarrer un serveur local pour fournir des données à votre application Vue.js depuis le fichier `pieces-autos.json` :

```bash
json-server --watch "C:\Users\nasre\PycharmProjects\S4\Developpement web\Vue\project1\src\pieces-autos.json"
```

Cela permettra à votre application Vue.js de récupérer des données depuis ce fichier JSON local à l'adresse `http://localhost:3000`.

## 3. **Lancer l'application Vue.js en mode développement**

Maintenant que votre serveur API est en fonctionnement, vous pouvez démarrer l'application Vue.js en mode développement avec la commande suivante :

```bash
npm run serve
```

Cela lance l'application Vue.js et la rend accessible à l'adresse `http://localhost:8080`.

## 4. **Générer une version de production**

Si vous êtes prêt à générer une version de production de votre application, exécutez la commande suivante pour compiler et minifier votre projet :

```bash
npm run build
```

Cela créera un dossier `dist/` contenant les fichiers optimisés pour la production.

---

### 5. **Personnaliser la configuration**

Pour personnaliser la configuration de votre projet Vue.js, vous pouvez consulter la [Configuration Reference](https://cli.vuejs.org/config/) pour plus de détails.

