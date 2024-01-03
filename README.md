# Proyecto de Juego de Bingo para SofkaU (Frontend)

Este proyecto se centra en el desarrollo del frontend para un juego de bingo solictado por SofkaU. La tecnología utilizada para la implementación es Vue.js. El juego consta de varias vistas, la vista de inicio 'MainPage', que ofrece opciones para registrar un usuario o iniciar sesión.

- **Registro de Usuario ('RegisterUser'):**
  - La vista de registro solicita información como nombre, correo y contraseña.

- **Inicio de Sesión ('Login'):**
  - En la vista de inicio de sesión, se pide el correo y la contraseña para autenticar al usuario.

Después de la autenticación, los usuarios son redirigidos a una vista de espera 'WaitingRoom', donde, si solo hay un jugador, se espera un minuto antes de regresar a la vista de inicio. Si se conectan más jugadores, son redirigidos a la vista del juego 'BingoGame'.

- **Juego de Bingo ('BingoGame'):**
  - Aquí, los jugadores pueden generar su cartón de bingo mediante un botón específico. Además, hay un botón 'BINGO' que permite declarar la victoria si se cumplen los requisitos.

## Enlaces Adicionales

- **Backend del Proyecto:**
  - [https://github.com/tmnteric/bingoBackend.git](enlace_al_repositorio_del_backend)

- **Video Explicativo en YouTube::**
  - [https://youtu.be/wgOXN_txL-U](https://www.youtube.com/watch?v=wgOXN_txL-U&ab_channel=ericparra)
