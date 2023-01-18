const dogURL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
    fetch(dogURL)
        .then(resp => resp.json())
        .then(data => renderDogs(data))

})

function renderDogs(dogs) {
    const tableBody = document.getElementById('table-body')
    dogs.forEach(element => {
        const tr = document.createElement('tr')
        const name = document.createElement('td')
        const breed = document.createElement('td')
        const sex = document.createElement('td')
        const buttonObj = document.createElement('td')
        const button = document.createElement('button')

        tr.id = element.id

        button.textContent = 'Edit Dog'
        button.addEventListener('click', () => {
            editDog(element)
        })
        buttonObj.appendChild(button)

        name.textContent = element.name
        breed.textContent = element.breed
        sex.textContent = element.sex

        tr.appendChild(name)
        tr.appendChild(breed)
        tr.appendChild(sex)
        tr.appendChild(buttonObj)

        tableBody.appendChild(tr)

    })
}

function editDog(dog) {
    const form = document.getElementById('dog-form')
    const name = form.elements['name']
    const breed = form.elements['breed']
    const sex = form.elements['sex']

    name.value = dog.name
    breed.value = dog.breed
    sex.value = dog.sex

    form.addEventListener('submit', event => {
        event.preventDefault()

        const updateObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                breed: breed.value,
                sex: sex.value
            })
        }

        fetch(`${dogURL}/${dog.id}`, updateObj)
            .then(resp => resp.json())
            .then(data => {
                const tr = document.getElementById(data.id)
                tr.children[0].textContent = data.name
                tr.children[1].textContent = data.breed
                tr.children[2].textContent = data.sex
            })
    })


}