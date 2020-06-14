const { prisma } = require('./generated/prisma-client')

async function main(){
  const newProduct=await prisma.createProducto({cantidad:15,codigo:17,enabled:1,provincia:2,nombre:"Prueba3",precio:50})

  const allProducts=await prisma.productoes();
  console.log(allProducts)
}
main();