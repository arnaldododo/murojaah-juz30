function randomin(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function showloader() {
    document.getElementById('loading').style.display = 'block';
}

// Function to define innerHTML for HTML table
function show(data) {
    let wadah_audio = "<figure>" +
        "<figcaption></figcaption>" +
        "<audio controls autoplay src='" + data + "'>" +
        "Your browser does not support the" +
        "<code>audio</code> element." +
        "</audio>" +
        "</figure>";

    var audionya =
        document.getElementById("isi").innerHTML = wadah_audio;
}

function jawaban(data) {
    document.getElementById("jawabannya").innerHTML = data;
}

function datanya(data) {
    let datanya = "<p>Surah " + data.data.surah.englishName + " (" + data.data.surah.name + ")</p>" +
        "<p>Surah ke-" + data.data.surah.number + " (" + data.data.surah.revelationType + ")</p>" +
        "<p>Ayat ke-" + data.data.numberInSurah + ", dari " + data.data.surah.numberOfAyahs + " ayat.</p>" +
        "";
    document.getElementById("datanya").innerHTML = datanya;
}

// Defining async function
async function getaudio() {
    var ayat = randomin(5673, 6236);
    const api_url =
        "https://api.alquran.cloud/v1/ayah/" + ayat + "/ar.alafasy";

    // Storing response
    const response = await fetch(api_url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data.data.audio);
    datanya(data);

    let sambungannya = "";
    for (let i = 1; i < 4; i++) {
        const api = "https://api.alquran.cloud/v1/ayah/" + (ayat + i) + "/asad"
        const response = await fetch(api);
        const data = await response.json();
        sambungannya += data.data.text + '  &#1645;  ' + '<br>';
    }
    jawaban(sambungannya);
}
// Calling that async function
$(document).ready(function () {
    $("#mulai").click(function () {
        document.getElementById('infoawal').style.display = 'none';
        $('.multi-collapse').collapse('hide');
        showloader();
        getaudio();
    });
});