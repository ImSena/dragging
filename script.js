const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

cards.forEach(card => {
    card.addEventListener('dragstart', dragstart);
    card.addEventListener('drag', drag);
    card.addEventListener('dragend', dragend);
});

function dragstart(){
    console.log('comecou')
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'))
    this.classList.add('is-dragging');
}

function drag(){
    
}

function dragend(){
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));
    this.classList.remove('is-dragging');
}

dropzones.forEach(dropzone =>{
    dropzone.addEventListener('dragenter', dragenter);
    dropzone.addEventListener('dragover', dragover);
    dropzone.addEventListener('dragleave', dragleave);
    dropzone.addEventListener('drop', drop);
})

function dragenter(){

}

function dragover(event){
    event.preventDefault();
    this.classList.add('zoneover');

    const cardDragging = document.querySelector('.is-dragging');

    this.appendChild(cardDragging);
}

function drop() {
    const cardDragging = document.querySelector('.is-dragging');
    const currentDropzone = this;

    if (currentDropzone.children.length === 0) {
        currentDropzone.appendChild(cardDragging);
    } else {
        // Pega o elemento existente na dropzone atual
        const existingCard = currentDropzone.children[0];
        
        // Encontra o índice da dropzone atual
        const currentIndex = Array.from(dropzones).indexOf(currentDropzone);

        // Move o elemento existente para a próxima dropzone (se houver)
        for (let i = currentIndex; i < dropzones.length; i++) {
            if (dropzones[i + 1] && dropzones[i + 1].children.length === 0) {
                dropzones[i + 1].appendChild(existingCard);
                break;
            } else if (dropzones[i + 1]) {
                // Se a próxima dropzone também estiver cheia, continue movendo
                const tempCard = dropzones[i + 1].children[0];
                dropzones[i + 1].appendChild(existingCard);
                existingCard = tempCard;
            }
        }

        // Adiciona o novo elemento na dropzone atual
        currentDropzone.appendChild(cardDragging);
    }

    currentDropzone.classList.remove('zoneover');
}

function dragleave(){
    this.classList.remove('zoneover');
}