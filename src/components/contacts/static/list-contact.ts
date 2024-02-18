import { TipoContato } from "../../../core/enums/tipo-contato.enum"

const listContact = [
    {
        label: "Celular",
        value: TipoContato.CELULAR,
    },
    {
        label: "Email",
        value: TipoContato.EMAIL,
    },
    {
        label: "Telefone",
        value: TipoContato.TELEFONE,
    },
]

export { listContact }