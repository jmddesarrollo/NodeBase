import { Dificultad } from './dificultad.model';

export class Ruta {
    constructor(
        public titulo: string,
        public lugar: string,
        public fecha: string,
        public distancia: number,
        public duracion: string,
        public altitudMax: number,
        public altitudMin: number,
        public desnivelSubida: number,
        public desnivelBajada: number,
        public senalizacion: string,
        public ibp: string,
        public descripcion: string,
        public opcional: number,
        public enlaceTiempo: string,
        public enlaceRuta: string,
        public enlaceApuntarse: string,
        public precioNoSocio: number,
        public precioSocio: number,
        public telefonoContacto: string,
        public ultimoDiaApuntarse: string,
        public ultimaHoraApuntarse: string,
        public publica: number,
        public recorridoId: number,
        public dificultadId: number,
        public dificultad?: Dificultad,
        public id?: number
    ) {}

    // Realiza copia para no referenciar varios objetos.
    static copiar(json) {
        return new Ruta(json.titulo, json.lugar, json.fecha, json.distancia, json.duracion, json.altitudMax,
            json.altitudMin, json.desnivelSubida, json.desnivelBajada, json.senalizacion, json.ibp,
            json.descripcion, json.opcional, json.enlaceTiempo, json.enlaceRuta, json.enlaceApuntarse,
            json.precioNoSocio, json.precioSocio, json.telefonoContacto, json.ultimoDiaApuntarse,
            json.ultimaHoraApuntarse, json.publica, json.recorridoId, json.dificultadId, json.id);
    }
}
