export class MarkModel {
    name:String;
    lat:String;
    lon:String;
    foto:String;
    descripcion:string;
    activado:boolean;

    constructor(
    name:String,
    lat:String,
    lon:String,
    foto:String,
    descripcion:string,
    activado:boolean,
    ){
    this.name=name,
    this.lat=lat,
    this.lon=lon,
    this.foto=foto,
    this.descripcion=descripcion,
    this.activado=activado
    }

}