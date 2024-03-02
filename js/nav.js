document.addEventListener('DOMContentLoaded', function() {
    var navbarMenu = document.getElementById('navbarMenu');
    var menuIcon = document.querySelector('.menu-icon');

    menuIcon.addEventListener('click', function() {
        navbarMenu.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        var isClickInside = navbarMenu.contains(event.target) || menuIcon.contains(event.target);

        if (!isClickInside && navbarMenu.classList.contains('open')) {
            navbarMenu.classList.remove('open');
        }
    });
});
