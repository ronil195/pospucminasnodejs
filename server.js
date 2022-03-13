const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ENDPOINT = '/api'


const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log de execucao
app.use((req, res, next) => {
    console.log(`Log: ${req.hostname} - ${req.url} : ${req.params} : ${req.body}`)
    next();
})

// buscar todos os produtos
app.get(ENDPOINT + "/produtos", (req, res, next) => {
    res.status(200).json(lista_produtos);
})

// buscar detalhes de um determinado produto
app.get(ENDPOINT + "/produtos/:id", (req, res, next) => {

    let idx = lista_produtos.produtos.findIndex( (elem) =>  elem.id == parseInt(req.params.id));
    if (idx != -1) {
        res.status(200).json(lista_produtos.produtos[idx]);
    } else {
        res.status(404).json({message: "Produto nao encontrado"})
    }

})

// incluir um novo produto
app.post(ENDPOINT + "/produtos", (req, res) => {
    let idx = lista_produtos.produtos.findIndex( (elem) => elem.id == req.body.id);
    if (idx != -1) {
        res.status(404).json({message: "Produto já existe na lista"});
    }
    else {
        lista_produtos.produtos.push(req.body);
        res.status(200).json({mensagem: "Produto incluído com sucesso"});
    }
})

// alterar um registro
app.put(ENDPOINT + "/produtos/:id", (req, res) => {

    let idx = lista_produtos.produtos.findIndex( (elem) =>  elem.id == parseInt(req.params.id));
    if (idx != -1) {
        
        lista_produtos.produtos[idx].descricao = req.body.descricao;
        lista_produtos.produtos[idx].valor = req.body.valor;
        lista_produtos.produtos[idx].marca = req.body.marca;

        res.status(200).json({mensagem: "Produto alterado com sucesso"});

    } else {
        res.status(404).json({message: "Produto nao encontrado"})
    }

})

// apagar um registro
app.delete(ENDPOINT + "/produtos/:id", (req, res) => {

    let idx = lista_produtos.produtos.findIndex( (elem) =>  elem.id == parseInt(req.params.id));
    if (idx != -1) {
        lista_produtos.produtos.splice(idx);
        res.status(200).json({mensagem: "Produto removido com sucesso"});

    } else {
        res.status(404).json({message: "Produto nao encontrado"})
    }

})


let porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log ("Servidor no ar");
})

