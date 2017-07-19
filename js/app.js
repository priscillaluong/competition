

var questions = [
{Question: "Descrice your mood1?",
AnswerA: "Relax",
AnswerB: "Happy",
AnswerC: "Anxious",
 AnswerD: "Relax",
  AnswerE: "Relax",

},
{Question: "Descrice your mood2?",
AnswerA: "Relax",
AnswerB: "Happy",
AnswerC: "Anxious",
 AnswerD: "Relax",
  AnswerE: "Relax",
},
{Question: "Descrice your mood3?",
AnswerA: "Relax",
AnswerB: "Happy",
AnswerC: "Anxious",
 AnswerD: "Relax",
  AnswerE: "Relax",
}
]

function start() {
  // Print "Hello, world!" to the developer console.
  $("#answer_a").hide();
   $("#answer_b").hide();
    $("#answer_c").hide();
     $("#answer_d").hide();
    $("#answer_e").hide();
    
     $("#Next").hide();
      $("#Next2").hide();
 
       $("#Submit").hide();
    
    $("#image1").hide()
     $("#image2").hide()
      $("#image3").hide()
       $("#image4").hide()
        $("#image5").hide()
         $("#image6").hide()
   //$("#about-content").hide();
  console.log("Hello, world!");
  $("#quiz").click(quiz);
  $("#Next").click(NextQuestion);
  $("#Next2").click(NextQuestion2);
   
  $("#Submit").click(SubmitQuiz);
  

}

function quiz () {

$("#quiz").hide();
$("#quiz_result").html('');
	 $("#answer_a").show();
   $("#answer_b").show();
    $("#answer_c").show();
     $("#answer_d").show();
     $("#answer_e").show();
     $("#Next").show();
    
    
	   $("#image1").hide()
     $("#image2").hide()
      $("#image3").hide()
       $("#image4").hide()
        $("#image5").hide()
         $("#image6").hide()
   
	 $("#Question_1").html(questions[0].Question);
	  $("#Answers_1a").html(questions[0].AnswerA);
	  $("#Answers_1b").html(questions[0].AnswerB);
	  $("#Answers_1c").html(questions[0].AnswerC);
      $("#Answers_1d").html(questions[0].AnswerD);
    $("#Answers_1e").html(questions[0].AnswerE);
	  $("#Next").html("Next Question");
	  $("#quiz").html("Start the quiz!")

}

function NextQuestion () {
	window.result1 = $('input[name=result_1]:checked').val()
	  $("#Next").hide();
	   $("#Next2").show();
	 $("#Question_1").html('');
	 $("#Answers_1a").html('');
	  $("#Answers_1b").html('');
	  $("#Answers_1c").html('');
      $("#Answers_1d").html('');
	  $("#Answers_1e").html('');
	  $("#Next").html('');

       $("#image1").hide()
     $("#image2").hide()
      $("#image3").hide()
       $("#image4").hide()
        $("#image5").hide()
         $("#image6").hide()
         
	  $("#Question_1").html(questions[1].Question);
	  $("#Answers_1a").html(questions[1].AnswerA);
	  $("#Answers_1b").html(questions[1].AnswerB);
	  $("#Answers_1c").html(questions[1].AnswerC);
      $("#Answers_1d").html(questions[1].AnswerD);
	  $("#Answers_1e").html(questions[1].AnswerE);
	  $("#Next2").html("Next Question"); 
}

