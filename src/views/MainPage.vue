<template>
  <div>
    <h1>Bienvenido</h1>
    <button @click="redirectToRegister">Registro de Usuario</button>
    <button @click="handleInicioSesion">Inicio de Sesión</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToRegister() {
      this.$router.push('/register')
      console.log('Botón de Registro clickeado');
    },
    handleInicioSesion() {
      // Lógica para manejar el inicio de sesión
      console.log('Botón de Inicio de Sesión clickeado');
    },
  },
};

</script>