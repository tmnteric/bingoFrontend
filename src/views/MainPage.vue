<template>
  <div class="welcome-container">
    <h1>Bienvenido al juego</h1>
    <button @click="redirectToRegister">Registro de Usuario</button>
    <button @click="redirectToLogin">Inicio de Sesión</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToRegister() {
      this.$router.push('/register')
      console.log('Botón de Registro clickeado');
    },
    redirectToLogin() {
      this.$router.push('/login')
      console.log('Botón de Inicio de Sesión clickeado');
    },
  },
};

</script>

<style scoped>
.welcome-container {
  /* background-image: url('./src/components/bingo.jpg;'); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #7fffd4;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

button:first-child {
  margin-right: 10px;
}

</style>