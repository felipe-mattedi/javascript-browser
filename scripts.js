let id_atividade = 0
let codigo_atividade = 'AT0'

const gera_id = () => {
  id_atividade++
  return id_atividade
}

const cria_atividade_nova = tarefa => {
  const id = gera_id()
  cria_atividade(tarefa, id)
}

const cria_atividade = (tarefa, id_atividade) => {
  codigo_atividade = `AT${id_atividade}`
  codigo_atividade_e = `AE${id_atividade}`
  const linha_tabela = document.createElement('tr')
  const coluna_tabela_id = document.createElement('td')
  const coluna_tabela_atividade = document.createElement('td')
  const coluna_tabela_remover = document.createElement('td')
  const coluna_tabela_executar = document.createElement('td')

  const atividade = document.createTextNode(tarefa)
  const codigo = document.createTextNode(codigo_atividade)
  const botao_remover = document.createElement('button')
  const botao_executar = document.createElement('button')

  botao_remover.setAttribute('id', codigo_atividade)
  botao_remover.innerText ='Remover'
  coluna_tabela_remover.appendChild(botao_remover)

  botao_executar.setAttribute('id', codigo_atividade_e)
  botao_executar.innerText ='Executar'
  coluna_tabela_executar.appendChild(botao_executar)

  coluna_tabela_id.appendChild(codigo)
  coluna_tabela_atividade.appendChild(atividade)
  linha_tabela.appendChild(coluna_tabela_id)
  linha_tabela.appendChild(coluna_tabela_atividade)
  linha_tabela.appendChild(coluna_tabela_remover)
  linha_tabela.appendChild(coluna_tabela_executar)

  let tbody = document.getElementById('corpo_tabela')
  tbody.appendChild(linha_tabela)

  let btnRemover = document.getElementById(codigo_atividade)
  btnRemover.addEventListener('click', function(){remover(btnRemover.getAttribute('id'))})

  let btnExecutar = document.getElementById(codigo_atividade_e)
  btnExecutar.addEventListener('click', function(){executar(btnExecutar.getAttribute('id'))})

}

const remover = codigo_atividade => {
  let atividade_removida = document.getElementById(codigo_atividade)
  atividade_removida.parentElement.parentElement.remove()
  txtIncluir.focus()
}

const executar = codigo_atividade => {

  let atividade_executada = document.getElementById(codigo_atividade).parentElement.parentElement
  let nome_atividade = atividade_executada.childNodes[1].innerText
  let codigo_at = atividade_executada.childNodes[0].innerText
  atividade_executada.childNodes[2].remove()
  atividade_executada.childNodes[2].remove()
  const executada = document.createTextNode("Atividade já executada!")
  const coluna_tabela_executada = document.createElement('td')
  coluna_tabela_executada.setAttribute('colspan', '2')
  coluna_tabela_executada.appendChild(executada)
  atividade_executada.appendChild(coluna_tabela_executada)
  armazena_atividade(nome_atividade, codigo_at)

}

const armazena_atividade = (tarefa, codigo_at) => {
  
  const linha_tabela = document.createElement('tr')
  const coluna_tabela_id = document.createElement('td')
  const coluna_tabela_atividade = document.createElement('td')
  const coluna_tabela_desfazer = document.createElement('td')

  const botao_desfazer = document.createElement('button')
  botao_desfazer.setAttribute('id', codigo_at)
  botao_desfazer.innerText ='Desfazer'
  coluna_tabela_desfazer.appendChild(botao_desfazer)

  const atividade = document.createTextNode(tarefa)
  const codigo = document.createTextNode(codigo_at)

  coluna_tabela_id.appendChild(codigo)
  coluna_tabela_atividade.appendChild(atividade)
  linha_tabela.appendChild(coluna_tabela_id)
  linha_tabela.appendChild(coluna_tabela_atividade)
  linha_tabela.appendChild(coluna_tabela_desfazer)

  let tbody = document.getElementById('corpo_tabela_executadas')
  tbody.appendChild(linha_tabela)
  txtIncluir.focus()

  botao_desfazer.addEventListener('click', function(){desfaz_atividade(tarefa,codigo_at)})

}

const desfaz_atividade = (tarefa,codigo_at) =>{
  cria_atividade(tarefa,codigo_at)
  let atividade_removida = document.querySelector("#corpo_tabela_executadas")
  atividade_removida.parentElement.parentElement.remove()
  txtIncluir.focus()

}

cria_atividade_nova('Paseear com o cachorro')
cria_atividade_nova('Fazer compras')
cria_atividade_nova('Sambar')
cria_atividade_nova('Comprar passagem')
cria_atividade_nova('Trabalhar')

const addbyclick = evt => {
  evt.preventDefault()
  cria_atividade_nova(txtIncluir.value)
  txtIncluir.value = ''
  txtIncluir.focus()
}

const addbyenter = evt => {
  if(evt.keyCode === 13){
    evt.preventDefault()
    cria_atividade_nova(txtIncluir.value)
    txtIncluir.value = ''
    txtIncluir.focus()
  }
}


const txtIncluir = document.querySelector('#caixatarefa')
const btnIncluir = document.querySelector('#incluir')
txtIncluir.focus()
btnIncluir.addEventListener('click', addbyclick)
txtIncluir.addEventListener('keypress', addbyenter)



