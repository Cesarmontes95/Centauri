var numOfStars = 100;

var stars = [];

function GenerateGalaxy() {
  stars = [];
  $("div.star").remove();

  for (var i = 0; i < numOfStars; i++) {
    var newStarInfo = GenerateStar();

    var star = {
      type: newStarInfo[0],
      color: newStarInfo[1],
      cssColor: newStarInfo[2],
      temperature: newStarInfo[3],
      mass: newStarInfo[4],
      radius: newStarInfo[5],
      luminosity: newStarInfo[6],
      typeDesc: newStarInfo[7],
      colorDesc: newStarInfo[8],
      tempDesc: newStarInfo[9],
      massDesc: newStarInfo[10],
      radiusDesc: newStarInfo[11],
      lumiDesc: newStarInfo[12]
    };

    stars.push(star);

    var posLeft = Math.floor(Math.random() * $(window).width() - 3);
    var posTop = Math.floor(Math.random() * $(window).height() - 3);

    $(".frame").append(
      "<div class='star " +
        stars[i].cssColor +
        "' id='" +
        i +
        "' style='left:" +
        posLeft +
        "px; top:" +
        posTop +
        "px;' onClick='OpenPanel(this.id)'></div>"
    );
  }
}

$(document).ready(GenerateGalaxy());

var showing = false;

function OpenPanel(id) {
  showing = !showing;
  if (showing) {
    $("#sun").removeClass();
    $("#sun").addClass("sun");
    $("#sun").addClass(stars[id].cssColor);

    $(".starType").text(stars[id].type);
    $(".starColor").text(stars[id].color);
    $(".starTemperature").text(stars[id].temperature + " K");
    $(".starMass").text(stars[id].mass + " M⊙︎");
    $(".starRadius").text(stars[id].radius + " R⊙︎");
    $(".starLumi").text(stars[id].luminosity + " L⊙︎");

    $("#typeInfo").text(stars[id].typeDesc);
    $("#colorInfo").text(stars[id].colorDesc);
    $("#tempInfo").text(stars[id].tempDesc);
    $("#massInfo").text(stars[id].massDesc);
    $("#radiusInfo").text(stars[id].radiusDesc);
    $("#lumiInfo").text(stars[id].lumiDesc);

    $(".frame").addClass("blur");
    $("#sidePanelInfo").css("z-index", "2");
    $("#sidePanel").css({ top: "2%", opacity: "1" });
  } else {
    RemoveActiveClasses();
    HideAllInfoPanels();
    $(".frame").removeClass("blur");
    $("#sidePanelInfo").css("z-index", "-2");
    $("#sidePanel").css({ top: "-5%", opacity: "0" });
  }
}

