import * as yup from "yup"
import { TipoContato } from "../../core/enums/tipo-contato.enum"

const schemaUpdate = yup.object({
    email: yup
        .string()
        .email("Deve possuir email válido")
        .required("Campo deve ser preenchido"),
    tag: yup.string().required("Campo deve ser preenchido"),
    telefone: yup
        .string()
        .min(14, "Deve possuir no mínimo 11 caracteres")
        .required("Campo deve ser preenchido"),
    tipoContato: yup
        .string()
        .oneOf(
            [
                TipoContato.CELULAR,
                TipoContato.EMAIL,
                TipoContato.TELEFONE,
            ],
            "Por favor, selecione um tipo válido"
        ),
    userSearch: yup.string(),
    personSearch: yup.string(),
})

export { schemaUpdate }