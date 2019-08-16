import { Rol } from './rol.model';

export class Usuario {
    constructor(
        public nombre: string,
        public apellidos: string,
        public email: string,
        public password: string,
        public alias: string,
        public activo?: boolean,
        public imagen?: string,
        public rol?: Rol,
        public rolid?: number,
        public confirmPass?: string,
        public id?: string
    ) {}

    // Realiza copia para no referenciar varios objetos.
    static copiar(json) {
        return new Usuario(json.nombre, json.apellidos, json.email, json.password,
            json.alias, json.activo, json.imagen, json.rol, json.rolid, json.confirmpass, json.id);
    }
}
