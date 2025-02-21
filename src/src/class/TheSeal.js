export default class Seal
{

  target = null;

  background = null;

  seal = null;
  crown = null;
  background = null;

  size = null;
  itemSize = null;
  hypotenuse = null;

  borderSize = 10;

  top =   null;
  left = null;
  rotationSpeed = 0;



  radius = null;
  crownRadius = null;
  titleRadius = null;

  crownSkewX = 0;
  crownSkewY = 0;
  crownScaleX = 0;
  crownScaleY = 0;

  containerColor0 = '#fff';
  containerColor1 = '#000';


  refreshedProperties = {
    background: false,
  };




  constructor(target, radius, sentence, backgroundImage, left = null, top = null) {


    this.target = target;

    this.radius = parseInt(radius);
    this.crownRadius = parseInt(radius);
    this.titleRadius = parseInt(radius);

    this.sentence = sentence;
    this.backgroundImage = backgroundImage;

    this.gearSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--the-seal-gearSize'));

    this.size = this.radius * 2;

    this.hypotenuse = Math.sqrt(
      Math.pow(this.radius,2) * 2
    );

    this.top = 'calc(50% - ' + this.radius + 'px)';
    this.left = 'calc(50% - ' + this.radius + 'px)';

    if(top !==null) {
      this.top = top;
    }
    if(left !== null) {
      this.left = left;
    }


    this.drawContainer();
    this.initialize();
    this.drawCrown();
    this.drawBackground();
    this.drawTitle();
    this.render();
  }


  initialize() {

    this.seal = document.createElement('div');
    this.seal.classList.add('the-seal');

    this.seal.style.width = this.size + 'px';
    this.seal.style.height = this.size + 'px';

    this.seal.style.top = this.top;
    this.seal.style.left = this.left;

    return this.seal;
  }

  enableSunburn() {
    this.seal.classList.add('the-seal-sunburn');
  }

  setProperty(propertyName, value, isSize = false) {


    if(value != this[propertyName]) {
      this.refreshedProperties[propertyName] = true;
    }



    this[propertyName] = value;

    if(isSize) {
      value += 'px';
    }
    document.documentElement.style.setProperty('--the-seal-' + propertyName, value);
  }

  refresh() {

    if(this.refreshedProperties['size']) {
      this.centerSeal();
    }

    if(this.refreshedProperties['containerColor0'] || this.refreshedProperties['containerColor1'])  {
      this.drawContainer();
    }

    if(
      this.refreshedProperties['gearSize']
      || this.refreshedProperties['size']
      || this.refreshedProperties['crownRadius']
      || this.refreshedProperties['rotationSpeed']
      || this.refreshedProperties['crownSkewX']
      || this.refreshedProperties['crownSkewY']
      || this.refreshedProperties['crownScaleX']
      || this.refreshedProperties['crownScaleY']
      || this.refreshedProperties['gearRadius']
      ) {
      this.drawCrown();
    }


    if(
      this.refreshedProperties['borderSize']
      || this.refreshedProperties['size']
      || this.refreshedProperties['backgroundImage']
    ){

      this.drawBackground();
    }

    if(
      this.refreshedProperties['sentence']
      || this.refreshedProperties['titleRadius']
      || this.refreshedProperties['size']
    ) {
      this.drawTitle();
    }


    for(let attribute in this.refreshedProperties) {
      this.refreshedProperties[attribute] = false;
    }
  }

  drawContainer() {
    this.target.style.background = 'radial-gradient(circle, ' + this.containerColor0 + ' 0%, ' + this.containerColor1 +  ' 100%)'


    console.log(this.target.style.background);
    console.log(this.target.style);
  }

  centerSeal() {
    this.top = 'calc(50% - ' + (this.size / 2) + 'px)';
    this.left = 'calc(50% - ' + (this.size / 2) + 'px)';
    this.seal.style.top = this.top;
    this.seal.style.left = this.left;
  }

  setOscillationSpeed(speed) {
    this.oscillationSpeed = speed;
    this.drawBackground();
  }


  render() {
    if(this.seal) {
        this.seal.remove();
    }
    this.target.appendChild(this.seal);
  }



  drawCrown() {

    if(this.crown) {
      this.crown.remove();
    }

    let number = Math.ceil(this.crownRadius / (this.gearSize / 5));

    this.crown = document.createElement('div');
    this.crown.classList.add('crown');
    this.crown.style.position = 'absolute';

    this.crown.style.top = 0 + 'px';
    this.crown.style.left = 0 + 'px';
    this.crown.style.width = this.size + 'px';
    this.crown.style.height = this.size + 'px';


    // NOTICE DEBUG STYLE
    // this.crown.style.outline = 'solid 1px #f00';
    // this.crown.style.zIndex = 100;
    // this.crown.style.opacity = 0.3;


    for(let i = 0; i < number; i++) {

      let angle = 360 / number * i;

      const length = this.crownRadius - this.borderSize / 2 ;

      let x = Math.cos(angle * Math.PI / 180) * length;
      let y = Math.sin(angle * Math.PI / 180) * length;

      let gear = document.createElement('div');
      gear.classList.add('the-seal__gear');

      gear.style.width = 'var(--the-seal-gearSize)';
      gear.style.height = 'var(--the-seal-gearSize)';
      gear.style.backgroundColor = 'var(--the-seal-crownColor)'

      gear.style.marginTop = 'calc((' + this.size + 'px - var(--the-seal-gearSize)) / 2)';
      gear.style.marginLeft = 'calc((' + this.size + 'px - var(--the-seal-gearSize)) / 2)';

      // NOTICE DEBUG STYLE
      // gear.style.outline = 'solid 1px #000';

      gear.style.left = x + 'px';
      gear.style.top = y + 'px';
      // gear.style.transform = 'rotate(' + (angle + 90 + 45) + 'deg) ';


      gear.style.transform =
        'rotate(' + (angle + 90 + 45) + 'deg) ' +
        'skew(' + this.crownSkewX + 'deg, ' + this.crownSkewY + 'deg) ' +
        'scale(' + (1 + this.crownScaleX / 50) + ' , ' + (1 + this.crownScaleY / 50) + ') '
      ;


      gear.style.borderRadius = this.gearRadius + '%';

      gear.style.boxShadow =  '0 0 ' + (this.crownShadow) + 'px #000';

      // gear.style.transform = 'rotate(' + (angle + 90 + 45) + 'deg) scale(0.5, 2)';

      this.crown.appendChild(gear);
    }


    if(this.rotationSpeed) {
      const speed = 60 / this.rotationSpeed;
      this.crown.style.animation = 'the-seal-rotating ' + speed + 's linear infinite';
    }


    this.seal.appendChild(this.crown);
  }

  drawBackground() {

    if(this.background) {
        this.background.remove();
    }

    this.background = document.createElement('div');
    this.background.classList.add('background');
    this.background.style.width = this.size + 'px';
    this.background.style.height =  this.size + 'px';

    this.background.style.top = 0 + 'px';
    this.background.style.left = 0 + 'px';
    this.background.style.borderWidth = this.borderSize + 'px';

    this.background.style.background = "radial-gradient(circle, rgba(255,255,255,0.1) 56%, rgba(255,255,255,1) 80%), url(" + this.backgroundImage + ") 50% 50%, radial-gradient(circle, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)";
    this.background.style.backgroundSize = 'cover';

    this.seal.appendChild(this.background);

    if(this.oscillationSpeed) {
      const speed = 60 / this.oscillationSpeed;
      this.background.style.animation = 'the-seal-oscillate ' + speed + 's linear infinite';
    }
    else {
      this.background.style.animation = '';
    }

  }

  drawTitle() {

    console.log(this.sentence);

    const fontSize = Math.min(
      (this.titleRadius / this.sentence.length * 3),
      this.titleRadius / 5
    );

    if(this.title) {
      this.title.remove();
    }


    this.title = document.createElement('div');
    this.title.style.position = 'absolute'
    this.title.style.width = this.size + 'px';
    this.title.style.height = this.size + 'px';
    // this.title.style.outline = 'solid 1px #0ff';

    const length = this.titleRadius - fontSize;

    for(let i = 0; i < this.sentence.length ; i++) {
      let span = document.createElement('span');
      span.classList.add('letter');
      span.innerHTML = this.sentence[i];

      let angle = 180 / this.sentence.length * i + 0 + (180 / this.sentence.length) + 180 - (fontSize / this.sentence.length);

      let x = Math.cos(angle * Math.PI / 180) * length;
      let y = Math.sin(angle * Math.PI / 180) * length;

      span.style.fontSize = fontSize + 'px';

      span.style.left = x + 'px';
      span.style.top = y + 'px';

      span.style.marginTop = 'calc((' + this.size +'px - var(--the-seal-gearSize)) / 2)';
      span.style.marginLeft = 'calc((' + this.size +'px - var(--the-seal-gearSize)) / 2)';

      span.style.transform = 'rotate(' + (angle + 90) + 'deg)';
      // span.style.outline = 'solid 1px #f0f';

      this.title.append(span);
    }
    this.seal.appendChild(this.title);
  }
}