let wrapNav = document.querySelector('.wrap-nav');
let sidenav = document.querySelector('.nav-list');

wrapNav.onclick = function() {
    sidenav.classList.toggle('active');
}

function toggleSidebar() {
    document.querySelector('.nav-list').classList.toggle('active');
  }
