document.addEventListener('DOMContentLoaded', () => {
    
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => {
       data.forEach(animal => createAnimalRow(animal))
    })
})

function createAnimalRow(animal) {
    const animalTable = document.getElementById("table-body")
    const row = document.createElement("tr") 
    animalTable.appendChild(row)

    const nameCell = document.createElement("td")
    nameCell.innerText = `${animal.name}`

    const breedCell = document.createElement("td")
    breedCell.innerText = `${animal.breed}`

    const sexCell = document.createElement("td")
    sexCell.innerText = `${animal.sex}`

    const editCell = document.createElement("td")
    const editButton = document.createElement('button')
    editButton.innerText = "Edit Dog"
    editButton.addEventListener("click", () => editAnimal(animal))
    editCell.appendChild(editButton)
    
    row.appendChild(nameCell)
    row.appendChild(breedCell)
    row.appendChild(sexCell)
    row.appendChild(editCell)
}


function editAnimal(animal) {
    const nameInput = document.querySelector('input[name="name"]');
    const breedInput = document.querySelector('input[name="breed"]')
    const sexInput = document.querySelector('input[name="sex"]')
    let form = document.querySelector("#dog-form")
    form.addEventListener("submit", () => {
        updateAnimal(animal)
    })
        
    
    if (nameInput || breedInput || sexInput) {
       
        nameInput.value = animal.name;
        breedInput.value = animal.breed;
        sexInput.value = animal.sex
    } else {
        console.error("Name input element not found");
    }

    
}

function updateAnimal(animal){
    const nameInput = document.querySelector('input[name="name"]');
    const breedInput = document.querySelector('input[name="breed"]')
    const sexInput = document.querySelector('input[name="sex"]')

    const updatedName = nameInput.value
    const updatedBreed = breedInput.value
    const updatedSex = sexInput.value
        
    fetch(`http://localhost:3000/dogs/${animal.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: updatedName,
            breed: updatedBreed,
            sex: updatedSex
        })
    })
}
