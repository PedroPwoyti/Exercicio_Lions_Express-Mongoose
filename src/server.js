import express from "express";
import dotenv from "dotenv";
import agendamentos from "./models/agendamentos.js";
import conectarBanco from "./database.js";
import Agendamento from "./models/agendamentos.js";

dotenv.config();
conectarBanco();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("API Pet shop está no ar")
});

app.post("/agendamentos", async (req, res)=>{
    
    try{
        const novoAgendamento = await Agendamento.create(req.body);

        if(novoAgendamento.especie == "cao"){

            if(novoAgendamento.servico == "banho"){
                novoAgendamento.valor = 50;
                await novoAgendamento.save();
            }else if(novoAgendamento.servico == "tosa"){
                novoAgendamento.valor = 60;
                await novoAgendamento.save();
            }else if(novoAgendamento.servico == "banho e tosa"){
                novoAgendamento.valor = 100;
                await novoAgendamento.save();
            }

        } else if(novoAgendamento.especie == "gato"){

            if(novoAgendamento.servico == "banho"){
                novoAgendamento.valor = 60;
                await novoAgendamento.save();
            }else if(novoAgendamento.servico == "tosa"){
                novoAgendamento.valor = 70;
                await novoAgendamento.save();
            }else if(novoAgendamento.servico == "banho e tosa"){
                novoAgendamento.valor = 110;
                await novoAgendamento.save();
            }

        }else if(novoAgendamento.especie == "outro"){

            if(novoAgendamento.servico == "banho"){
                novoAgendamento.valor = 40;
                await novoAgendamento.save();
            }else if(novoAgendamento.servico == "tosa"){
                novoAgendamento.valor = 50;
                await novoAgendamento.save();
            }else if(novoAgendamento.servico == "banho e tosa"){
                novoAgendamento.valor = 80;
                await novoAgendamento.save();
            }

        }

        return res.status(201).json({
            message: "Agendamento criado com sucesso", agendamento: novoAgendamento,
        })

    }catch(error){

        return res.status(400).json({
            message: "Erro ao criar agendamento", error: error.message,
        })
    }

})

app.get(("/agendamento/busca"), async (req, res)=>{

    try{
        const nome = req.query.nome;

        const agendamentos = await Agendamento.find({nomePet: {$regex: nome, $options: "i"}}) //regex aceita minuscula e msiscula, e options aceita pedaços do nome
        res.status(200).json({message: "Busca efetuado com sucesso", agendamentos})
    }catch(error){
        res.status(400).json({message: "erro", error: error.message})
    }
})

app.get("/agendamentos", async (req, res)=>{

    try{
        const agendamentos = await Agendamento.find();
        res.status(200).json({message: "Lista de agendamentos: ", agendamentos});

    }catch(error){
        res.status(404).json({message: "Erro ao listar agendamentos", error: error.message })

    }

});

app.patch("/agendamentos/:id", async (req, res)=>{

    try{
        const {id} = req.params;
        const {status} = req.body;

        const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(id, {status: status}, {
            runValidators: true,
            new: true,
        });

        if(!agendamentoAtualizado){
            return res.status(404).json({status: "Agendamento não encontrado"});
        }

        return res.status(200).json({message: "Atualização concluída", agendamento_atualizado: agendamentoAtualizado});

    }catch(error){
        return res.status(500).json({status: "Não foi possível realizar atualização", error: error.message});
    }

})

app.delete("/agendamentos/:id", async (req, res)=>{

    try{
        const {id} = req.params;

        const agendamentoDeletado = await Agendamento.findByIdAndDelete(id);

        if(!agendamentoDeletado){
            return res.status(404).json({message: "Agendamento não encontrado"});
        }

        return res.status(200).json({message: "Agendamento deletado com sucesso", agendamento_deletado: agendamentoDeletado});
    }catch(error){
        return res.status(500).json({message: "Erro ao deletar agendamento", error: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});