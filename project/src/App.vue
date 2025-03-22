<template>
  <div id="app">
    <!-- Header -->
    <header>
      <img src="https://static.vecteezy.com/system/resources/thumbnails/013/923/537/small_2x/red-car-vehicle-auto-detailing-logo-png.png" alt="LOGO" />
      <h1>Les Bonnes Pièces</h1>
    </header>

    <!-- Section de filtrage -->
    <section class="filtres">
      <input v-model="search" placeholder="Rechercher une pièce..." />
      <select v-model="selectedCategory">
        <option value="">Toutes les catégories</option>
        <option v-for="categorie in categories" :key="categorie" :value="categorie">
          {{ categorie }}
        </option>
      </select>
      <select v-model="tri">
        <option value="">Pas d'ordre par prix</option>
        <option value="1">Croissant</option>
        <option value="2">Décroissant</option>
      </select>
    </section>

    <!-- Contenu principal : Panier et Fiches Produits -->
    <main>
      <!-- Panier à gauche -->
      <section class="panier">
        <h3>Panier</h3>
        <div v-for="item in Object.values(panier)" :key="item.id" class="item-panier">

          <p>{{ item.nom }} - {{ item.prix }}€ x {{ item.quantite }}</p>
          <button @click="minus(item.id)">-</button>
        </div>
      </section>

      <!-- Fiches produits à droite -->
      <section class="fiches">
        <div v-for="piece in filteredPieces" :key="piece.id"  class="piece">

          <h4>{{ piece.nom }}</h4>
          <p><strong>Prix:</strong> {{ piece.prix }}€</p>
          <p><strong>Catégorie:</strong> {{ piece.categorie }}</p>

          <img :src="piece.image">
          <button @click="add(piece)">+</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      selectedCategory: "",
      pieces: [],
      panier: {},
      tri: "",
    };
  },
  methods: {
    add(piece) {
      if (!this.panier.hasOwnProperty(piece.id)) {
        this.panier[piece.id] = {...piece, quantite: 0};
      }
      this.panier[piece.id].quantite++;
      localStorage.setItem("panier", JSON.stringify(this.panier)); // Sauvegarde dans le localStorage
      console.log(this.panier);
    },

    minus(id) {
      if (this.panier[id]) {
        this.panier[id].quantite--;
        if (this.panier[id].quantite === 0) {
          delete this.panier[id]; // Supprime l'élément du panier
        }
        localStorage.setItem("panier", JSON.stringify(this.panier)); // Sauvegarde dans le localStorage
      }
    },
  },
  computed: {
    filteredPieces() {
      let pi = this.pieces.filter(piece => {
        // Filtrer par catégorie et nom
        return (
          (!this.selectedCategory || piece.categorie === this.selectedCategory) &&
          piece.nom.toLowerCase().includes(this.search.toLowerCase()) &&
          piece.disponible === true
        );
      });

      if (this.tri === "1") {
        pi.sort((a, b) => a.prix - b.prix); // Tri croissant
      } else if (this.tri === "2") {
        pi.sort((a, b) => b.prix - a.prix); // Tri décroissant
      }

      return pi;
    },
    categories() {
      // Retrouver toutes les catégories sans doublons
      return [...new Set(this.pieces.map(piece => piece.categorie))];
    },
  },
  mounted() {
    // Récupérer le panier sauvegardé depuis localStorage
    const panierSauvegarde = localStorage.getItem("panier");
    if (panierSauvegarde) {
      this.panier = JSON.parse(panierSauvegarde);
    }

    // Fetching des données
    const urls = Array.from({length: 25}, (_, i) => `http://localhost:3000/${i}`);

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
        .then(responses => {
          this.pieces = responses.flat(); // Aplatir les données si nécessaire
        })
        .catch(error => console.error("Erreur lors du chargement des données:", error));
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

body {
  max-width: 1200px;
  margin: auto;
  padding: 16px;
  font-family: 'Montserrat', sans-serif;
  background-color: #f9f9f9;
}

/* Header */
header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #7451eb;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

header img {
  height: 60px;
  margin-right: 16px;
}

header h1 {
  flex-grow: 1;
  font-size: 1.8em;
  font-weight: 600;
}

/* Section de filtrage */
.filtres {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.filtres input,
.filtres select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filtres input:focus,
.filtres select:focus {
  outline: none;
  border-color: #7451eb;
  box-shadow: 0 0 5px rgba(116, 81, 235, 0.5);
}

.filtres input:hover,
.filtres select:hover {
  border-color: #7451eb;
}

/* Contenu principal : Panier et Fiches Produits */
main {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* Panier */
.panier {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  flex-shrink: 0;
}

.panier h3 {
  text-align: center;
  color: #333;
  font-size: 1.5em;
  margin-bottom: 16px;
  font-weight: 600;
}

.item-panier {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  background-color: #f8f8f8;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.item-panier:hover {
  background-color: #f0f0f0;
}

.item-panier p {
  font-size: 1em;
  color: #333;
  flex-grow: 1;
  margin: 0;
}

.item-panier button {
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;
}

.item-panier button:hover {
  background-color: #e64a19;
}

.item-panier button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Fiches Produits */
.fiches {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  flex-grow: 1;
}

.piece {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 220px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.piece:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.piece h4 {
  font-size: 1.1em;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

.piece p {
  margin: 5px 0;
  font-size: 0.9em;
  color: #666;
}

.piece img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-bottom: 10px;
  background: #f8f8f8;
  border-radius: 5px;
}

.piece button {
  background: #ff5722;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;
}

.piece button:hover {
  background: #e64a19;
}
</style>