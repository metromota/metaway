import * as yup from "yup"
import { RoleUser } from "../../core/enums/tipo-acesso.enum"

const schemaSave = yup.object({
    cpf: yup
        .string()
        .min(14, "Deve possuir no mínimo 11 dígitos")
        .required("Campo deve ser preenchido"),
    dataNascimento: yup.date().required("Campo deve ser preenchido"),
    email: yup
        .string()
        .email("Deve possuir email válido")
        .required("Campo deve ser preenchido"),
    nome: yup
        .string()
        .min(3, "Deve possuir no mínimo 3 caracteres")
        .matches(/^[a-zA-Z\s]+$/, "Deve possuir nome válido")
        .required("Campo deve ser preenchido"),
    telefone: yup
        .string()
        .min(14, "Deve possuir no mínimo 11 caracteres")
        .required("Campo deve ser preenchido"),
    username: yup
        .string()
        .min(5, "Deve possuir no mínimo 5 caracteres")
        .required("Campo deve ser preenchido"),
    password: yup
        .string()
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Deve possuir apenas letras e números"
        )
        .min(8, "Deve possuir no mínimo 8 caracteres")
        .required("Campo deve ser preenchido"),
    usertype: yup
        .string()
        .oneOf(
            [RoleUser.ROLE_ADMIN, RoleUser.ROLE_USER],
            "Por favor, selecione um tipo válido"
        ),
})

export { schemaSave }