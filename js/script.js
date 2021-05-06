/* Definire un array di oggetti; ogni oggetto rappresenta un gatto, che è caratterizzato da: nome, età, colore e sesso.
Tramite la funzione .forEach(), stampare in pagina tutti i gattini, ciascuno con il proprio colore e il proprio nome.

Milestone 2
Dividere i gatti in due contenitori distinti in base al sesso e aggiungere a fianco di ogni gattino un fiocco colorato di rosa, se femmina, o di blu, se maschio. Il colore del fiocco deve essere più tenue se il gatto è più giovane, più scuro se il gatto è più vecchio.

Milestone 3
Creare un nuovo array con prima tutti i gattini femmina e poi tutti i gattini maschio, inserendo solamente nome e colore e colore e opacità del fiocco per ogni gatto. */

$(document).ready(function(){
  // la nostra base
  const cats = [
    {
      name: 'fuffi',
      age: 1.5,
      color: '#964100',
      gender: 'male'
    },
    {
      name: 'mumù',
      age: 1,
      color: '#494146',
      gender: 'female'
    },
    {
      name: 'tigre',
      age: 6,
      color: '#CAA446',
      gender: 'male'
    },
    {
      name: 'grisù',
      age: 0.8,
      color: '#1E110A',
      gender: 'male'
    },
    {
      name: 'violetta',
      age: 2,
      color: '#6E4B35',
      gender: 'female'
    }
  ];

  //con un for each stampo tutti i gattini
  cats.forEach((cat) => {
    $('#mailes-1 ul').append(listGenerator(cat.color, cat.name))
  });

  // aggiungo alla mia base dati le proprietà del ribbon (fiocco)
  const pink = '#FF00E6';
  const blue = '#0084FF';
  const newCats = cats.map((cat) => {
    //creo le proprietà da aggiungere alla mia base dati per il ribbon
    //per questa condizione usiamo l'operatore ternario
    //          (se è vero              ) (? se è true) (: se è false)
    let color = (cat.gender === 'female') ? pink : blue;
    //metodo classico ||||
    /* if(cat.gender === 'female'){
      color =pink;
    }else{
      color =blue;
    } */

    let opacity = cat.age / 10;
    return {
      ...cat,
      ribbon: {
        color,
        opacity
      }
    }
    
  });//end map

  //filtro l'array in base alla proprietà gender
  const femaleCats = newCats.filter((cat) => cat.gender === 'female' );
  
  const maleCats = newCats.filter((cat) => cat.gender === 'male' );

  femaleCats.forEach((cat) => {
    $('#mailes-2-female ul').append(listGenerator(cat.color, cat.name, cat.ribbon.color,cat.ribbon.opacity))
  });
  maleCats.forEach((cat) => {
    $('#mailes-2-male ul').append(listGenerator(cat.color, cat.name,cat.ribbon.color ,cat.ribbon.opacity))
  });

  //adesso devo unire in ordine prima le femmine poi i maschi in un arr
  const orderedCats = [...femaleCats, ...maleCats];
  
  //generare un nuovo arr con solo nome, colore e ribbon (colore e opacity) e stamparlo
  const catsTarget = orderedCats.map((cat) => {
    //destrutturo l'elemento cat per inizializzare le var name, color, ribbon
    const {name, color, ribbon} = cat;
    //stampo a video l'arr ordinato
    $('#mailes-3 ul').append(listGenerator(color, name, ribbon.color ,ribbon.opacity))
    //ritorno l'oggetto con i valori frutto della destrutturazione
    return {name, color, ribbon};
  });

  


});

//funzioni

function listGenerator (catColor, name, ...ribbon){
   
  let ribbonTag = "";
  if(ribbon.length > 0){
    ribbonTag = `<i class="fas fa-ribbon" style="color:${ribbon[0]}; opacity:${ribbon[1]};"></i>`
  }
   let html = `
      <li>
        <i class="fas fa-cat" style="color:${catColor}"></i>
        ${ribbonTag}
        <span>${name}</span>
      </li>
   `;

   return html;
}


