var houses = {
    "Gryffindor": [],
    "Slytherin": [],
    "Ravenclaw": [],
    "Hufflepuff": [],
    "Dumbledore's Army": []
};

var HOUSE = {
        1: "Gryffindor",
        2: "Slytherin",
        3: "Ravenclaw",
        4: "Hufflepuff",
        5: "Dumbloedore's Army"
    }

$( document ).ready(function() 
{
	// Variable declarations
	var studentCount;
	var countIsOdd;
	var fourthOfStudents;
	var countDiv;
	var sortButton;
	var countButton;

	studentCount = 0;

	// get count div
	countDiv = document.getElementById("count");

	// get count button and create click event
	countButton = document.getElementById("set_student_count");

	// get sort button
	sortButton = document.getElementById("sort_student");
	sortButton.disabled = true;

	countButton.addEventListener("click", function() {
	    // clear houses for new sorting!
	    for (var i = 1; i <= 5; i++)
	    {
	        houses[HOUSE[i]] = [];
	    }

	    // get user input for count value
	    var countValue = document.getElementById("student_count").value;
	    if (!countValue || countValue == NaN)
	    {
	        countValue = 0;
	    }
	    // set new value for global studentCount based on input
	    studentCount = countValue;

	    // did user input odd number of students?
	    countIsOdd = (studentCount % 2 != 0)
	    fourthOfStudents = Math.floor(studentCount/4);

	    // Display new value of studentCount in the div
	    countDiv.innerHTML = "Count: " + studentCount;

	    // reset student_count input field
	    countValue.value = 0;

	    if (studentCount > 0)
	    {
	        sortButton.disabled = false;
	    }
	});


	sortButton.addEventListener("click", function() {
	    // get student name
	    var studentName = document.getElementById("student_name").value

	    // sort student into a house
	    var studentHouse = assignHouse(studentName);
	    // Dumbledore's Army?
	    dumbledore(studentName);

	    // Display student and house
	    var sortedDiv = document.getElementById("sorted_student");
	    sortedDiv.innerHTML = studentName + ": " + studentHouse + "!"

	    // decrement student Count
	    studentCount--;

	    // update display of students left to sort
	    countDiv.innerHTML = "Students to sort: " + studentCount;

	    // Check if all students are sorted
	    if (studentCount == 0)
	    {
	        // disable sort button when all students are sorted
	        sortButton.disabled = true;
	    } 
	});
});


function assignHouse(studentName)
{
    // randomly assign student to a house
    houseNum = Math.floor((Math.random() * 4) + 1);
    // check if house is full, if so, try again!
    if (isFull(HOUSE[houseNum]))
            {
                assignHouse(studentName);
            }
    else
    {
        switch (houseNum) 
        {
            case 1: // Gryffindor
                houses[HOUSE[1]].push(studentName);
                break;
            case 2: // Slytherin
                houses[HOUSE[2]].push(studentName);
                break;
            case 3: // Ravenclaw
                houses[HOUSE[3]].push(studentName);
                break;
            case 4: // Hufflepuff
                houses[HOUSE[4]].push(studentName);
                break;
        }
        console.log(HOUSE[houseNum] + ": " + houses[HOUSE[houseNum]]);
        // return name of house student was sorted into
        return HOUSE[houseNum];
    } 
}

function isFull(houseName)
{
    if (houses[houseName].length >= fourthOfStudents)
    {
        // if odd number students, one house gets one more than others
        // update countIsOdd, so other houses don't get extra students
        if (countIsOdd)
        {
            countIsOdd = false;
            return false;
        }
        return true;
    }
    return false;
}

function dumbledore(studentName)
{
	if (Math.floor((Math.random() * 2) + 1) == 2)
	{
		houses["Dumbledore's Army"].push(studentName);
		console.log(studentName + " added to DA");
	}
}