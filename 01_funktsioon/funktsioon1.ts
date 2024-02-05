function korrutakahega(arv:number){
  return arv*2;
}

//console.log(korrutakahega(9));


//KMI funktsioon

function kmi(pikkus:number, kaal:number){
  return kaal/(pikkus*pikkus);
}

console.log(kmi(1.8, 80).toFixed(1));

function kmiHinnang(indeks:number):string{
   if(indeks<16){return "Tervisele ohtlik alakaal";}
   if(indeks<18.5){return "Alakaal";}
   if(indeks<25){return "Normaalkaal";}
   if(indeks<30){return "Ülekaal";}
   if(indeks<35){return "Rasvumine";}
   if(indeks<40){return "Tugev rasvumine";}
   return "Tervisele ohtlik rasvumine"; 
}
console.log(kmiHinnang(32))

let kmiArvud:number[]=[25,18,38,28];
let hinnangud=kmiArvud.map(kmiHinnang);
console.log(hinnangud);
