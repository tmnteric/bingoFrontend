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
                <td v-for="numero in column" :key="numero">{{numero}}</td>
                </tr>
            </tbody>
            </table>
      </div>
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
    };
  },
//   mounted() {
//     this.generarCartonBingo();
//   },
  methods: {
    async generarCartonBingo() {
      try {
        const response = await fetch("http://localhost:7000/api/tarjeton/generar");
        const carton = await response.json();
        this.carton = carton;
        this.cartonGenerado = true;
        this.mostrarCarton = true;
        console.log("carton de bingo generado:", carton);
      } catch (error) {
        console.error("error al generar el carton de bingo:", error);
      }
    },
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

</style>