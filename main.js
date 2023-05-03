const addBookBtn = document.getElementById("addBookBtn");
const popUp = document.getElementById("popUp");
const closePopUp = document.getElementsByTagName('span')[0];

addBookBtn.addEventListener('click', () => {
    //popUp.style.display = 'flex';
    popUp.style.transform = "scale(1)";
});

closePopUp.addEventListener('click', () => {
    //popUp.style.display = 'none';
    popUp.style.transform = "scale(0)";
})

