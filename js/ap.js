const toggleButton = document.getElementsByClassName('a')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () =>{
	navbarLinks.classList.toggle('active')
})