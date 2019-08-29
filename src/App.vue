<template>
  <v-app>
    <Toolbar />
    <v-container>
      <v-text-field v-model="search" label="Search Gif" required></v-text-field>

      <v-btn color="pink" class="white--text" @click.native="infiniteHandler()">submit</v-btn>
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
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
    </v-container>
  </v-app>
</template>


<script>
import Toolbar from "./components/Toolbar";
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

let type;

export default {
  name: "app",
  components: {
    Toolbar
  },
  data() {
    return {
      page: 1,
      infiniteId: +new Date(),
      gif: [],
      search: ""
    };
  },
  methods: {
    infiniteHandler($state) {
      const url = "https://api.giphy.com/v1/gifs/";
      const key = "EUzSRkJo88fyanTPGTeEcuXOulKtgIwB";
      const limit = 12;
      let search = "";

      if (type == "trending") {
        axios
          .get(url + type + "?api_key=" + key + "&limit=" + limit + "&rating=G")
          .then(response => {
            this.gif = response.data.data;
            $state.loaded();
          });
        type = "search?";
      } else {
        axios
          .get(
            url +
              type +
              "q=" +
              this.search +
              "&api_key=" +
              key +
              "&limit=" +
              limit +
              "&rating=G"
          )
          .then(response => {
            this.gif = response.data.data;
          });
      }
    }
  },
  beforeMount() {
    type = "trending";
  },
  mounted() {
    this.infiniteHandler();
  }
};
</script>
