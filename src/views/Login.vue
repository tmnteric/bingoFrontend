<template>
  <div>
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="validarUsuario">
      <label for="email">Correo Electrónico</label>
      <input type="email" id="email" v-model="email" required/>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required/>
      <button type="submit">Validar</button>
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