function GenerateStar() {
  var type;
  var color;
  var cssColor;
  var temperature;
  var mass;
  var radius;
  var luminosity;
  var typeDesc;
  var colorDesc;
  var tempDesc;
  var massDesc;
  var radiusDesc;
  var lumiDesc;

  var typePercent = Math.floor(Math.random() * 10000);
  if (typePercent == 1) {
    type = "O";
    color = "Blue";
    cssColor = "blue";
    temperature = Math.floor(Math.random() * (50000 - 30000)) + 30000;
    mass = (Math.floor(Math.random() * (2300 - 1600)) + 1600) / 100;
    radius = (Math.floor(Math.random() * (1000 - 660)) + 660) / 100;
    luminosity = (Math.floor(Math.random() * (5000000 - 3000000)) + 3000000) / 100;
    typeDesc =
      "Wow! You found an O-type star. O-type stars are very hot and extremely luminous, with most of their radiated output in the ultraviolet range. These are the rarest of all main-sequence stars. About 1 in 3,000,000 (0.00003%) of the main-sequence stars in the solar neighborhood are O-type stars. Some of the most massive stars lie within this spectral class. O-type stars frequently have complicated surroundings that make measurement of their spectra difficult.";
    colorDesc =
      "Vega-relative chromaticity: An objective specification of the quality of a color regardless of its luminance. Chromaticity consists of two independent parameters, often specified as hue (h) and colorfulness (s), where the latter is alternatively called saturation, chroma, intensity,[1] or excitation purity. This number of parameters follows from trichromacy of vision of most humans, which is assumed by most models in color science.";
    tempDesc =
      "The effective temperature of a body such as a star or planet is the temperature of a black body that would emit the same total amount of electromagnetic radiation. Effective temperature is often used as an estimate of a body's surface temperature when the body's emissivity curve (as a function of wavelength) is not known. The effective temperature of our Sun is around 5780 K. Stars have a decreasing temperature gradient, going from their central core up to the atmosphere. The core temperature of the Sun—the temperature at the centre of the Sun where nuclear reactions take place—is estimated to be 15,000,000 K. \n\nThis star has a temperature of " +
      temperature +
      "K. That is about " +
      Math.round(temperature / 5780 * 100) / 100 +
      " times the temperature of the Sun.";
    massDesc =
      "The solar mass (M☉) is a standard unit of mass in astronomy, equal to approximately 2×10^30 kg. It is used to indicate the masses of other stars, as well as clusters, nebulae, and galaxies. It is equal to the mass of the Sun (denoted by the solar symbol ⊙︎). This equates to about two nonillion (two quintillion in the long scale) kilograms.\nThis star has a mass of " +
      mass +
      "M☉, which means it is " +
      mass +
      " times the mass of our sun.";
    radiusDesc =
      "Solar radius is a unit of distance used to express the size of stars in astronomy relative to the Sun. Therefore, the Sun's solar radius is 1 R⊙︎. 1 R⊙︎ is equal to about 695,700 kilometres (432,300 miles). This is approximately 10 times the average radius of Jupiter, about 109 times the radius of the Earth, and 1/215th of an astronomical unit, the distance of the Earth from the Sun. It varies slightly from pole to equator due to its rotation, which induces an oblateness in the order of 10 parts per million.\n\nThe radius of this star is about " +
      Math.round(radius * 659700) +
      "km.";
    lumiDesc =
      "Absolute magnitude is a measure of the luminosity of a celestial object, on a logarithmic astronomical magnitude scale. An object's absolute magnitude is defined to be equal to the apparent magnitude that the object would have if it were viewed from a distance of exactly 10 parsecs (32.6 light-years), with no extinction (or dimming) of its light due to absorption by interstellar dust particles. By hypothetically placing all objects at a standard reference distance from the observer, their luminosities can be directly compared on a magnitude scale.";
  } else if (typePercent > 1 && typePercent <= 14) {
    type = "B";
    color = "Blue White";
    cssColor = "blueWhite";
    temperature = Math.floor(Math.random() * (30000 - 10000)) + 10000;
    mass = (Math.floor(Math.random() * (1600 - 210)) + 210) / 100;
    radius = (Math.floor(Math.random() * (660 - 180)) + 180) / 100;
    luminosity = (Math.floor(Math.random() * (30000 - 2500)) + 2500) / 100;
    typeDesc =
      "B-type stars are very luminous and blue. As O- and B-type stars are so energetic, they only live for a relatively short time. Thus, due to the low probability of kinematic interaction during their lifetime, they are unable to stray far from the area in which they formed. About 1 in 800 (0.125%) of the main-sequence stars in the solar neighborhood are B-type main-sequence stars.";
    colorDesc =
      "Vega-relative chromaticity: An objective specification of the quality of a color regardless of its luminance. Chromaticity consists of two independent parameters, often specified as hue (h) and colorfulness (s), where the latter is alternatively called saturation, chroma, intensity,[1] or excitation purity. This number of parameters follows from trichromacy of vision of most humans, which is assumed by most models in color science.";
    tempDesc =
      "The effective temperature of a body such as a star or planet is the temperature of a black body that would emit the same total amount of electromagnetic radiation. Effective temperature is often used as an estimate of a body's surface temperature when the body's emissivity curve (as a function of wavelength) is not known. The effective temperature of our Sun is around 5780 K. Stars have a decreasing temperature gradient, going from their central core up to the atmosphere. The core temperature of the Sun—the temperature at the centre of the Sun where nuclear reactions take place—is estimated to be 15,000,000 K. \n\nThis star has a temperature of " +
      temperature +
      "K. That is about " +
      Math.round(temperature / 5780 * 100) / 100 +
      " times the temperature of the Sun.";
    massDesc =
      "The solar mass (M☉) is a standard unit of mass in astronomy, equal to approximately 2×10^30 kg. It is used to indicate the masses of other stars, as well as clusters, nebulae, and galaxies. It is equal to the mass of the Sun (denoted by the solar symbol ⊙︎). This equates to about two nonillion (two quintillion in the long scale) kilograms.\n\nThis star has a mass of " +
      mass +
      " M☉, which means it is " +
      mass +
      " times the mass of our sun.";
    radiusDesc =
      "Solar radius is a unit of distance used to express the size of stars in astronomy relative to the Sun. Therefore, the Sun's solar radius is 1 R⊙︎. 1 R⊙︎ is equal to about 695,700 kilometres (432,300 miles). This is approximately 10 times the average radius of Jupiter, about 109 times the radius of the Earth, and 1/215th of an astronomical unit, the distance of the Earth from the Sun. It varies slightly from pole to equator due to its rotation, which induces an oblateness in the order of 10 parts per million.\n\nThe radius of this star is about " +
      Math.round(radius * 659700) +
      "km.";
    lumiDesc =
      "Absolute magnitude is a measure of the luminosity of a celestial object, on a logarithmic astronomical magnitude scale. An object's absolute magnitude is defined to be equal to the apparent magnitude that the object would have if it were viewed from a distance of exactly 10 parsecs (32.6 light-years), with no extinction (or dimming) of its light due to absorption by interstellar dust particles. By hypothetically placing all objects at a standard reference distance from the observer, their luminosities can be directly compared on a magnitude scale.";
  } else if (typePercent > 14 && typePercent <= 74) {
    type = "A";
    color = "White";
    cssColor = "white";
    temperature = Math.floor(Math.random() * (10000 - 7500)) + 7500;
    mass = (Math.floor(Math.random() * (210 - 140)) + 140) / 100;
    radius = (Math.floor(Math.random() * (180 - 140)) + 140) / 100;
    luminosity = (Math.floor(Math.random() * (2500 - 500)) + 500) / 100;
    typeDesc =
      "A-type stars are among the more common naked eye stars, and are white or bluish-white. About 1 in 160 (0.625%) of the main-sequence stars in the solar neighborhood are A-type stars";
    colorDesc =
      "Vega-relative chromaticity: An objective specification of the quality of a color regardless of its luminance. Chromaticity consists of two independent parameters, often specified as hue (h) and colorfulness (s), where the latter is alternatively called saturation, chroma, intensity,[1] or excitation purity. This number of parameters follows from trichromacy of vision of most humans, which is assumed by most models in color science.";
    tempDesc =
      "The effective temperature of a body such as a star or planet is the temperature of a black body that would emit the same total amount of electromagnetic radiation. Effective temperature is often used as an estimate of a body's surface temperature when the body's emissivity curve (as a function of wavelength) is not known. The effective temperature of our Sun is around 5780 K. Stars have a decreasing temperature gradient, going from their central core up to the atmosphere. The core temperature of the Sun—the temperature at the centre of the Sun where nuclear reactions take place—is estimated to be 15,000,000 K. \n\nThis star has a temperature of " +
      temperature +
      "K. That is about " +
      Math.round(temperature / 5780 * 100) / 100 +
      " times the temperature of the Sun.";
    massDesc =
      "The solar mass (M☉) is a standard unit of mass in astronomy, equal to approximately 2×10^30 kg. It is used to indicate the masses of other stars, as well as clusters, nebulae, and galaxies. It is equal to the mass of the Sun (denoted by the solar symbol ⊙︎). This equates to about two nonillion (two quintillion in the long scale) kilograms.\n\nThis star has a mass of " +
      mass +
      " M☉, which means it is " +
      mass +
      " times the mass of our sun.";
    radiusDesc =
      "Solar radius is a unit of distance used to express the size of stars in astronomy relative to the Sun. Therefore, the Sun's solar radius is 1 R⊙︎. 1 R⊙︎ is equal to about 695,700 kilometres (432,300 miles). This is approximately 10 times the average radius of Jupiter, about 109 times the radius of the Earth, and 1/215th of an astronomical unit, the distance of the Earth from the Sun. It varies slightly from pole to equator due to its rotation, which induces an oblateness in the order of 10 parts per million.\n\nThe radius of this star is about " +
      Math.round(radius * 659700) +
      "km.";
    lumiDesc =
      "Absolute magnitude is a measure of the luminosity of a celestial object, on a logarithmic astronomical magnitude scale. An object's absolute magnitude is defined to be equal to the apparent magnitude that the object would have if it were viewed from a distance of exactly 10 parsecs (32.6 light-years), with no extinction (or dimming) of its light due to absorption by interstellar dust particles. By hypothetically placing all objects at a standard reference distance from the observer, their luminosities can be directly compared on a magnitude scale.";
  } else if (typePercent > 74 && typePercent <= 374) {
    type = "F";
    color = "Yellow White";
    cssColor = "yellowWhite";
    temperature = Math.floor(Math.random() * (7500 - 6000)) + 6000;
    mass = (Math.floor(Math.random() * (140 - 104)) + 104) / 100;
    radius = (Math.floor(Math.random() * (140 - 115)) + 115) / 100;
    luminosity = (Math.floor(Math.random() * (500 - 150)) + 150) / 100;
    typeDesc =
      "F-type stars are white in color. About 1 in 33 (3.03%) of the main-sequence stars in the solar neighborhood are F-type stars";
    colorDesc =
      "Vega-relative chromaticity: An objective specification of the quality of a color regardless of its luminance. Chromaticity consists of two independent parameters, often specified as hue (h) and colorfulness (s), where the latter is alternatively called saturation, chroma, intensity,[1] or excitation purity. This number of parameters follows from trichromacy of vision of most humans, which is assumed by most models in color science.";
    tempDesc =
      "The effective temperature of a body such as a star or planet is the temperature of a black body that would emit the same total amount of electromagnetic radiation. Effective temperature is often used as an estimate of a body's surface temperature when the body's emissivity curve (as a function of wavelength) is not known. The effective temperature of our Sun is around 5780 K. Stars have a decreasing temperature gradient, going from their central core up to the atmosphere. The core temperature of the Sun—the temperature at the centre of the Sun where nuclear reactions take place—is estimated to be 15,000,000 K. \n\nThis star has a temperature of " +
      temperature +
      "K. That is about " +
      Math.round(temperature / 5780 * 100) / 100 +
      " times the temperature of the Sun.";
    massDesc =
      "The solar mass (M☉) is a standard unit of mass in astronomy, equal to approximately 2×10^30 kg. It is used to indicate the masses of other stars, as well as clusters, nebulae, and galaxies. It is equal to the mass of the Sun (denoted by the solar symbol ⊙︎). This equates to about two nonillion (two quintillion in the long scale) kilograms.\n\nThis star has a mass of " +
      mass +
      " M☉, which means it is " +
      mass +
      " times the mass of our sun.";
    radiusDesc =
      "Solar radius is a unit of distance used to express the size of stars in astronomy relative to the Sun. Therefore, the Sun's solar radius is 1 R⊙︎. 1 R⊙︎ is equal to about 695,700 kilometres (432,300 miles). This is approximately 10 times the average radius of Jupiter, about 109 times the radius of the Earth, and 1/215th of an astronomical unit, the distance of the Earth from the Sun. It varies slightly from pole to equator due to its rotation, which induces an oblateness in the order of 10 parts per million.\n\nThe radius of this star is about " +
      Math.round(radius * 659700) +
      "km.";
    lumiDesc =
      "Absolute magnitude is a measure of the luminosity of a celestial object, on a logarithmic astronomical magnitude scale. An object's absolute magnitude is defined to be equal to the apparent magnitude that the object would have if it were viewed from a distance of exactly 10 parsecs (32.6 light-years), with no extinction (or dimming) of its light due to absorption by interstellar dust particles. By hypothetically placing all objects at a standard reference distance from the observer, their luminosities can be directly compared on a magnitude scale.";
  } else if (typePercent > 374 && typePercent <= 1134) {
    type = "G";
    color = "Yellow";
    cssColor = "yellow";
    temperature = Math.floor(Math.random() * (6000 - 5200)) + 5200;
    mass = (Math.floor(Math.random() * (104 - 80)) + 80) / 100;
    radius = (Math.floor(Math.random() * (115 - 96)) + 96) / 100;
    luminosity = (Math.floor(Math.random() * (150 - 60)) + 60) / 100;
    typeDesc =
      "Our sun is G-type star. Class G main-sequence stars make up about 7.5%, nearly one in thirteen, of the main-sequence stars in the solar neighborhood. Class G contains the 'Yellow Evolutionary Void'. Supergiant stars often swing between O or B (blue) and K or M (red). While they do this, they do not stay for long in the yellow supergiant G class, as this is an extremely unstable place for a supergiant to be.";
    colorDesc =
      "Vega-relative chromaticity: An objective specification of the quality of a color regardless of its luminance. Chromaticity consists of two independent parameters, often specified as hue (h) and colorfulness (s), where the latter is alternatively called saturation, chroma, intensity,[1] or excitation purity. This number of parameters follows from trichromacy of vision of most humans, which is assumed by most models in color science.";
    tempDesc =
      "The effective temperature of a body such as a star or planet is the temperature of a black body that would emit the same total amount of electromagnetic radiation. Effective temperature is often used as an estimate of a body's surface temperature when the body's emissivity curve (as a function of wavelength) is not known. The effective temperature of our Sun is around 5780 K. Stars have a decreasing temperature gradient, going from their central core up to the atmosphere. The core temperature of the Sun—the temperature at the centre of the Sun where nuclear reactions take place—is estimated to be 15,000,000 K. \n\nThis star has a temperature of " +
      temperature +
      "K. That is about " +
      Math.round(temperature / 5780 * 100) / 100 +
      " times the temperature of the Sun.";
    massDesc =
      "The solar mass (M☉) is a standard unit of mass in astronomy, equal to approximately 2×10^30 kg. It is used to indicate the masses of other stars, as well as clusters, nebulae, and galaxies. It is equal to the mass of the Sun (denoted by the solar symbol ⊙︎). This equates to about two nonillion (two quintillion in the long scale) kilograms.\n\nThis star has a mass of " +
      mass +
      " M☉, which means it is " +
      mass +
      " times the mass of our sun.";
    radiusDesc =
      "Solar radius is a unit of distance used to express the size of stars in astronomy relative to the Sun. Therefore, the Sun's solar radius is 1 R⊙︎. 1 R⊙︎ is equal to about 695,700 kilometres (432,300 miles). This is approximately 10 times the average radius of Jupiter, about 109 times the radius of the Earth, and 1/215th of an astronomical unit, the distance of the Earth from the Sun. It varies slightly from pole to equator due to its rotation, which induces an oblateness in the order of 10 parts per million.\n\nThe radius of this star is about " +
      Math.round(radius * 659700) +
      "km.";
    lumiDesc =
      "Absolute magnitude is a measure of the luminosity of a celestial object, on a logarithmic astronomical magnitude scale. An object's absolute magnitude is defined to be equal to the apparent magnitude that the object would have if it were viewed from a distance of exactly 10 parsecs (32.6 light-years), with no extinction (or dimming) of its light due to absorption by interstellar dust particles. By hypothetically placing all objects at a standard reference distance from the observer, their luminosities can be directly compared on a magnitude scale.";
  } else if (typePercent > 1134 && typePercent <= 2334) {
    type = "K";
    color = "Yellow Orange";
    cssColor = "yellowOrange";
    temperature = Math.floor(Math.random() * (5200 - 3700)) + 3700;
    mass = (Math.floor(Math.random() * (80 - 45)) + 45) / 100;
    radius = (Math.floor(Math.random() * (96 - 70)) + 70) / 100;
    luminosity = (Math.floor(Math.random() * (60 - 8)) + 8) / 100;
    typeDesc =
      "K-type stars are orangish stars that are slightly cooler than the Sun. They make up about 12% of the main-sequence stars in the solar neighborhood. There are also giant K-type stars, which range from hypergiants like RW Cephei, to giants and supergiants, such as Arcturus, whereas orange dwarfs, like Alpha Centauri B, are main-sequence stars.";
    colorDesc =
      "Vega-relative chromaticity: An objective specification of the quality of a color regardless of its luminance. Chromaticity consists of two independent parameters, often specified as hue (h) and colorfulness (s), where the latter is alternatively called saturation, chroma, intensity,[1] or excitation purity. This number of parameters follows from trichromacy of vision of most humans, which is assumed by most models in color science.";
    tempDesc =
      "The effective temperature of a body such as a star or planet is the temperature of a black body that would emit the same total amount of electromagnetic radiation. Effective temperature is often used as an estimate of a body's surface temperature when the body's emissivity curve (as a function of wavelength) is not known. The effective temperature of our Sun is around 5780 K. Stars have a decreasing temperature gradient, going from their central core up to the atmosphere. The core temperature of the Sun—the temperature at the centre of the Sun where nuclear reactions take place—is estimated to be 15,000,000 K. \n\nThis star has a temperature of " +
      temperature +
      "K. That is about " +
      Math.round(temperature / 5780 * 100) / 100 +
      " times the temperature of the Sun.";
    massDesc =
      "The solar mass (M☉) is a standard unit of mass in astronomy, equal to approximately 2×10^30 kg. It is used to indicate the masses of other stars, as well as clusters, nebulae, and galaxies. It is equal to the mass of the Sun (denoted by the solar symbol ⊙︎). This equates to about two nonillion (two quintillion in the long scale) kilograms.\n\nThis star has a mass of " +
      mass +
      " M☉, which means it is " +
      mass +
      " times the mass of our sun.";
    radiusDesc =
      "Solar radius is a unit of distance used to express the size of stars in astronomy relative to the Sun. Therefore, the Sun's solar radius is 1 R⊙︎. 1 R⊙︎ is equal to about 695,700 kilometres (432,300 miles). This is approximately 10 times the average radius of Jupiter, about 109 times the radius of the Earth, and 1/215th of an astronomical unit, the distance of the Earth from the Sun. It varies slightly from pole to equator due to its rotation, which induces an oblateness in the order of 10 parts per million.\n\nThe radius of this star is about " +
      Math.round(radius * 659700) +
      "km.";
    lumiDesc =
      "Absolute magnitude is a measure of the luminosity of a celestial object, on a logarithmic astronomical magnitude scale. An object's absolute magnitude is defined to be equal to the apparent magnitude that the object would have if it were viewed from a distance of exactly 10 parsecs (32.6 light-years), with no extinction (or dimming) of its light due to absorption by interstellar dust particles. By hypothetically placing all objects at a standard reference distance from the observer, their luminosities can be directly compared on a magnitude scale.";
  } else {
    type = "M";
    color = "Orange Red";
    cssColor = "orangeRed";
    temperature = Math.floor(Math.random() * (3700 - 2400)) + 2400;
    mass = (Math.floor(Math.random() * (45 - 8)) + 8) / 100;
    radius = (Math.floor(Math.random() * (70 - 10)) + 10) / 100;
    luminosity = (Math.floor(Math.random() * (8 - 1)) + 1) / 100;
    typeDesc =
      "Class M stars are by far the most common. About 76% of the main-sequence stars in the solar neighborhood are class M stars. However, class M main-sequence stars (red dwarfs) have such low luminosities that none are bright enough to be seen with the unaided eye, unless under exceptional conditions. The brightest known M-class main-sequence star is M0V Lacaille 8760, with magnitude 6.6 (the limiting magnitude for typical naked-eye visibility under good conditions is typically quoted as 6.5), and it is extremely unlikely that any brighter examples will be found.";
    colorDesc =
      "Vega-relative chromaticity: An objective specification of the quality of a color regardless of its luminance. Chromaticity consists of two independent parameters, often specified as hue (h) and colorfulness (s), where the latter is alternatively called saturation, chroma, intensity,[1] or excitation purity. This number of parameters follows from trichromacy of vision of most humans, which is assumed by most models in color science.";
    tempDesc =
      "The effective temperature of a body such as a star or planet is the temperature of a black body that would emit the same total amount of electromagnetic radiation. Effective temperature is often used as an estimate of a body's surface temperature when the body's emissivity curve (as a function of wavelength) is not known. The effective temperature of our Sun is around 5780 K. Stars have a decreasing temperature gradient, going from their central core up to the atmosphere. The core temperature of the Sun—the temperature at the centre of the Sun where nuclear reactions take place—is estimated to be 15,000,000 K. \n\nThis star has a temperature of " +
      temperature +
      "K. That is about " +
      Math.round(temperature / 5780 * 100) / 100 +
      " times the temperature of the Sun.";
    massDesc =
      "The solar mass (M☉) is a standard unit of mass in astronomy, equal to approximately 2×10^30 kg. It is used to indicate the masses of other stars, as well as clusters, nebulae, and galaxies. It is equal to the mass of the Sun (denoted by the solar symbol ⊙︎). This equates to about two nonillion (two quintillion in the long scale) kilograms.\n\nThis star has a mass of " +
      mass +
      " M☉, which means it is " +
      mass +
      " times the mass of our sun.";
    radiusDesc =
      "Solar radius is a unit of distance used to express the size of stars in astronomy relative to the Sun. Therefore, the Sun's solar radius is 1 R⊙︎. 1 R⊙︎ is equal to about 695,700 kilometres (432,300 miles). This is approximately 10 times the average radius of Jupiter, about 109 times the radius of the Earth, and 1/215th of an astronomical unit, the distance of the Earth from the Sun. It varies slightly from pole to equator due to its rotation, which induces an oblateness in the order of 10 parts per million.\n\nThe radius of this star is about " +
      Math.round(radius * 659700) +
      "km.";
    lumiDesc =
      "Absolute magnitude is a measure of the luminosity of a celestial object, on a logarithmic astronomical magnitude scale. An object's absolute magnitude is defined to be equal to the apparent magnitude that the object would have if it were viewed from a distance of exactly 10 parsecs (32.6 light-years), with no extinction (or dimming) of its light due to absorption by interstellar dust particles. By hypothetically placing all objects at a standard reference distance from the observer, their luminosities can be directly compared on a magnitude scale.";
  }
  return [
    type,
    color,
    cssColor,
    temperature,
    mass,
    radius,
    luminosity,
    typeDesc,
    colorDesc,
    tempDesc,
    massDesc,
    radiusDesc,
    lumiDesc
  ];
}

