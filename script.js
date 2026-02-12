// const loadLeassions = () => {
//   fetch("https://openapi.programming-hero.com/api/levels/all")
//     .then((res) => res.json())
//     .then((less) => displaylessions(less.data));
// };

const loadLeassions = async()=>{
const res=await fetch('https://openapi.programming-hero.com/api/levels/all')
const less= await res.json();
displaylessions(less.data);
}

loadLeassions();

const displaylessions = (less) => {
  // console.log(less);
  const lessionContainer = document.getElementById("tabContainer");
  lessionContainer.innerHTML = "";
  for (let lession of less) {
    const btndiv = document.createElement("div");
    btndiv.innerHTML = ` <a id="lesson-btn-${lession.level_no}" onclick="showLevelData(${lession.level_no})" class=" lessionbtn btn my-2 hover:bg-blue-500 hover:text-white"> Learn ${
      lession.level_no
    }</a>`;
    lessionContainer.append(btndiv);
  }
};

// const showLevelData = (id) => {
//      managSpeener(true);

//   fetch(`https://openapi.programming-hero.com/api/level/${id}`)
//     .then((res) => res.json())
//     .then((levelData) => {
//       removeActive();
//       const clickBtn = document.getElementById(`lesson-btn-${id}`);
//       clickBtn.classList.add("active");

//       showwords(levelData.data);
//     });

// };

const showLevelData = async (id) => {
     managSpeener(true);

  const res=await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
  const levelData= await res.json();
  removeActive();
  const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      showwords(levelData.data);
    

};

const removeActive = () => {
  const lessionActiveBtn = document.querySelectorAll(".lessionbtn");
  lessionActiveBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadWordDetails = async (id) => {
     
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res= await fetch(url);
  const WordData = await res.json();
  detailsWordData(WordData.data);

//   fetch(url)
//     .then((res) => res.json())
//     .then(wordData => console.log(wordData.data));


};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const detailsWordData=(word)=>{
  
  
  const detailsWordContainer=document.getElementById('ditailsContainer');
  detailsWordContainer.innerHTML=` <h3 class="text-lg font-bold"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h3>
            <p class="py-4">Meaning</p>
            <h3 class="text-md py-4">"${word.meaning ? word.meaning : "NO Data"}"</h2>
             <p class="py-4">Example</p>
            <h3 class="text-md py-4">"${word.sentence ? word.sentence : "NO Data"}"</h2>
             <p class="py-4">Somorthok Sobdo</p>
            <div class="text-md py-4">${createElement(word.synonyms)}</div>
            `;

  const wordShow=document.getElementById('wordShow');
  wordShow.showModal();

}

const createElement=(syn)=>{
const htmlElement=syn.map((synonym)=>`<span class="btn"> ${synonym}</span>`);
return htmlElement.join(" ");

}



// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

const managSpeener=(status)=>{
if(status== true){
const spenner=document.getElementById('speener');
spenner.classList.remove('hidden'); 
const wordContainer=document.getElementById('wordMeaningContainer');
wordContainer.classList.add('hidden');
} else{
  const spenner=document.getElementById('speener');
spenner.classList.add('hidden'); 
const wordContainer=document.getElementById('wordMeaningContainer');
wordContainer.classList.remove('hidden');
}}

const showwords = (levelData) => {
  // console.log(levelData);
  const wordMeaningContainer = document.getElementById("wordMeaningContainer");
  wordMeaningContainer.className = "grid grid-cols-4 gap-4 p-10";
  wordMeaningContainer.innerHTML = "";
  if (levelData.length == 0) {
    wordMeaningContainer.className = "bg-sky-100";

    wordMeaningContainer.innerHTML = `<div class=" mx-auto my-10">
                
                    <div class="card bg-sky-200 shadow-md p-4 text-center py-10 gap-10">
                        <h3 class="text-xl">আপনি এখনো লেসন সিলেক্ট করেননি</h3>
                        <h2 class="text-4xl font-bold ">একটি lession select করুন</h2>
                    </div>

                
            </div>`;
 managSpeener(false);
    return ;
  }

  levelData.forEach((word) => {
    // console.log(word);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-sky-200 shadow-md p-4 text-center">
                    <h2 class="text-4xl font-bold py-5">${word.word}</h2>
                    <h3 class="text-xl">Meaning /Pronounciation</h3>
                    <h2 class="text-xl py-4">"${word.meaning ? word.meaning : "NO Data"} / ${word.pronunciation}"</h2>
                    <div class="flex flex-row justify-between gap-4">
                        <button class="btn btn-soft " onclick="loadWordDetails(${word.id})" ><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn btn-soft " onclick="pronounceWord('${word.word}')" ><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
        `;
    wordMeaningContainer.appendChild(div);
  });
  managSpeener(false);
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "bn-BD"; // Bangla
  window.speechSynthesis.speak(utterance);
}



// document.getElementById('seacrh').addEventListener('click',()=>{
// const searchText=document.getElementById('inputValue');
// const seachvalue=searchText.value.trim().toLowerCase();


// fetch('https://openapi.programming-hero.com/api/words/all')
// .then(res=>res.json())
// .then(data=>{
//   const allWords=data.data;
//   console.log(allWords);
//   const filterdWord=allWords.filter(word=>word.word.toLowerCase().includes(seachvalue))
//   showwords(filterdWord);
// })
// removeActive();
// })

const searchValue=document.getElementById('inputValue');

searchValue.addEventListener('input',()=>{
  const searchText=searchValue.value.trim().toLowerCase();
  console.log(searchText);

  fetch('https://openapi.programming-hero.com/api/words/all')
  .then(res=>res.json())
  .then(data=>{
    const allWord=data.data;
    // const filterword=allWord.filter(x=>x.word.toLowerCase().includes(searchText));
    const filterword=allWord.filter(x=>x.word.toLowerCase().startsWith(searchText));
    
    showwords(filterword)
  })
  removeActive();
})