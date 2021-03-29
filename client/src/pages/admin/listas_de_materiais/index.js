import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function ListasMateriais() {
  const classes = useStyles();
  const [nome_rcpt, setNome] = useState('');
  const [cidade_rcpt, setCidade] = useState('');
  const [uf_rcpt, setUf] = useState('');
  const [email_rcpt, setEmail] = useState('');
  const [senha_rcpt, setSenha] = useState('');
  const [cpf_rcpt, setCpf] = useState('');
  const [nome_inst, setNomeInst] = useState('');
  const [lista_materiais, setListaMateriais] = useState([]);

  const { idReceptor } = useParams();

  const [rows, setRows] = useState([]);
  const [receptorConectado, setReceptorConectado] = useState({});

  useEffect(() => {
    async function findAndGenerateRows(){
      setRows([]);
      let auxRow = [];
      const {data: receptor }= await api.get(`/api/receptor.details/${idReceptor}`);
      setReceptorConectado(receptor);
      if(receptor.lista_materiais.length !== 0){
        receptor.lista_materiais.map(item => {
          if(item.status_listaM == true){//lista está ativa
            auxRow.push(item);
          }
        })
        setRows(auxRow);
      }
    }
    findAndGenerateRows();
  }, [])


  async function handleSubmit(){

    const data = { 
      nome_rcpt, 
      cidade_rcpt,
      uf_rcpt,
      email_rcpt,
      senha_rcpt,
      cpf_rcpt,
      nome_inst,
      lista_materiais
    }
    if(nome_rcpt !== '' && cidade_rcpt !== '' && uf_rcpt !== '' && email_rcpt !== '' && senha_rcpt !== '' && cpf_rcpt !== '' && nome_inst !== '')
    {
      const response = await api.post('/api/receptor', data);

      if(response.status === 200){
        window.location.href='/login'
      }
      else{
        alert('Erro ao cadastrar o usuário!')
      }
    }
    else{
      alert('Por favor, preencha todos os dados!');
    }
    
  }


  

  //findAndGenerateRows();
  return (
    <div>
      <h2>Listas de materiais disponíveis do {receptorConectado.nome_rcpt}</h2>
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={12}>
        <TableContainer >
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell align="right">Valor Total</TableCell>
                <TableCell align="right">Valor Atual</TableCell>
                <TableCell align="right">Data Criação</TableCell>
                <TableCell align="right">Qtde Total Material</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.descricao_listaM}
                  </TableCell>
                  <TableCell align="right">
                    {row.valorTotal_listaM}
                  </TableCell>
                  <TableCell align="right">{row.valorAtual_listaM}</TableCell>
                  <TableCell align="right">{row.dataCriacao_listaM}</TableCell>
                  <TableCell align="right">{row.material.reduce((acc,item)=>{
                    acc += item.qtd_material
                    return acc;
                  }, 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
