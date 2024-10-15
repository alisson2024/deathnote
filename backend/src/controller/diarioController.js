import * as db from '../repository/diarioRepository.js'
import { autenticar } from '../utils/jwt.js';

import { Router } from "express";

const endpoints = Router();


endpoints.get('/consultarDiario', autenticar, async (req, resp) => {
    try {
        let idusuario = req.user.id
        let diario = await db.consultarDiario(idusuario)
        resp.send(diario)
    }

    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})


endpoints.get('/consultarDiarioPorId/:id', autenticar   , async (req, resp) => {
    try {
        let id = req.params.id;
        let registros = await db.consultarDiarioPorId(id);
        resp.send(registros[0]);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.post('/inserirDiario', autenticar, async (req, resp) => {
    try {
        let diario = req.body
        diario.idUsuario = req.user.id

        let resposta = await db.inserirDiario(diario)

        resp.send({
            novoId: resposta
        })
    }

    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.put('/atualizarDiario/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id
        let diario = req.body

        let linhasAfetadas = await db.atualizarDiario(id, diario)

        if (linhasAfetadas >= 1) {
            resp.send({
                id:linhasAfetadas
            });
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' })
        }
    }

    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.delete('/deletarDiario/:id', autenticar, async (req, resp) => {
    try {       
        let id = req.params.id

        let  linhasAfetadas = await db.deletarDiario(id)

        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})







export default endpoints;