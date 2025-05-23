window.addEventListener('load', () => {
    document.body.style.opacity = 1;
});

const slides = document.querySelectorAll('.slide'); // Taking an array of slides
const mediaQuery = window.matchMedia("(min-width: 1366px) and (min-height: 768px)");
var firstResize = true;
var gameInitialized = false;
var theme = document.getElementById('theme_song');
var narration = document.querySelectorAll('.narration'); // Taking an array of narration audios
var narrationIndex = 0;
var cutscenes = document.querySelectorAll('.cutscene');
var cutsceneIndex = 0;
var isFirstScreen = true;
var currentSlide = 0; // Initializing by the first slide

const canvas = document.getElementById('battleCanvas');
var canvasWidth = canvas.offsetWidth;

// Function to change to next slide
function changeSlide() 
{

    slides[currentSlide].classList.remove('active');
    
    setTimeout(() => 
    {
        currentSlide++;

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
        
        else if (gameInitialized == true) // If the game was initialized:
        {
            theme.volume = 0.02;
            slides[currentSlide].classList.add('active');
            
            if (narrationIndex <= 2)
            {
                narration[narrationIndex].play();
                narrationIndex++;
            }

            if (isFirstScreen)
            {
                setTimeout(changeSlide, 4000);  
                isFirstScreen = false;
            }
            
            else if (currentSlide == 6)
            {
                console.log('Tela da cutscene');
                cutscenes[cutsceneIndex].play();

                setTimeout(changeSlide, 19000)
            }

            else if (currentSlide == 7) // Tela da batalha
            {
                console.log("Hora do jogo");
            }

            else
            {
                setTimeout(changeSlide, 7300);
            }
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

        canvasWidth = canvas.offsetWidth;
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

    const startButton = document.querySelector('.background > button');
    startButton.disabled = true; // The user can't click more than one time

    gameInitialized = true;
    setTimeout(changeSlide, 1000);
}

var playerX = (window.innerWidth / 2); // It will start with 50% of screen width (Centered)
const speed = 10;
const player = document.getElementById('player');

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerX > 0)
    {
      playerX -= speed;
    }
    else if (e.key === 'ArrowRight' && playerX < canvasWidth - 41)
    {
      playerX += speed;
    }
    player.style.left = playerX + 'px';
});

setInterval(() => { // Refreshing the enemy's position each 2 seconds
    enemy.style.left = playerX + 'px';
}, 2000);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createEnemyProjectile() {
    const projectile = document.createElement('div');
    projectile.classList.add('projectile');

    let projectileRandom = getRandomInt(5, 80);
    projectile.style.left = (enemy.offsetLeft + projectileRandom) + 'px';
    projectile.style.top = (enemy.offsetTop + 120) + 'px';
    canvas.appendChild(projectile);
  
    const interval = setInterval(() => {
      const top = parseInt(projectile.style.top);
      if (top > 1080) {
        projectile.remove();
        clearInterval(interval);
      } else {
        projectile.style.top = (top + 5) + 'px';
  
        // Colision with player
        const projLeft = projectile.offsetLeft;
        const projTop = projectile.offsetTop;
        const playerLeft = player.offsetLeft;
        const playerTop = player.offsetTop;
  
        if (
          projLeft < playerLeft + 40 &&
          projLeft + 8 > playerLeft &&
          projTop < playerTop + 40 &&
          projTop + 20 > playerTop
        ) {
          clearInterval(interval);
          projectile.remove();
        }
      }
    }, 16);
  }
  
  // Shoot each 2 seconds
  setInterval(createEnemyProjectile, 800);