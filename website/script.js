window.addEventListener('load', () => {
    document.body.style.opacity = 1;
});

const slides = document.querySelectorAll('.slide'); // Taking an array of slides
const mediaQuery = window.matchMedia("(min-width: 1366px) and (min-height: 768px)");
var firstResize = true;
var gameInitialized = false;
var theme = document.getElementById('theme_song');
var currentSlide = 0; // Initializing by the first slide

// Function to change to next slide
function changeSlide() 
{

    slides[currentSlide].classList.remove('active');
    
    setTimeout(() => 
    {
        currentSlide++;
        console.log('Estou no slide ', currentSlide);

        if (currentSlide == 2)
            {
                theme.play();
    
                if (window.innerWidth >= 1366 && window.innerHeight >= 768)
                {
                    theme.volume = 0.2;
                }
    
                else
                {
                    theme.volume = 0;
                }

                slides[currentSlide].classList.add('active');

                return;
            }
        
        else if (currentSlide > 2 && gameInitialized == true) // If the game was initialized:
        {
            // Show slide game screens
            theme.volume = 0.02;
            slides[currentSlide].classList.add('active');
            setTimeout(changeSlide, 4000);
            return;
        }

        else if (currentSlide < slides.length)
        {
            slides[currentSlide].classList.add('active');

            if (currentSlide < slides.length - 1) // If it's not the last one:
            {
                setTimeout(changeSlide, 4000); // Change slide again
            }
        }
    }, 1000); // espera 1 segundo para terminar fade-out antes de trocar
}

// Checando se ao abrir o site, o dispositivo contém o tamanho mínimo
if (mediaQuery.matches)
{
    setTimeout(changeSlide, 4000); // Se sim, exibir conteúdo!
    userHasMinScreenSize = true; // User opened the website with a device with min screen size
    firstResize = false; 
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1366 && window.innerHeight >= 768)
    {
        userHasMinScreenSize = true;
        if (userHasMinScreenSize && firstResize)
        {
            setTimeout(changeSlide, 4000); 
            firstResize = false;
        }

        document.body.style.opacity = 1;
        const theme = document.getElementById('theme_song');

        if (gameInitialized)
        {
            theme.volume = 0.02;
        }

        else
        {
            theme.volume = 0.2;
        }
    }

    else
    {
        const theme = document.getElementById('theme_song');
        theme.volume = 0;

        const smallscreen = document.querySelector('span h1');
        smallscreen.textContent = 'Por favor, redimensione sua tela para pelo menos 1366x768.';
    }
});

function startGame()
{
    document.body.style.backgroundImage = "url(img/background2.png)";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    console.log("Game started!");
    const startButton = document.querySelector('.background > button'); // seleciona o botão
    startButton.disabled = true;
    gameInitialized = true;
    setTimeout(changeSlide, 1200);
}
