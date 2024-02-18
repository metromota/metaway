import * as yup from "yup"
import { listUf } from "./static/list-uf"

const schemaUpdate = yup.object({
    cpf: yup
        .string()
        .min(14, "Deve possuir no mínimo 11 dígitos")
        .required("Campo deve ser preenchido"),
    nome: yup
        .string()
        .min(3, "Deve possuir no mínimo 3 caracteres")
        .matches(/^[a-zA-Z\s]+$/, "Deve possuir nome válido")
        .required("Campo deve ser preenchido"),
    logradouro: yup.string().required("Campo deve ser preenchido"),
    cidade: yup.string().required("Campo deve ser preenchido"),
    cep: yup.string().required("Campo deve ser preenchido"),
    bairro: yup.string().required("Campo deve ser preenchido"),
    pais: yup.string().required("Campo deve ser preenchido"),
    numero: yup.number().required("Campo deve ser preenchido"),
    estado: yup
        .string()
        .oneOf(listUf, "Por favor, selecione um tipo válido"),
})

export { schemaUpdate }