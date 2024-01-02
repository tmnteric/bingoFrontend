<template>
  <div class="register-container">
    <h2 class = "register-tittle">Registro de Usuario</h2>
    <form @submit.prevent="guardarUsuario" class="register-form">
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre" v-model="nombre" required />
      <label for="email">Correo Electronico</label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: "RegisterUser",
  data() {
    return {
      nombre: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async guardarUsuario() {
      try {
        // se utiliza fetch para la llamada de la api 
        const response = await fetch("http://localhost:7000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.nombre,
            email: this.email,
            password: this.password,
          }),
        });
        if (response.ok) {
          this.$router.push("/");
        } else {
          Swal.fire("Por favor valide que todos los campos esten llenos")
          console.error("Error al guardar usuario");
        }
      } catch (error) {
        console.error("Error de red: ", error);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #7fffd4;
  margin: 0; 
}

.register-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.register-form {
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

.register-button {
  background-color: #808080;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.register-button:hover {
  background-color: #696969;
}
</style>
