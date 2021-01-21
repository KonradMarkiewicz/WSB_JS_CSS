function createFactDiv(fact) {
    const div = document.createElement("div");
    div.innerText = fact;
    div.style.marginBottom = "20px";
    return div;
}

function generateFacts() {

    const animalType = document.getElementById("animalTypes").value;
    const factsNumber = document.getElementById("numberOfFacts").value;
    const factsDiv = document.getElementById("facts-div");

    factsDiv.innerHTML = "";

    axios.get("https://cat-fact.herokuapp.com/facts/random?amount=" + factsNumber + "&animal_type=" + animalType).then(response => {

        for (let i = 0; i < factsNumber; i++) {
            let number = i + 1;
            factsDiv.append("============= Fact about " + animalType + " number " + number + " =============" );

            const fact = createFactDiv(response.data[i].text);
            factsDiv.append(fact);
        }

    })
}

