
        /**
         * -------------------------------------------------------------------
         * SECTION: API Data Fetching - Lessons/Levels
         * -------------------------------------------------------------------
         * এই সেকশনে লেভেলগুলোর লিস্ট সার্ভার থেকে লোড করা হয়।
         */

        // const loadLeassions = () => {
        //   fetch("https://openapi.programming-hero.com/api/levels/all")
        //     .then((res) => res.json())
        //     .then((less) => displaylessions(less.data));
        // };

        const loadLeassions = async () => {
            const res = await fetch('https://openapi.programming-hero.com/api/levels/all')
            const less = await res.json();
            displaylessions(less.data);
        }

        loadLeassions();

        /**
         * -------------------------------------------------------------------
         * SECTION: UI Rendering - Displaying Lesson Buttons
         * -------------------------------------------------------------------
         * API থেকে পাওয়া লেভেল ডেটা ব্যবহার করে বাটন তৈরি করা হয়।
         */
        const displaylessions = (less) => {
            // console.log(less);
            const lessionContainer = document.getElementById("tabContainer");
            lessionContainer.innerHTML = "";
            for (let lession of less) {
                const btndiv = document.createElement("div");
                btndiv.innerHTML = ` <a id="lesson-btn-${lession.level_no}" onclick="showLevelData(${lession.level_no})" class=" lessionbtn btn my-2 hover:bg-blue-500 hover:text-white"> Learn ${lession.level_no
                    }</a>`;
                lessionContainer.append(btndiv);
            }
        };

        /**
         * -------------------------------------------------------------------
         * SECTION: Level Details - Fetching words for a specific level
         * -------------------------------------------------------------------
         * নির্দিষ্ট লেসনে ক্লিক করলে সেই লেসনের সকল শব্দ লোড করা হয়।
         */
        // const showLevelData = (id) => {
        //       managSpeener(true);

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

            const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
            const levelData = await res.json();
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            showwords(levelData.data);
        };

        /**
         * -------------------------------------------------------------------
         * SECTION: Helper Functions - UI Utilities
         * -------------------------------------------------------------------
         * একটিভ ক্লাস রিমুভ এবং স্পিনার কন্ট্রোল করার ফাংশনসমূহ।
         */
        const removeActive = () => {
            const lessionActiveBtn = document.querySelectorAll(".lessionbtn");
            lessionActiveBtn.forEach((btn) => btn.classList.remove("active"));
        };

        const managSpeener = (status) => {
            if (status == true) {
                const spenner = document.getElementById('speener');
                spenner.classList.remove('hidden');
                const wordContainer = document.getElementById('wordMeaningContainer');
                wordContainer.classList.add('hidden');
            } else {
                const spenner = document.getElementById('speener');
                spenner.classList.add('hidden');
                const wordContainer = document.getElementById('wordMeaningContainer');
                wordContainer.classList.remove('hidden');
            }
        }

        /**
         * -------------------------------------------------------------------
         * SECTION: Word Details - Individual Word Info
         * -------------------------------------------------------------------
         * নির্দিষ্ট শব্দের বিস্তারিত তথ্য (Meaning, Synonyms) দেখানোর জন্য।
         */
        const loadWordDetails = async (id) => {
            const url = `https://openapi.programming-hero.com/api/word/${id}`;
            const res = await fetch(url);
            const WordData = await res.json();
            detailsWordData(WordData.data);

            //   fetch(url)
            //     .then((res) => res.json())
            //     .then(wordData => console.log(wordData.data));
        };

        const detailsWordData = (word) => {
            const detailsWordContainer = document.getElementById('ditailsContainer');
            detailsWordContainer.innerHTML = ` <h3 class="text-lg font-bold"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h3>
            <p class="py-4 font-semibold border-b">Meaning</p>
            <h3 class="text-md py-4">"${word.meaning ? word.meaning : "NO Data"}"</h2>
             <p class="py-4 font-semibold border-b">Example</p>
            <h3 class="text-md py-4">"${word.sentence ? word.sentence : "NO Data"}"</h2>
             <p class="py-4 font-semibold border-b">Somorthok Sobdo</p>
            <div class="text-md py-4 flex flex-wrap gap-2">${createElement(word.synonyms)}</div>
            `;

            const wordShow = document.getElementById('wordShow');
            wordShow.showModal();
        }

        const createElement = (syn) => {
            if (!syn || syn.length === 0) return "No Synonyms";
            const htmlElement = syn.map((synonym) => `<span class="badge badge-outline p-4"> ${synonym}</span>`);
            return htmlElement.join(" ");
        }

        /**
         * -------------------------------------------------------------------
         * SECTION: UI Rendering - Words List
         * -------------------------------------------------------------------
         * লেভেলের সকল শব্দ কার্ড আকারে রেন্ডার করা হয়।
         */
        const showwords = (levelData) => {
            // console.log(levelData);
            const wordMeaningContainer = document.getElementById("wordMeaningContainer");
            wordMeaningContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10";
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
                return;
            }

            levelData.forEach((word) => {
                // console.log(word);
                const div = document.createElement("div");
                div.innerHTML = `
                <div class="card bg-sky-200 shadow-md p-6 text-center h-full flex flex-col justify-between">
                    <div>
                        <h2 class="text-4xl font-bold py-5">${word.word}</h2>
                        <h3 class="text-xl text-gray-600">Meaning /Pronunciation</h3>
                        <h2 class="text-xl py-4 font-medium">"${word.meaning ? word.meaning : "NO Data"} / ${word.pronunciation}"</h2>
                    </div>
                    <div class="flex flex-row justify-center gap-4 mt-4">
                        <button class="btn btn-circle btn-info text-white" onclick="loadWordDetails(${word.id})" ><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn btn-circle btn-success text-white" onclick="pronounceWord('${word.word}')" ><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
                `;
                wordMeaningContainer.appendChild(div);
            });
            managSpeener(false);
        };

        /**
         * -------------------------------------------------------------------
         * SECTION: Browser API - Speech Synthesis
         * -------------------------------------------------------------------
         * শব্দের উচ্চারণ শুনানোর জন্য ব্রাউজারের স্পিচ ইঞ্জিন ব্যবহার করা হয়েছে।
         */
        function pronounceWord(word) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = "en-US"; // Standard English for pronunciation
            window.speechSynthesis.speak(utterance);
        }

        /**
         * -------------------------------------------------------------------
         * SECTION: Search Logic - Real-time filtering
         * -------------------------------------------------------------------
         * ইনপুট বক্সে টাইপ করার সাথে সাথে শব্দ ফিল্টার করার জন্য।
         */

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

        const searchValue = document.getElementById('inputValue');

        searchValue.addEventListener('input', () => {
            const searchText = searchValue.value.trim().toLowerCase();
            console.log(searchText);

            fetch('https://openapi.programming-hero.com/api/words/all')
                .then(res => res.json())
                .then(data => {
                    const allWord = data.data;
                    // const filterword=allWord.filter(x=>x.word.toLowerCase().includes(searchText));
                    const filterword = allWord.filter(x => x.word.toLowerCase().startsWith(searchText));

                    showwords(filterword)
                })
            removeActive();
        })
    