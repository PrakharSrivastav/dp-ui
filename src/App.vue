<template>
    <v-app>
        <template v-if="loggedIn">
            <Shell/>
        </template>
        <template v-else><Login/></template>
    </v-app>
</template>
<script>
import Shell from "./components/Shell";
import Login from "./components/Login"
export default {
  name: "App",
  components: {
    Shell,Login
  },
  data() {
    return {
        loggedIn:false
    };
  }
};
</script>
<style scoped>
</style>