function SetActiveInfo(ele) {
  if (!$(ele).hasClass("active")) {
    RemoveActiveClasses();
    $(ele).addClass("active");

    HideAllInfoPanels();
    console.log(ele.id);
    if (ele.id == "typeSpan") {
      $("#typeInfo").fadeIn("slow");
    } else if (ele.id == "colorSpan") {
      $("#colorInfo").fadeIn("slow");
    } else if (ele.id == "tempSpan") {
      $("#tempInfo").fadeIn("slow");
    } else if (ele.id == "massSpan") {
      $("#massInfo").fadeIn("slow");
    } else if (ele.id == "radiusSpan") {
      $("#radiusInfo").fadeIn("slow");
    } else if (ele.id == "lumiSpan") {
      $("#lumiInfo").fadeIn("slow");
    }
  }
}

function RemoveActiveClasses() {
  var ids = [
    "lumiSpan",
    "radiusSpan",
    "massSpan",
    "tempSpan",
    "colorSpan",
    "typeSpan"
  ];
  for (var i = 0; i < ids.length; i++) {
    $("#" + ids[i]).removeClass("active");
  }
}

function HideAllInfoPanels() {
  var ids = [
    "typeInfo",
    "colorInfo",
    "tempInfo",
    "massInfo",
    "radiusInfo",
    "lumiInfo"
  ];
  for (var i = 0; i < ids.length; i++) {
    if (!$("#" + ids[i]).is(":hidden")) {
      $("#" + ids[i]).fadeOut("slow", function() {
        $("#" + ids[i]).hide();
      });
    }
  }
}
