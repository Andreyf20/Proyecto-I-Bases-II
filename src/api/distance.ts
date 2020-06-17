const tibas: [number, number] = [9.961886, -84.078771];
const buenosaires: [number, number] = [9.172562, -83.335655];
const tresrios: [number, number] = [9.908322, -83.985217];
const sanpablo: [number, number] = [9.995198, -84.098481];

const puntosdereferencia: [number, number][] = [
  tibas,
  sanpablo,
  tresrios,
  buenosaires,
];

module.exports = function calcularDistanciaEuclideana(puntoNuevo: [number, number]) {
    var distances: number[] = []; //Guardo las distancias aqui
  
    puntosdereferencia.forEach((coordinateTuple) => {
      const partial =
        Math.pow(coordinateTuple[0] - puntoNuevo[0], 2) +
        Math.pow(coordinateTuple[1] - puntoNuevo[1], 2);
      distances.push(Math.sqrt(partial)); //Adds to array of distances
    });
    console.log(distances);
    var min = Math.min(...distances); //Saco el min del array
    //var nombres: string[] = ["Tibas", "Buenos Aires", "Tres Rios", "San Pablo"];
    return distances.indexOf(min);
}