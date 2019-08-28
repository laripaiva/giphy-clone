<template>
  <v-app>
    <Toolbar />
    <v-content>
      <SearchButton />
      <!-- <Response /> -->
      <div id="app2">
        {{data[0]["type"]}}
        {{data[0]["id"]}}
        {{data[0]["slug"]}}
        {{data[0]["url"]}}
        {{data[0]}}
      </div>
    </v-content>
  </v-app>
</template>


<script>
import Toolbar from "./components/Toolbar";
import SearchButton from "./components/SearchButton";
import Response from "./components/Response";
// import axios from "./services/axios";
import axios from "axios";

export default {
  name: "app",
  components: {
    Toolbar,
    SearchButton,
    Response
  },
  data() {
    return {
      data: []
    };
  },
  mounted() {
    axios
      .get(
        "https://api.giphy.com/v1/gifs/trending?api_key=EUzSRkJo88fyanTPGTeEcuXOulKtgIwB&limit=1&rating=G"
      )
      .then(response => (this.data = response.data.data));
  }
};
</script>
