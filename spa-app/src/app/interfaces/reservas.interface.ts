import { DepartamentoI } from "./departamento.interface";
import { UsuarioI } from "./usuario.interface";

export interface ReservasI {
    id: number;
    entrada: Date;
    salida: Date;
    estado: string;
    departamento: DepartamentoI;
    usuario: UsuarioI;
}