import con from "./connection.js";

export async function inserirUsuario(pessoa) {
    const comando = `
        insert into tb_usuario (nm_usuario, ds_senha) 
					        values (?, ?)
    `;
    
    let resposta = await con.query(comando, [pessoa.nome, pessoa.senha])
    let info = resposta[0];
    
    return info.insertId;
}

export async function validarUsuario(pessoa) {
    const comando = `
        select 
            id_usuario id,
            nm_usuario nome
        from tb_usuario 
        where 
            nm_usuario = ?
            and ds_senha = ?
    `;
    
    let registros = await con.query(comando, [pessoa.nome, pessoa.senha])
    return registros[0][0];
}

export async function consultarUsuario(id) {


    const comando = `
        select 
            id_usuario id,
            nm_usuario nome
        from tb_usuario 
        where 
        id_usuario = ?       
        `

    let resposta = await con.query(comando, [id])

    let info = resposta[0]

    return info;
    
}