import diarioController from './controller/diarioController.js'
import usuarioController from './controller/usuarioController.js'

export default function adicionarRotas(servidor) {
    servidor.use(diarioController);
    servidor.use(usuarioController);
}
