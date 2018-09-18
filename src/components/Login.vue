<template>
    <v-content>
      <v-container fluid >
        <h2 class="text-xs-center my-5">Digital Playground</h2>
        <v-layout  align-center justify-center>
          <v-flex xs12 sm8 md4 align-center>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="tenant" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
<script>
export default {
  name: "Login",
  methods : {
      login(){
          alert(1)
      }
  }
};
</script>
