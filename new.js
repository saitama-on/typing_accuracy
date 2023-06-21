let input_box = document.getElementById("input_area");
const url1 = "https://random-word-api.herokuapp.com/word";
async function getword() {
    try {
      const response = await fetch(url1);
      const data = await response.json();
      const randomWord = data[0];
      paragraph.textContent = randomWord;
      array_of_words.push(randomWord);
      document.getElementById("correct_input").value = "hello" + document.getElementById("correct_input").value + randomWord
    } catch (error) {
      console.error('Error:', error);
    }
  }
 let array_of_words = ["hello"]

let timer = 30;


let my_list = [];

let paragraph = document.getElementById("para");

let answers = document.getElementById("array_of_ans").textContent;


function start_again(){

    window.location.reload();
}

function accuracy_calc(){
    for (let i=0 ; i< array_of_words.length ; i++){

        if(array_of_words[i] === arr[i]){

            count = count + 1
        }
    }

    let accuracy = parseFloat((count/array_of_words.length).toFixed(3));
    document.getElementById("accuracy").textContent = accuracy*100 + "%";
}



function start_timer() {
    input_box.style.backgroundColor = "#ACE1AF";
    document.getElementById("input_area").onclick = '';


    let new_int = setInterval(() => {
        timer = timer - 1;
        document.getElementById("timer").textContent = timer;
        

        if (timer == 0) {
            input_box.disabled = true;
            
            
            clearInterval(new_int);
            console.log(array_of_words , arr,accuracy);
            accuracy_calc();
            document.getElementById("correct_input").textContent = array_of_words.join(" ");
        }

        
    }, 1000);

}

// space to make the word disappear and add it to new array/str 
let arr = [];

var instance = new Mark(document.getElementById("para"));

function performMark(){

   var keyword = input_box.value ; 
   instance.unmark({
    done: function(){
        instance.mark(keyword , ["exactly"]);
    }
   })
   
   


}

let count =0 ;
document.addEventListener('keypress', (event) => {
    if (event.key == ' ') {
        
        
        arr.push(input_box.value.trim());
        

        document.getElementById("array_of_ans").textContent =  document.getElementById("array_of_ans").textContent + input_box.value;

        instance.unmark(input_box.value);
        
        input_box.value = "";
        paragraph.textContent = '';
        getword();


    }
})




 input_box.addEventListener("input", performMark);
