<template>
  <div>
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="guardarUsuario">
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre" v-model="nombre" required/>
      <label for="email">Correo Electronico</label>
      <input type="email" id="email" v-model="email" required/>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required/>

      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
export default{
    name: 'RegisterUser',
    data(){
        return{
            nombre: '',
            email: '',
            password: '',
        };
    },
    methods:{
        async guardarUsuario(){
            try{
                const response = await fetch('http://localhost:7000/api/users',{
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        name: this.nombre,
                        email: this.email,
                        password: this.password,
                    }),
                });
                if(response.ok){
                    this.$router.push('/');
                }else{
                    console.error('Error al guardar usuario')
                }
            }catch(error){
                console.error('Error de red: ', error)
            }
        },
    },
};
</script>
