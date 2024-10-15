import { useEffect, useState } from 'react'
import moment from 'moment';
import './index.scss'

import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';



export default function Cadastrar() {
    const [token, setToken] = useState(null);

    const [conteudo, setConteudo] = useState('');
    const [data, setData] = useState('');
  
    const navigate = useNavigate()

    const { id } = useParams();  

    async function salvar() {
        let paramCorpo = {    
            "conteudo": conteudo,
            "data": data
        }

        if (id == null) {
            // CRIAR
            const url = `http://localhost:5011/inserirDiario?x-access-token=${token}`;
            let resp = await axios.post(url, paramCorpo);
            alert('Pessoa adicionada no diario.     Id: ' + resp.data.novoId);
        } 
        else {
            // ALTERAR
            const url = `http://localhost:5011/atualizarDiario/${id}?x-access-token=${token}`;
            let resp = await axios.put(url, paramCorpo);
            alert('Pessoa alterada no diario.' );
        }
    }

    async function consultar() {
        if (id == null) {
            const url = `http://localhost:5011/consultarDiario/${id}?x-access-token=${token}`;
            let resp  = await axios.get(url);
            let dados = resp.data;

            let data = moment(dados.data).format('YYYY-MM-DD')
            console.log(data)

            setConteudo(dados.conteudo)
            setData(data)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('USUARIO')
        setToken(token)

        if (token == 'null') {
            navigate('/')
        }

        consultar(token);
    },[])

    return (
        <div className='pagina-cadastrar'>
            <button><Link to={'/consultar'}>Voltar</Link></button>
            <h1>{id ? 'EDITAR' : 'CADASTRAR'}</h1>


            <div className='form'>
                <div>
                    <label>Conteudo:</label>
                    <input
                        type='text'
                        value={conteudo}
                        onChange={e => setConteudo(e.target.value)} />
                </div>
                <div>
                    <label>Data:</label>
                    <input
                        type='date'
                        value={data}
                        onChange={e => setData(e.target.value)} />
                </div>
            </div>
            <button onClick={salvar}> SALVAR </button>

        </div>
    )
}
