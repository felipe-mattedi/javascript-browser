
let caixas = document.getElementsByClassName('caixa-produto')
id=0

if (localStorage.getItem('bd') == null) {
  let dados = []
  localStorage.setItem('bd', JSON.stringify(dados))
}

const dados = JSON.parse(localStorage.getItem('bd'));


let qtd_carrinho = document.getElementById('qtd-carrinho')
const valor_carrinho = document.createElement('b')
valor_carrinho.innerText = dados.length
qtd_carrinho.appendChild(valor_carrinho)


for(let caixa of caixas){
  caixa.setAttribute('id', id)
  caixa.getElementsByClassName('btn-aumenta')[0].setAttribute('href',`javascript:aumenta(${id})`)
  caixa.getElementsByClassName('btn-diminui')[0].setAttribute('href',`javascript:diminui(${id})`) 
  if(localStorage.getItem(id) == null) localStorage.setItem(id, 0)
  caixa.getElementsByClassName('caixaqtde')[0].value = localStorage.getItem(id)
  let botao = caixa.getElementsByClassName('button')[0]
  let caixaqtde = caixa.getElementsByClassName('caixaqtde')[0]
  const id_interno = id

  caixaqtde.addEventListener('change', function(elemento){
  elemento.target.value > 99 ? elemento.target.value = 99 : elemento.target.value
  localStorage.setItem(id_interno, elemento.target.value)})

  botao.addEventListener('click', function(elemento){

    let quantidade = elemento.target.parentElement.getElementsByClassName('caixaqtde')[0].value
    let nome_produto = elemento.target.parentElement.parentElement.getElementsByClassName('nome-produto')[0].innerText
    let valor_vela = elemento.target.parentElement.parentElement.getElementsByClassName('valor')[0].innerText.substring(3).replace(',','.')

    let nome_imagem = elemento.target.parentElement.parentElement.getElementsByClassName('imagem-produto')[0].getElementsByTagName('img')[0].getAttribute('src')
    const dados = JSON.parse(localStorage.getItem('bd'));

   let existente = false
   for(let k in dados){
     if(dados[k].nome == nome_produto){
       if (quantidade > 0){
        dados[k].quantidade = quantidade
      }
       else{
        dados.splice(k,1)
       }

       existente = true
     }

   }

    if(!existente && quantidade>0){
      let novo_produto = {nome: nome_produto, quantidade: quantidade, imagem:nome_imagem, valor: valor_vela}
      dados.push(novo_produto)
    }

    localStorage.setItem(id_interno, quantidade)
    localStorage.setItem('bd', JSON.stringify(dados));
    location.reload();
  })
  
  id++
}

const aumenta = id_produto => {
 let caixa = document.getElementById(id_produto)
 let caixaqtd = caixa.getElementsByClassName('caixaqtde')
 caixaqtd[0].stepUp()
 localStorage.setItem(id_produto, caixaqtd[0].value)
 
}

const diminui = id_produto => {
  let caixa = document.getElementById(id_produto)
  let caixaqtd = caixa.getElementsByClassName('caixaqtde')
  caixaqtd[0].stepDown()
  localStorage.setItem(id_produto, caixaqtd[0].value)
 }


 let dados2 = JSON.parse(localStorage.getItem('bd'));
 let listagem_carrinho = document.getElementsByClassName('listagem-carrinho')[0]

 let valor_subtotal = 0
 
 for(let item of dados2){

  

   const linha_item = document.createElement('div')
   linha_item.setAttribute('class', 'entrada-carrinho')
   
   const caixa_produto = document.createElement('div')
   caixa_produto.setAttribute('class', 'caixa-produto')

   const imagem_produto = document.createElement('img')
   imagem_produto.setAttribute('src', item.imagem)

   const nome_produto = document.createElement('p')
   nome_produto.setAttribute('class', 'produto')
   nome_produto.innerText = item.nome

   caixa_produto.appendChild(imagem_produto)
   caixa_produto.appendChild(nome_produto)
  
  
   const quantidade_produto = document.createElement('p')
   quantidade_produto.setAttribute('class', 'quantidade')
   quantidade_produto.innerText = item.quantidade
   const total_produto = document.createElement('p')
   total_produto.setAttribute('class', 'total')
   let valor_total = parseInt(item.quantidade)*parseInt(item.valor)
   valor_subtotal = valor_subtotal + valor_total 
   total_produto.innerText = `R$ ${valor_total.toFixed(2)}`

  
   linha_item.appendChild(caixa_produto)
   linha_item.appendChild(quantidade_produto)
   linha_item.appendChild(total_produto)
   listagem_carrinho.appendChild(linha_item)
 }

cep_destino = 00000000
caixa_cep = document.getElementById('entrada-cep')
caixa_cep.addEventListener('change', function(elemento){
cep_destino = elemento.target.value
calculafrete()})

const subtotal = document.getElementsByClassName('valor-subtotal')[0]
subtotal.innerText  = `R$ ${valor_subtotal.toFixed(2)}`


function calculafrete(){

  var httpRequest;
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE 8 and older
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }

httpRequest.onreadystatechange = function(){
  let valor_frete = 0
  if(httpRequest.status === 200){
  let resposta_correios = httpRequest.responseXML
  valor_frete = resposta_correios.getElementsByTagName('Valor')[0].childNodes[0].nodeValue.replace(',','.')

  const frete = document.getElementsByClassName('valor-frete')[0]
  frete.innerText  = `R$ ${valor_frete}`
  let valor_compra_total = parseFloat(valor_subtotal) + parseFloat(valor_frete)
  const total = document.getElementsByClassName('valor-total')[0]
  total.innerText  = `R$ ${valor_compra_total.toFixed(2)}`

  const prazo = document.getElementsByClassName('caixa-cep')[0]
  const frase_inicio = document.createElement('span')
  const frase_fim = document.createElement('span')
  const dias = document.createElement('span')
  dias.setAttribute('id', 'prazo-entrega')
  frase_inicio.innerText = 'Entrega em '
  dias.innerText =  resposta_correios.getElementsByTagName('PrazoEntrega')[0].childNodes[0].nodeValue
  frase_fim.innerText = ' dias úteis'

  prazo.appendChild(frase_inicio)
  prazo.appendChild(dias)
  prazo.appendChild(frase_fim)
  }
}

httpRequest.open('GET',`  `, false);
httpRequest.send()
}