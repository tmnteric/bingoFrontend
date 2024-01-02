<template>
  <div>
    <h2>El Bingo Gran Buda</h2>
    <div>
      <button @click="generarCartonBingo" :disabled="cartonGenerado">Generar Carton</button>
      <div v-if="cartonGenerado">
        <h3>Carton De Bingo</h3>
            <table>
            <thead>
                <tr>
                    <th>B</th>
                    <th>I</th>
                    <th>N</th>
                    <th>G</th>
                    <th>O</th>
                </tr>
            </thead>
           <tbody>
            <tr v-for="(column, letra) in carton" :key="letra">
              <td v-for="numero in column" :key="numero">
                <button @click="marcarNumero(numero)"
                :class="{ numeromarcado: numerosMarcados.includes(numero) }">{{ numero }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="boton-bingo">
        <button @click="verificarBotonBingo" :disabled="!cartonGenerado">BINGO</button>
    </div>
    <div class="balota">
        <h3>Balota Actual</h3>
        <div class="circulo">{{numeroBalota}}</div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: "BingoGame",
  data() {
    return {
      carton: null,
      cartonGenerado: false,
      mostrarCarton: false,
      numeroBalota: null,
      numerosMarcados: [],
      numerosBalotas: [],
      botonBingo: false,

    };
  },
  methods: {
    async generarCartonBingo() {
      try {
        this.numerosBalotas =[];

        const response = await fetch("http://localhost:7000/api/tarjeton/generar");
        const carton = await response.json();
        this.carton = carton;
        this.cartonGenerado = true;
        this.mostrarCarton = true;
        console.log("carton de bingo generado:", carton);

        // Iniciar el intervalo solo si no se ha generado todas las balotas
        if (this.numerosBalotas.length < 75) {
          this.intervaloBalotas = setInterval(this.mostrarBalota, 5000);
        }
      } catch (error) {
        console.error("error al generar el carton de bingo:", error);
      }
    },
    // funcion que permite marcar los numeros en el tarjeton 
    marcarNumero(numero) {
      if (!this.numerosMarcados.includes(numero) && this.numerosBalotas.includes(numero)) {
        this.numerosMarcados.push(numero);
        console.log("Numeros Marcados:", this.numerosMarcados);
        // this.verificarGanador();
      }
    },
    // funcion que genera una balota cada 5 segundos en un rango del 1 al 75 
    mostrarBalota(){

        let numero;
        do{
            numero =this.numeroBalota =Math.floor(Math.random()*75)+1;
        }while(this.numerosBalotas.includes(numero));

        if(!this.numerosBalotas.includes(numero)){
            this.numeroBalota = numero;
            
            this.numerosBalotas.push(numero);
            console.log("numeros de la balota: ",this.numerosBalotas)

            // Detener el intervalo cuando se generan todas las balotas
            if (this.numerosBalotas.length === 75) {
              clearInterval(this.intervaloBalotas);
            }
        }else{
            this.mostrarBalota();
        }
    },

    verificarBotonBingo(){
        this.botonBingo = true;
        this.verificarGanador();
    },

    verificarGanador(){
        if (this.botonBingo){
          if (this.botonBingo && this.verificarLineaHorizontal()){
            Swal.fire('Ganaste')
            console.log('ganador de linea horizontal');
            this.$router.push("/");
          }else if (this.botonBingo && this.verificarLineaVertical()){
            Swal.fire('Ganaste')
            console.log('ganador de linea vertical');
            this.$router.push("/");
          }else if(this.botonBingo && this.verificarLineaDiagonal()){
            Swal.fire('Ganaste')
            console.log('ganador linea en diagonal');
            this.$router.push('/')
          }else if(this.botonBingo && this.verificarEsquinas()){
            Swal.fire('Ganaste')
            console.log("ganador con 4 esquinas");
            this.$router.push("/")
          }else if(this.botonBingo && this.verficarCartonPleno()){
            Swal.fire("Ganaste")
            console.log("ganador con el carton lleno");
            this.$router.push('/')
          }
          else{
            Swal.fire("Has sido descalificado")
            console.log('jugador descalificado ');
            this.$router.push('/')
          }
        }
    },

    verificarLineaHorizontal(){
        console.log("verficacion de linea horizontal");
        if(!this.carton || typeof this.carton !== 'object'){
            console.log('el carton no es un objeto valido');
            return false;
        }

        for(const letra in this.carton){
            if(this.marcoNumeros(this.carton[letra])){
                console.log('linea horizontal');
                return true;
            }
        }

        console.log('no hay linea horizontal ');
        return false;
    },

    verificarLineaVertical(){
        if (!this.carton || typeof this.carton !== 'object'){
            return false;
        }

        // for( const letra in this.carton){
        //     const columna =this.carton[letra];
        //     if (this.marcoNumeros(columna)){
        //         console.log("linea vertical");
        //         return true;
        //     }
        // }

        for(let i = 0; i< this.carton.b.length; i++){
          const columna = [
            this.carton.b[i],
            this.carton.i[i],
            this.carton.n[i],
            this.carton.g[i],
            this.carton.o[i],
          ];
          if (this.marcoNumeros(columna)){
            console.log("lineas vertical");
            return true;
          }
        }
        console.log('no hay linea vertical');
        return false;
    },

    verificarLineaDiagonal(){
        if(!this.carton || typeof this.carton !== 'object'){
            return false;
        }
        const diagonales = [
            [this.carton.b[0], this.carton.i[1], this.carton.n[2], this.carton.g[3], this.carton.o[4]],
            [this.carton.b[4], this.carton.i[3], this.carton.n[2], this.carton.g[1], this.carton.o[0]]
        ];
        for (const diagonal of diagonales){
            if(this.marcoNumeros(diagonal)){
                console.log("linea diagonal");
                return true;
            }
        }
        console.log("no hay linea diagonal");
        return false;
    },

    verificarEsquinas(){
        if(!this.carton || typeof this.carton !== 'object'){
            return false;
        }
        const esquinas =[
            [this.carton.b[0], this.carton.o[4], this.carton.b[4], this.carton.o[0]]
        ];
        for (const esquina of esquinas){
            if(this.marcoNumeros(esquina)){
                console.log('esquinas');
                return true;
            }
        }
        console.log("no formo las 4 esquinas");
        return false;
    },

    verficarCartonPleno(){
        if(!this.carton || typeof this.carton !== 'object'){
            return false;
        }
        for(const letra in this.carton){
            if(!this.marcoNumeros(this.carton[letra])){
                return false;
            }
        }
        console.log("carton lleno");
        return true;
    },

    marcoNumeros(linea){
        if(!Array.isArray(linea)){
            // console.log('la linea no es un array valido');
            return false;
        }
        for (const numero of linea){
            if(!this.numerosMarcados.includes(numero)){
                return false;
            }
        }
        return true;
    }
  },
};
</script>

<style>
  table {
    border-collapse: collapse;
    width: 40%;
  }

  th,td {
    border:ipx solid #ddd;
    padding: box;
    text-align: center;
  }

  th{
background-color: #f2f2f2;
  }

  .numeromarcado {
    background-color: red;
    color: white;
  }

  .balota{
    float: right;
    margin-top: 20px;
    margin-right: 20px;
  }

  .circulo{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 20px;
    margin: 0 auto;
    padding-top: 10px;
  }

  .boton-bingo {
    margin-top: 20px;
  }

  .boton-bingo button {
    font-size: 18px;
    padding: 10px 20px;
  }

</style>