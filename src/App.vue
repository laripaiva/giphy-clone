<template>
  <v-app>
    <Toolbar />
    <v-container>
      <v-text-field v-model="search" label="Solo" placeholder="Search GIF" solo></v-text-field>
      <v-btn color="purple darken-4" class="white--text" @click.native="getGif(true, true)">submit</v-btn>
      <v-item-group>
        <v-row>
          <v-col v-for="g in gif" :key="g.id" cols="12" sm="4" lg="3">
            <v-item>
              <v-card>
                <v-img :src="g.images.original.url" class="white--text" height="300"></v-img>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="subtitle-1 text-center" cols="12">Getting your GIFs</v-col>
        <v-progress-circular indeterminate color="purple darken-4"></v-progress-circular>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
import infiniteScroll from "vue-infinite-scroll";
import axios from "axios";

let type;
let limit;
let search;

export default {
  name: "app",
  components: {
    Toolbar
  },
  data() {
    return {
      gif: [],
      search: ""
    };
  },
  methods: {
    getGif(value, change) {
      const url = "https://api.giphy.com/v1/gifs/";
      const key = "EUzSRkJo88fyanTPGTeEcuXOulKtgIwB";

      if (change == true) {
        limit = 12;
      }
      if (value != true) {
        axios
          .get(url + type + "?api_key=" + key + "&limit=" + limit + "&rating=G")
          .then(response => {
            this.gif = response.data.data;
            console.log("limite: " + limit);
          });
      } else {
        type = "search";
        axios
          .get(
            url +
              type +
              "?q=" +
              this.search +
              "&api_key=" +
              key +
              "&limit=" +
              limit +
              "&rating=G"
          )
          .then(response => {
            this.gif = response.data.data;
            console.log("limite: " + limit);
          });
      }
    },
    scroll(type) {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          if (type === "trending") {
            this.getGif(false, false);
          } else {
            this.getGif(true, false);
          }
        }
      };
    }
  },
  beforeMount() {
    type = "trending";
    limit = 12;
    search = "";
  },
  mounted() {
    this.getGif(false);
  },
  beforeUpdate() {
    limit += 4;
  },
  updated() {
    this.scroll(type);
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>