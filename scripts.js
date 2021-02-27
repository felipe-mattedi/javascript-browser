let id_atividade = 1
let codigo_atividade = 'AT0'
let guarda_botoes = []

function cria_atividade(tarefa){
  codigo_atividade = `AT${id_atividade}`
  const linha_tabela = document.createElement('tr')
  const coluna_tabela_id = document.createElement('td')
  const coluna_tabela_atividade = document.createElement('td')
  const coluna_tabela_remover = document.createElement('td')
  const atividade = document.createTextNode(tarefa)
  const codigo = document.createTextNode(codigo_atividade)
  const botao_remover = document.createElement('button')
  botao_remover.setAttribute('id', codigo_atividade)
  botao_remover.innerText ='Remover'
  coluna_tabela_remover.appendChild(botao_remover)
  coluna_tabela_id.appendChild(codigo)
  coluna_tabela_atividade.appendChild(atividade)
  linha_tabela.appendChild(coluna_tabela_id)
  linha_tabela.appendChild(coluna_tabela_atividade)
  linha_tabela.appendChild(coluna_tabela_remover)
  let tbody = document.getElementById('corpo_tabela')
  tbody.appendChild(linha_tabela)

  let btnRemover = document.getElementById(codigo_atividade)
  btnRemover.addEventListener('click', function(){remover(btnRemover.getAttribute('id'))})
  guarda_botoes.push(btnRemover)

  id_atividade++
}

function remover(codigo_atividade){
  let atividade_removida = document.getElementById(codigo_atividade)
  atividade_removida.parentElement.parentElement.remove()
}

cria_atividade('Paseear com o cachorro')
cria_atividade('Fazer compras')
cria_atividade('Sambar')
cria_atividade('Comprar passagem')
cria_atividade('Trabalhar')


const txtIncluir = document.querySelector('#caixatarefa')
const btnIncluir = document.querySelector('#incluir')
btnIncluir.addEventListener('click', function(){cria_atividade(txtIncluir.value)})
btnIncluir.addEventListener('click', function(){txtIncluir.value = ''})
