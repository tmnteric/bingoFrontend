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
    <div class="balota">
        <h3>Balota Actual</h3>
        <div class="circulo">{{numeroBalota}}</div>
    </div>
  </div>
</template>

<script>
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

        setInterval(this.mostrarBalota, 5000); 
      } catch (error) {
        console.error("error al generar el carton de bingo:", error);
      }
    },
    // funcion que permite marcar los numeros en el tarjeton 
    marcarNumero(numero) {
      if (!this.numerosMarcados.includes(numero)) {
        this.numerosMarcados.push(numero);
        console.log("Numeros Marcados:", this.numerosMarcados);
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

        }else{
            this.mostrarBalota();
        }
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

</style>