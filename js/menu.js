const toggleButton = document.getElementsByClassName('toggle')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () =>{
	navbarLinks.classList.toggle('active')
})

const anchorBreakfast = document.getElementsByClassName('r')[0]
const breakfast = document.getElementsByClassName('breakfast')[0]

anchorBreakfast.addEventListener('click', () =>{
	breakfast.classList.toggle('active')
})