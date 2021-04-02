import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import api from '../../services/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function CadastroReceptor() {
  const classes = useStyles();
  const [nome_rcpt, setNome] = useState('');
  const [cidade_rcpt, setCidade] = useState('');
  const [uf_rcpt, setUf] = useState('');
  const [email_rcpt, setEmail] = useState('');
  const [senha_rcpt, setSenha] = useState('');
  const [cpf_rcpt, setCpf] = useState('');
  const [nome_inst, setNomeInst] = useState('');
  const [lista_materiais, setListaMateriais] = useState([]);

  async function handleSubmit() {

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
    if (nome_rcpt !== '' && cidade_rcpt !== '' && uf_rcpt !== '' && email_rcpt !== '' && senha_rcpt !== '' && cpf_rcpt !== '' && nome_inst !== '') {
      const response = await api.post('/api/receptor', data);

      if (response.status === 200) {
        window.location.href = '/'
      }
      else {
        alert('Erro ao cadastrar o usuário!')
      }
    }
    else {
      alert('Por favor, preencha todos os dados!');
    }

  }

  return (
    <div>
      <h2>Cadastro</h2>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="nome_rcpt"
            name="nome_rcpt"
            label="Nome completo"
            fullWidth
            autoComplete="nome_rcpt"
            value={nome_rcpt}
            onChange={e => setNome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="labelCidade">Cidade</InputLabel>
            <Select
              labelId="labelCidade"
              id="cidade_rcpt"
              value={cidade_rcpt}
              onChange={e => setCidade(e.target.value)}
            >
              <MenuItem value={""}> </MenuItem>
              <MenuItem value={"Presidente Prudente"}>Presidente Prudente</MenuItem>
              <MenuItem value={"Santos"}>Santos</MenuItem>
              <MenuItem value={"Guaruja"}>Guaruja</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="labelUf">UF</InputLabel>
            <Select
              labelId="labelUf"
              id="uf_rcpt"
              value={uf_rcpt}
              onChange={e => setUf(e.target.value)}
            >
              <MenuItem value={""}> </MenuItem>
              <MenuItem value={"SP"}>SP</MenuItem>
              <MenuItem value={"BH"}>BH</MenuItem>
              <MenuItem value={"RJ"}>RJ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="email_rcpt"
            name="email_rcpt"
            label="Email"
            fullWidth
            autoComplete="email_rcpt"
            value={email_rcpt}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="password"
            required
            id="senha_rcpt"
            name="senha_rcpt"
            label="Senha"
            fullWidth
            autoComplete="senha_rcpt"
            value={senha_rcpt}
            onChange={e => setSenha(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="cpf_rcpt"
            name="cpf_rcpt"
            label="CPF"
            fullWidth
            autoComplete="cpf_rcpt"
            value={cpf_rcpt}
            onChange={e => setCpf(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="nome_inst"
            name="nome_inst"
            label="Nome da instituição"
            fullWidth
            autoComplete="nome_inst"
            value={nome_inst}
            onChange={e => setNomeInst(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Primary
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
