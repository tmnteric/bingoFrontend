<template>
  <div>
    <h1>Bienvenido</h1>
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