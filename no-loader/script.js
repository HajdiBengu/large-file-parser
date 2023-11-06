// Deklarojme variablat ku do ruajme elementet HTML qe do ndryshojme.
let searchBar = document.getElementById("search");
let list = document.getElementById("list");
let errormsg = document.getElementById("error");
let searchValue; // variabli ku ruhet inputi i kerkimit (inputi ne search bar)
let allRows = []; // array me rreshtat e te dhenave (te formatuar) te marra nga file (permes FileInput).

// Nje eventListener qe ruan tekstin e futur ne input field ne variablin searchValue
// E ruajme tekstin ne variabel me global scope sepse do e perdorim me vone kur te shtypin Enter per te kerkuar.
searchBar.addEventListener("input", function (e) {
  let value = e.target.value;
  searchValue = value.trim().toLowerCase();
});

// Nje eventListener kur shtypim Enter per te kerkuar.
// Pastron listen e HTML qe permban gjithe te dhenat ne menyre qe te mund te shfaqim vetem te dhenat qe kerkojme.
// Pastaj perpunon secilin prej rreshtave, dhe shfaq nje element HTML vetem per rreshtat qe permbajne tekstin e kerkuar.
// Se fundmi, nese nuk ka asnje element HTML te vlefshem pas kerkimit, shfaqim mesazhin qe nuk u gjet asnje e dhene.
window.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    list.innerHTML = "";

    allRows.forEach((row) => {
      if (row.trim().toLowerCase().includes(searchValue)) {
        const liItem = document.createElement("li");
        liItem.setAttribute("id", "row");
        liItem.textContent = `${row}`;
        list.appendChild(liItem);
        errormsg.textContent = "";
      }
    });

    if (list.childElementCount == 0) {
      errormsg.textContent = "No match found! Sorry!";
    }
  }
});

//  Funksioni qe parson file-in e marre nga file input.
//  Krijon nje readableStream ne menyre qe te perpunoje shume te dhena ne menyren me eficente te mundshme.
//  Formaton tekstin ne secilin rresht te dhenash dhe e kalon secilin prej tyre si element ne allRows array.
//  Nepermjet readableStream-it krijojme nga nje element HTML-je per secilin rresht.
//  Kjo mundeson shfaqjen e elementeve te para nderkohe qe Javascript vazhdon perpunimit e te gjithe file-it.
async function FileInput(input) {
  // Marrim file nga file input.
  let file = input.files[0];
  let data = file.stream();

  // Definojme readableStream dhe text decoder (sepse readableStream dergon bytes, jo text)
  const reader = data.getReader();
  const decoder = new TextDecoder("utf-8");

  // Nese me pare kemi pasur nje file te ngarkuar, pastrojme array-n allRows dhe listen e shfaqur,
  // ne menyre qe te shfaqim te dhenat nga file-i i ri.
  // currentChunk eshte variabli ku ruhet instanca e rradhes e prodhuar ng stream-i
  let currentChunk = "";
  allRows = [];
  list.innerHTML = "";

  while (true) {
    // Presim metoden read() te readableStream dhe ruajme instancen e prodhuar ne value.
    // done eshte boolean qe kthehet ne true kur readableStream mbaron se lexuari file-in.
    const { done, value } = await reader.read();

    // Nderkohe qe readableStream lexon, dekodojme secilen instance te stream-it,
    // e formatojme secilin rresht dhe e ruajme ne array allRows qe kemi definuar ne global scope.
    if (!done) {
      currentChunk = decoder.decode(value);
      let firstArray = currentChunk.split(/\r?\n/);
      let updatedArray = firstArray.map((row) =>
        row
          .replace(/,/, " ")
          .replace(/,/, " | ")
          .replace(/,/, " ")
          .replace(/,/, " ")
          .replace(/,/, " | ")
          .replace(/,/, " | ")
      );
      allRows = allRows.concat(updatedArray);
      updatedArray.shift();

      // Nderkohe qe jemi akoma ne readableStream, shfaqim secilin rresht ne HTML.
      // Elementet e shfaqur jane elemente te nje liste te renditur,
      // prandaj secili rresht ka numrin rendor sipas kerkeses se ushtrimit.
      updatedArray.forEach((row) => {
        const div = document.createElement("li");
        div.setAttribute("id", "row");
        div.textContent = `${row}`;
        list.appendChild(div);
      });
    } else {
      // Kur readableStream mbaron se lexuari, logojme mesazhin "Done reading" ne konsole,
      // dhe heqim rreshtin e pare te te dhenave nga array. Kjo mundeson qe gjate dhe pas kerkimit
      // te mos shfaqen tekstet "firstName,lastName," etj.
      console.log("Done reading");
      allRows.shift();
      break;
    }
  }
}
