<template>
  <div class="login-container">
    <h2 class="login-title">Iniciar Sesión</h2>
    <form @submit.prevent="validarUsuario" class="login-form">
      <label for="email">Correo Electrónico</label>
      <input type="email" id="email" v-model="email" required/>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required/>
      <button type="submit" class="login-button">Validar</button>
    </form>
  </div>
</template>

<script>
// import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: "InicioSesion",
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async validarUsuario() {
      try {
        console.log('Datos de inicio de sesión:', {
        email: this.email,
        password: this.password,
      });
      // se llama la api con sus parametros a travez de fetch
      const response = await fetch(`http://localhost:7000/api/users/login?email=${this.email}&password=${this.password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //solicitud las credenciales 
        credentials: 'include',
      });

        if (response.ok){
          const responseData = await response.json();
          if (responseData.id){
            this.$router.push('/waiting-room');
          } else {
            this.mostrarMensajeError('Credenciales incorrectas. Por favor, revisa la información proporcionada e inténtalo nuevamente.');
          }
        } else{
          if (response.status === 401) {
            this.mostrarMensajeError('Credenciales incorrectas. Por favor, revisa la información proporcionada e inténtalo nuevamente.');
          } else{
            this.mostrarMensajeError(`Error en la solicitud. Código de estado: ${response.status}`);
          }
        }
    }catch (error){
        console.error('Error de red: ', error);
        this.mostrarMensajeError('Error de red. Por favor, inténtalo nuevamente.');
        //   if (error.response && error.response.status === 400) {
    // console.error('Error 400 - Solicitud incorrecta');
    // console.error('Detalles del error 400:', JSON.stringify(error.response.data, null, 2));
  }
  
    },
      mostrarMensajeError(mensaje) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #7fffd4;
  margin: 0; 
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form {
  width: 300px;
  text-align: center;
}

label {
  display: block;
  margin: 10px 0;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.login-button {
  background-color: #808080;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.login-button:hover {
  background-color: #696969;
}
</style>