import con from './connection.js'


export async function consultarDiario(id_usuario){
    const comando= `
    SELECT  id              id,
            dt_conteudo	    data,
            ds_conteudo	    conteudo
            FROM tb_diario
            WHERE id_usuario = ?   
    `;

    let resposta = await con.query(comando, [id_usuario]);
    let registros = resposta[0];

    return registros;
}

export async function consultarDiarioPorId(id) {
    const comando = `
        select id,
              dt_conteudo,
              ds_conteudo
          from tb_diario
          where id = ?
    `;

    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];

    return registros;
    
}

export async function inserirDiario(diario) {
    const comando = `
    INSERT INTO tb_diario(dt_conteudo,ds_conteudo,id_usuario)
    VALUES(?,?,?)
    `;

    let resposta = await con.query (comando, [diario.data, diario.conteudo, diario.idUsuario])
    let  info = resposta[0];

    return info.insertId;
}

export async function  atualizarDiario(id, diario){

    const comando = ` UPDATE tb_diario 
    SET dt_conteudo = ?,
        ds_conteudo = ?
        WHERE id = ?;
    `
    
    let resposta = await con.query (comando, [diario.data, diario.conteudo, id])
    let  info = resposta[0];

    return info.affectedRows;
}


export async function deletarDiario(id) {

    const comando = `
    DELETE  FROM tb_diario 
    WHERE id = ?    
    `
    let resposta = await con.query (comando, [id]);
    let  info = resposta[0];

    return info.affectedRows;

}