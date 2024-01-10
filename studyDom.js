//all classes of the codes bellow is from the html bankist section 13
// Selecting, Creating, and Deleting Elements

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');//this really create a html element
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML = //insert this code in the element created message
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); come before everything in the tag header but inside header
// header.append(message); come after everything in the tag header
// header.append(message.cloneNode(true));

// header.before(message);  come before the tag header
// header.after(message);

// Delete elements: remove(), the newest way to do this
// document
//   .querySelector('.btn--close-cookie').addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message); //old way to remove have to remove like this 
//   });
// Styles, Attributes and Classes
  
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); //we cannot take a hidden class in the html, but classes that we defined here
console.log(message.style.backgroundColor); //we changed the backgroundColor here, so, it's possible to change

console.log(getComputedStyle(message).color); //the getComputedStyle we can acces the color, height or any other thing that is hidden in css
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// in css we created a root that there are a lot of colors, we can change them here with this code bellow 
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Acces and change Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // take the alt of the logo
console.log(logo.className); //Take the name of the class logo. Use className instead of class only
// We can take the atributes above only the ones that are pattern in the html, such as the alt, class in a img for example, if we create a atribute, we cannot. But with the code Non-standard bellow we can do this
logo.alt = 'Beautiful minimalist logo';//Changing the alt

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer')); //From logo, the string designer that is the atribut we created will be returned the text that this atribute has
logo.setAttribute('company', 'Bankist'); //setAttribute change the attribue, like here, we change company to bankist

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);//will return the link
console.log(link.getAttribute('href'));// will return only the hash 

// Data attributes, it's a special, and important atribute, we create the data in the html in any tag, there when create this, always start with data-anything-anything. it's like css in javaScript, the - there will be the uppercase in the letter here, bellow, dataset.versionNumber was created data-version-number = something, to take this from here, we use the class this data was created, .dataset.TextOfData and that is it, we will take the text from there with this
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');//it's possible to add multiple class the same for the other methods
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use
logo.clasName = 'jonas';

// Sticky smooth navigation
const btnScroll = document.querySelector(".btn--scroll-to")
const section1 = document.querySelector("#section--1") //to to the section 1

btnScroll.addEventListener("click", function(e){
  // Old and wrong way
  const s1coords = section1.getBoundingClientRect()
  console.log(s1coords);
  // this getBoundingClientRect give the (coordenadas) of the code, the width, the height,.. of the element, the width, the distance to the top... It's important to be aware that these values change depending where the viewport is, if scroll down or top or reduce or increase the width, it will change with getBoundingClientRect. It's not static
  console.log("Current scroll (X/Y)",window.pageXOffset,window.pageYOffset);//Ambos window.pageXOffset e window.scrollX fornecem a posição horizontal de rolagem da janela. mas cairam em desuso e n são recomendados
// scrooling

// window.scrollTo({left: s1coords + window.pageXOffset,right:s1coords + pageYOffset,
// begavior: "smooth",
// })

  // Modern way: only take the class or id we want to scroll to and use this code
  section1.scrollIntoView({behavior: 'smooth'})
})

// Types of Events and Event Handlers
const h1 = document.querySelector('h1');

// We are separating the function here, what we want that the function does and after this calling it in the eventListener, that's how we add multiply events at the same time, multiply functions to the same event
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};
//this mouseenter add the event as soon as we put the mouse over the text(assim que coloca o mouse no texto escolhido o evento acontece)
h1.addEventListener('mouseenter', alertH1);
//Removing eventListeners: we remove with the code  h1.removeEventListener('mouseenter', alertH1), we pass the kind of event and the name of the class we are removing from 
// let's suppouse that we want to remove  aevent after some time, so, we do like this 
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// Old way of add event listener, we choose the clas or tag and put a dot and the kind of event. Its bad cuzy doesn't allow to remove and to add multiply events. addEventListener is better.
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
// h1.onclick = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
// There is one more old way to add event listener, and it's in the html, put there in the tag : onclick = "alert("AnyTextOnlyToGiveExemple")"

///////////////////////////////////////
// Event Propagation in Practice, bellow we have the nav__link which is son of  nav__links which is son of nav. We're doing this, cuzy we wanna show something:when we click in the first element, the nav__link, if there were a eventlistener in all parents, all of them will be applied the eventListener as well, but diferrent events, the events they were made for make. We created a ramdom color, and put the event to nav__link and all parents receive these ramdom color, after pressing nav__link, all will receive a ramdom color, if we click only nav__links , nav__links and nav will receive the effect but the son of nav__links that is nav__link won't receive, the same if press nav, only it will receive the ramdom color.
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  // The e.target will give us where the event was created, we put e.target in the nav__link, nav__links and nav, all e.target will be the same and will have the same class and styles, otherwise, the e.currentTarget give us exactly where the event happend, for example, we pressed nav__link, but the event happend in its parents as well, so, e.currentTarget will give us the class of each parent and the style that was applied for each parent. And This is true e.currentTarget === this. NOT FORGET THIS. e.currentTarget will point to its own element will.
  // Stop propagation, this popagation that applies a event in all parents can be stopped and the event be applied only to the son element that was clicked, with the code bellow
  // e.stopPropagation(); with this code, no parent will receive the eventListener
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// DOM Traversing: children and parents with dom 
const h1Traversing = document.querySelector('h1');

// Going downwards: children , te took the h1 and stored this on h1Traversing. when we take querySelectorAll in the  h1Traversing with the class highlight, only the elements that are children of h1 will be apllied the querySelector. If if there are other clsses highlight in the code, won't be applied, only the ones that are child of h1Traversing
console.log(h1Traversing.querySelectorAll('.highlight'));
console.log(h1Traversing.childNodes);
console.log(h1Traversing.children);
h1Traversing.firstElementChild.style.color = 'white'; //taking the first child
h1Traversing.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement); //direct parent
// The closest is the opposit of querySelector, will take the parents of h1, the closest header of h1 in the example bellow
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';// here will take the own h1, it ifself. the own h1 is the colosest of etself

// Going sideways: siblings, take the sides
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
// taking all children of h1 and if  the elements are different of the h1, scale the img
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

// Sticky navigation: Intersection Observer API

const obsCallback = function (entries, observer) {
  // Callback function to be executed when the observed element intersects
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  // Options for the Intersection Observer
  root: null,         // Use the viewport as the root (null means the viewport)The root property specifies the element that is used as the viewport for checking the intersection.In this case, root: null means that the entire viewport (the visible area of the webpage) is used as the root. The observer will check if the target element intersects with the viewport.
   threshold: [0, 0.2],// Trigger the callback when 0% or 20% of the target is visible.propriedade de limite: A propriedade limite é uma matriz que define em qual porcentagem da visibilidade do elemento alvo o retorno de chamada deve ser acionado. Neste exemplo, limite: [0, 0.2] significa que o retorno de chamada (obsCallback) será acionado quando o elemento de destino se tornar 0% ou 20% visível.
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
// Create a new Intersection Observer with the callback function and options

observer.observe(section1);
// Start observing the specified target element (assumed that section1 is previously defined)

// document.querySelector('.nav__link').addEventListener('click', function (e) { this.style.backgroundColor = randomColor();}
// when we use this inside a eventListener, the keyword this will point to the class that was created the event, in our example here, the nav__link
// these e.target are called event delegations.