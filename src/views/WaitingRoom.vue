<template>
  <div>
    <h2>LOBBY</h2>
    <p>
      Bienvenido a la sala de espera. Esperando a que se conecten más
      usuarios...
    </p>
  </div>
</template>

<script>
export default {
  name: "WaitingRoom",
  data() {
    return {
      temporizador: null,
      tiempoEspera: 30000, // 30 segundos
      tiempoMax: 60000, // 60 segundos
      jugadoresConectados: 0,
      conexionesPendientes: [],
      tiempoInicioEspera: null,
      redirigirProgramada: null,
    };
  },
  mounted() {
    // Consulta al backend cada 2 segundos para validar los jugadores conectados
    this.temporizador = setInterval(this.verificarJugadoresConectados,2000);
  },
  // antes de eliminar el objeto se limpian los intervalos y temporizadores
  beforeUnmount() {
    clearInterval(this.temporizador);
    clearTimeout(this.redirigirProgramada);
  },
  methods: {
    async verificarJugadoresConectados() {
      try {
        const response = await fetch("http://localhost:7000/api/players/count");
        const data = await response.json();
        const nuevosJugadores = data.contador - this.jugadoresConectados;

        console.log("Nuevos jugadores conectados:", nuevosJugadores);

        // Verificar si hay nuevos jugadores
        if (nuevosJugadores > 0) {
          console.log("Nuevo jugador conectado:", nuevosJugadores);
          this.conexionesPendientes.push({});
        }

        this.jugadoresConectados = data.contador;
        console.log("Cantidad de jugadores conectados:",this.jugadoresConectados);

        // Si es el primer jugador, inicia el tiempo de espera y programa la redirección
        if (this.jugadoresConectados >= 2 && !this.tiempoInicioEspera) {
          console.log("Primer jugador. Iniciando espera...");
          this.tiempoInicioEspera = Date.now();

          // Programar redirección después de 30 segundos
          this.redirigirProgramada = setTimeout(() => {
            this.redirigirABingoGame();
          }, this.tiempoEspera);
        }

        // Si ha pasado un minuto y solo hay un jugador, redirigir a la vista de inicio
        if (this.jugadoresConectados === 1 && !this.tiempoInicioEspera 
        //   Date.now() - this.tiempoInicioEspera > this.tiempoMax
        ) {
          console.log("Solo un jugador y tiempo máximo alcanzado. Redirigiendo a la vista de inicio.");
          this.tiempoInicioEspera = Date.now();
          this.redirigirProgramada = setTimeout(()=>{
              this.redirigirAInicio();
          }, this.tiempoMax);

        }
      } catch (error) {
        console.error(
          "Error al obtener la cantidad de jugadores conectados: ",
          error
        );
      }
    },
    //funcion para redirigir a la vista bingo-game
    redirigirABingoGame() {
      console.log("Redirigiendo al bingo");
      this.$router.push("/bingo-game");
      // Limpiamos las conexiones pendientes
      this.conexionesPendientes = [];
    },
    //funcion para redirigir a la vista de inicio
    redirigirAInicio() {
      console.log("Redirigiendo a la vista de inicio.");
      this.$router.push("/");
      // Limpiamos las conexiones pendientes
      this.conexionesPendientes = [];
    },
  },
};
</script>
