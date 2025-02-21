function theSeal(options = null) {
  this.parameters = {

    container: null,

    containerColor0: '#fff',
    containerColor1: '#000',

    text: 'The Seal',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7kPZqPN8RRvHNpUL3WP4MQRSInAuWlkkLcQ&usqp=CAU',
    radius: 100,
    crownRadius: 150,
    titleRadius: 100,

    gearSize: 50,
    crownSkewX: 0,
    crownSkewY: 0,
    crownScaleX: 0,
    crownScaleY: 0,

    gearRadius: 0,
    gearBorder: 5,

    borderColor: '#fff',
    borderSize: 8,

    crownColor: '#faa',
    textColor: '#f0f',
    rotationSpeed: 5,
  }

  if(options === null) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    for(let option in this.parameters) {
      let value = urlParams.get(option);

      if(value !== null) {
        this.parameters[option] = value;
      }
    }
  }
  else {
    for(let option in options) {
      let value = options[option];
      if(value !== null) {
        this.parameters[option] = value;
      }
    }
  }


  console.log(this.parameters);

  let size = this.parameters.radius;
  let container

  if(!this.parameters.container) {
    container = document.body;
  }
  else {
    if(typeof(this.parameters.container) === 'string') {
      container = document.querySelector(this.parameters.container);
    }
    else {
      container = this.parameters.container;
    }
  }

  this.seal = new Seal(container, size, this.parameters.text, this.parameters.image);

  console.log(this.parameters);

  this.seal.setProperty('containerColor0', this.parameters.containerColor0);
  this.seal.setProperty('containerColor1', this.parameters.containerColor1);
  


  this.seal.setProperty('size', this.parameters.radius * 2);
  this.seal.setProperty('titleRadius', this.parameters.titleRadius);


  this.seal.setProperty('rotationSpeed', this.parameters.rotationSpeed);
  this.seal.setProperty('oscillationSpeed', 0);



  this.seal.setProperty('borderColor', this.parameters.borderColor);
  this.seal.setProperty('borderSize', this.parameters.borderSize);

  this.seal.setProperty('textColor', this.parameters.textColor);

  this.seal.setProperty('crownColor', this.parameters.crownColor);

  this.seal.setProperty('crownRadius', this.parameters.crownRadius, true);
  this.seal.setProperty('gearSize', this.parameters.gearSize, true);
  this.seal.setProperty('gearRadius', this.parameters.gearRadius, true);

  this.seal.setProperty('gearBorder', this.parameters.gearBorder, true);



  this.seal.setProperty('crownSkewX', this.parameters.crownSkewX, true);
  this.seal.setProperty('crownSkewY', this.parameters.crownSkewY, true);

  this.seal.setProperty('crownScaleY', this.parameters.crownScaleY, true);
  this.seal.setProperty('crownScaleX', this.parameters.crownScaleX, true);
  this.seal.setProperty('crownShadow', 10, true);

  // this.seal.render();
  this.seal.refresh();
}
