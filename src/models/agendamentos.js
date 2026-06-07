import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema(
    {
    nomePet:{
        type: String,
        required: [true, "O nome do pet é obrigatório"],
        trim: true
    },
    especie:{
        type: String,
        required: [true, "A espécie do pet é obrigatória"],
        trim: true,
        enum:{
            values: ["cao", "gato", "outro"],
            message: "{VALUE} não é uma espécie válida"
        }
    },
    nomeDono:{
        type: String,
        required: [true, "O nome do dono é obrigatório"],
        trim: true
    },
    telefone:{
        type: String,
        required: [true, "O telefone é obrigatório"],
        trim: true,
    },
    servico:{
        type: String,
        required: [true, "O serviço é obrigatório"],
        trim: true,
        enum: {
            values: ["banho", "tosa", "banho e tosa"],
            message: "O {VALUE} não é um serviço válido"
        }
    },
    data:{
        type: Date,
        required: [true, "A data é obrigatória"],
    },
    valor:{
        type: Number,
    },
    status:{
        type: String,
        default: "agendado",
        enum: ["agendado", "concluido", "cancelado"]
    }
},
{
    timestamps: true,
});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

export default Agendamento;