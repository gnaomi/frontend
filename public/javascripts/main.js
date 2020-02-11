const app = document.getElementById('ranking')
const ranking = document.createElement('div')
ranking.setAttribute('class', 'ranking-listagem row')
app.appendChild(ranking)

var request = new XMLHttpRequest()
request.open('GET', '/fazenda.json', true)
request.onload = function() {
    var data = JSON.parse(this.response)
     

    if (request.status >= 200 && request.status < 400) {       
        
        data.data.sort(function(a,b) {
            return (a.positive < b.positive) ? 1 : (b.positive < a.positive) ? -1 : 0
        })

        data.data.forEach(participante => {
            const card = document.createElement('div')
            card.setAttribute('class', 'ranking-card col-12')
            ranking.appendChild(card)

            const foto = document.createElement('img')
            foto.setAttribute('class', 'card-foto float-left')
            foto.setAttribute('src', participante.picture)
            foto.setAttribute('alt', `${participante.name} - ${participante.description}`)  
            card.appendChild(foto)

            let gostei = parseInt(participante.positive)
            let naoGostei = parseInt(participante.negative)
            let total = gostei + naoGostei

            const placar = document.createElement('div')
            placar.setAttribute('class', 'card-placar row')
            card.appendChild(placar)

            const gosteiTexto = document.createElement('div')
            gosteiTexto.setAttribute('class', 'card-titulo_gostei col-4')           
            gosteiTexto.textContent = 'Gostam'  
            placar.appendChild(gosteiTexto) 

            const naoGosteiTexto = document.createElement('div')
            naoGosteiTexto.setAttribute('class', 'card-titulo_naogostei col-6')
            naoGosteiTexto.textContent = 'Não gostam' 
            placar.appendChild(naoGosteiTexto)

            const gosteiCard = document.createElement('div')
            gosteiCard.setAttribute('class', 'card-gostei col-4')           
            gosteiCard.textContent = parseFloat(((gostei*100)/total).toFixed(2)) || 0    
            placar.appendChild(gosteiCard)
            
            const naoGosteiCard = document.createElement('div')
            naoGosteiCard.setAttribute('class', 'card-naogostei col-6')
            naoGosteiCard.textContent = parseFloat(((naoGostei*100)/total).toFixed(2)) || 0   
            placar.appendChild(naoGosteiCard)

            const nome = document.createElement('h2')
            nome.setAttribute('class','card-titulo') 
            nome.textContent = `${participante.name}`                     
            card.appendChild(nome)

            const descricao = document.createElement('p')
            descricao.setAttribute('class','card-descricao')
            descricao.textContent = `${participante.description}`  
            card.appendChild(descricao)            
            
        })
        
    } else {
      console.log('Não foi possível carregar os dados dos participantes.')
    }
}

request.send()