function NextQuestion2 () {
	window.result2 = $('input[name=result_1]:checked').val()
	 $("#Next2").hide();
	   $("#Submit").show()
	 $("#Question_1").html('');
	 $("#Answers_1a").html('');
	  $("#Answers_1b").html('');
	  $("#Answers_1c").html('');
     $("#Answers_1d").html('');
     $("#Answers_1e").html('');
	  $("#Submit").html('');

       $("#image1").hide()
     $("#image2").hide()
      $("#image3").hide()
       $("#image4").hide()
        $("#image5").hide()
         $("#image6").hide()
    
	  $("#Question_1").html(questions[2].Question);
	  $("#Answers_1a").html(questions[2].AnswerA);
	  $("#Answers_1b").html(questions[2].AnswerB);
	  $("#Answers_1c").html(questions[2].AnswerC);
      $("#Answers_1d").html(questions[2].AnswerD);
	  $("#Answers_1e").html(questions[2].AnswerE);
	  $("#Submit").html("Submit Quiz"); 

}
function SubmitQuiz () {
	window.result3 = $('input[name=result_1]:checked').val()
	 $("#Submit").hide()
	 $("#answer_a").hide();
   $("#answer_b").hide();
    $("#answer_c").hide();
      $("#answer_d").hide();
      $("#answer_e").hide();
    
    
       $("#image1").hide()
     $("#image2").hide()
      $("#image3").hide()
       $("#image4").hide()
        $("#image5").hide()
         $("#image6").hide()
    
	 $("#Question_1").html('');
	 $("#Answers_1a").html('');
	  $("#Answers_1b").html('');
	  $("#Answers_1c").html('');
      $("#Answers_1d").html('');
      $("#Answers_1e").html('');
	  $("#Submit").html('');
	var total_result = window.result1+window.result2+window.result3
	console.log(total_result)  



    
    if ((total_result.match(/A/g) || []).length==3) { //answer all As
console.log("worked three As") 
$("#quiz_result").html("Your dream a");
       $("#image6").show();
}


if ((total_result.match(/A/g) || []).length==2) { //answer is majority As
console.log("worked two As") 
$("#quiz_result").html("Your dream a");
       $("#image6").show();
}

   if ((total_result.match(/B/g) || []).length==3) { //answer all Bs
console.log("worked three Bs") 
$("#quiz_result").html("Your dream b");
       $("#image6").show();
}

if ((total_result.match(/B/g) || []).length==2) { //answer is majority Bs
console.log("worked two Bs") 
$("#quiz_result").html("Your dream b");
       $("#image6").show();
}


if ((total_result.match(/C/g) || []).length==3) { //answer all Cs
console.log("worked three Cs") 
$("#quiz_result").html("Your dream c");
       $("#image6").show();
}


if ((total_result.match(/C/g) || []).length==2) { //answer is majority Cs
console.log("worked two Cs") 
$("#quiz_result").html("Your dream c");
       $("#image6").show();
}
    
    
if ((total_result.match(/D/g) || []).length==3) { //answer all Ds
console.log("worked three ds") 
$("#quiz_result").html("Your dream d");
       $("#image6").show();
}

    
if ((total_result.match(/D/g) || []).length==2) { //answer is majority Ds
console.log("worked two Ds") 
$("#quiz_result").html("Your dream vacation d"); 
}
    

    
if ((total_result.match(/E/g) || []).length==3) { //answer all es
console.log("worked three Es") 
$("#quiz_result").html("Your dream E");
       $("#image6").show();
}
    

if ((total_result.match(/E/g) || []).length==2) { //answer is majority Es
console.log("worked two Es") 
$("#quiz_result").html("Your dream e");
       $("#image6").show();
}
    
    

if
(((total_result.match(/A/g) || []).length==1)&&((total_result.match(/B/g) || []).length==1)   ||                       ((total_result.match(/A/g) || []).length==1)&&((total_result.match(/C/g) || []).length==1) ||
((total_result.match(/A/g) || []).length==1)&&((total_result.match(/D/g) || []).length==1)  ||
((total_result.match(/A/g) || []).length==1)&&((total_result.match(/E/g) || []).length==1)  ||
((total_result.match(/B/g) || []).length==1)&&((total_result.match(/C/g) || []).length==1)  ||
((total_result.match(/B/g) || []).length==1)&&((total_result.match(/D/g) || []).length==1)  ||
((total_result.match(/B/g) || []).length==1)&&((total_result.match(/E/g) || []).length==1)  ||
((total_result.match(/C/g) || []).length==1)&&((total_result.match(/D/g) || []).length==1)  ||
((total_result.match(/C/g) || []).length==1)&&((total_result.match(/E/g) || []).length==1)  ||
((total_result.match(/D/g) || []).length==1)&&((total_result.match(/E/g) || []).length==1))
 
{ //answer is one each
console.log("worked one of each") 
$("#quiz_result").html("your flower is rose");  
}


    
    

$("#quiz").html("Take the quiz again!");
 $("#quiz").show()

}



$(document).ready(start);
