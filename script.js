 var currentlyPlayingAudioPlayer = null;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function playSound(event, sound, containerTitle) {
    event.stopPropagation(); // Stop the event from propagating to the body

    // Pause the currently playing audio (if any)
    if (currentlyPlayingAudioPlayer) {
        currentlyPlayingAudioPlayer.pause();
    }

    var capitalizedTitle = capitalizeFirstLetter(containerTitle);
    var audioPlayer = document.getElementById('audioPlayer' + capitalizedTitle);
    var audioSource = document.getElementById('audioSource' + capitalizedTitle);

    if (audioPlayer && audioSource) {
        audioSource.src = 'sounds/' + sound + '.mp3';
        audioPlayer.load();
        audioPlayer.play();
        audioPlayer.loop = true; // Enable looping

        // Update the currently playing audio player
        currentlyPlayingAudioPlayer = audioPlayer;

        var container = document.querySelector('.container-' + containerTitle);
        if (container) {
            var selectSoundText = container.querySelector('.select-sound-text');
            var nowPlayingElement = document.getElementById('nowPlaying' + capitalizedTitle);

            if (selectSoundText && nowPlayingElement) {
                selectSoundText.style.visibility = 'hidden'; // Hide the "Select a sound to play" text
                nowPlayingElement.textContent = 'Now Playing: ' + capitalizeFirstLetter(sound); // Update the "Now Playing" message
                nowPlayingElement.style.visibility = 'visible'; // Make the "Now Playing" message visible
            }
        }
    }
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

document.getElementById('pageBody').addEventListener('click', function() {
    var containers = document.querySelectorAll('.container-nature, .container-city, .container-water');
    containers.forEach(function(container) {
        var nowPlayingElement = container.querySelector('.now-playing');
        if (nowPlayingElement) {
            nowPlayingElement.textContent = 'Select a sound to play'; // Update the text content
        }
    });

    // Pause the currently playing audio (if any)
    if (currentlyPlayingAudioPlayer) {
        currentlyPlayingAudioPlayer.pause();
    }
});
