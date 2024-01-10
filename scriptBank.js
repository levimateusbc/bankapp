'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// query selector is not a array but we can use some methods like forEach in a nodeList
const btnScroll = document.querySelector(".btn--scroll-to")
const section1 = document.querySelector("#section--1") //to to the section 1
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const openModal = function (e) {
    e.preventDefault() //avoid the default behavior of sroll to the top when click in the button oppen Account
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn =>btn.addEventListener('click', openModal))
btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
     if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
  //smooth navigation
btnScroll.addEventListener("click", function(e){
//   const s1coords = section1.getBoundingClientRect()
//   console.log(s1coords);
// // window.scrollTo({left: s1coords + window.pageXOffset,right:s1coords + pageYOffset,
// // begavior: "smooth",
// // })

  section1.scrollIntoView({behavior: 'smooth'})
})
// Page navigation smooth, if we didn't want that it was smooth, this bode wouldn't be necessary, with the id's we already do that
// document.querySelectorAll(".nav__link").forEach(function(el){el.addEventListener("click",function(e){
//   // all  sections has a id to scroll, after pressing each nav will be redirected to the section that was created, to avoid that, and avoid update the page when click in a button of a form for example, use preventDefault
//   e.preventDefault()
//   const id = this.getAttribute('href'); getting the href, the link where our page will be redirected to in the html
//   console.log(id);
//   document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
// })
// })
// All this code above would work beautifully, but, it's not so eficient in a big code, there are only 4 buttons, but if there were 1000, would have to make a lot of copy, so, let's make this efficient
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy, cuzy nav__links is all ul, so, if we click the ul itself, will still happen the event, but we just want this to happen when we click in some li, or nav__link that is the son of nav__links
  // e.target is the target where we click, if contains nav__link, it means, if the target it's equal nav__link, all the code bellow it's suppouse to happen
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component, press the button and move a bit up and clicking a button and changing the content

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');// we're using the target and closest cuzy with target is modern, we won't need to multiply the code if there is a lot of buttons. We attach the eventListener to the parent of the button that is operations__tab-container which is stored on tabsContainer the button itself that is the child is  operations__tab, after attaching the event to the father, we use the closest method cuzy if we press the number inside the button operations__tab we will receive the span that is inside the button and contains the number of the button and not  the button, so, to get all content of the button we use closest of operations__tab that is itself, the own operations__tab

  // Guard clause
  if (!clicked) return; //if clicked doesn't exist, return the function righ away

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active')); //this class operations__tab--active will jump the button a little bit, and we on't want that this classe exist in any button, only when we click, so, we remove this class to add only when the user click in some button 
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));//when click on the button it moves a bit up but the content appear too, the content of each button, here we are removing each content of buttons in order to all contents doesn't show up, but only one per time when press the button

  // Activating button
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)//using a very handy atribute, data, in html, we choose which  operations__content we want to add according with the button we click, there are 3, the datas that we added are 1, 2 and 3 based on the buttons we click, so, like this, we active the content of each button after pressing each button
    .classList.add('operations__content--active');
    
});

// Menu Fade navigation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;//taking exact the link we hover our mouse
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // taking all closest nav__link of nav
    const logo = link.closest('.nav').querySelector('img'); //taking all closest imgs of nav

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;// by default the this keyword is equal to the currentTarget, but were we change this and set to the opacity that will be passed using the function bind bellow
    });
    logo.style.opacity = this;
  }
};
// Passing "argument" into handler, we have to use the bind cuzy the eventListener ecxpect a function, so , we use the function bind to take the thiskeyword in the function handleHover
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// sticky navigation old way, after reach the section1 the navigation will show up
// const initialCords = section1.getBoundingClientRect() //with this, we get the current coordenates of the section1, the top,left..
// window.addEventListener("scroll",function(){
//   console.log(window.scrollY); // give us all coordenates of the axis y
//   if(window.scrollY > initialCords.top){
//     nav.classList.add("sticky")
//   }
//   else nav.classList.remove("sticky")
  
// })
// This is not so eficient, let's do now a efficient one
// Sticky navigation: Intersection Observer API, we want that the header shows up when the first viewport is no longer appearing 



const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky'); //when the target is not intersecting the root, we add the sticky classç. will intersect when te viewport is in the target, that is the header, that we set up headerObserver.observe(header); to be observed, when ir not intersecting anymore, when scroll all out of the header, won't intersect anymore, and so, we add the sticky
  else nav.classList.remove('sticky');
};
const options = {
  root: null, //it's null cuzy we are interested on the entire viewport
  threshold: 0,// we want to show the sticky navigation as soon as the header scrolls completly out of view, that's why we use 0. No contexto do Intersection Observer, o threshold representa o ponto de interseção no qual o callback (função loadImg neste caso) deve ser acionado. Esse valor é um número entre 0 e 1, indicando a porcentagem do elemento alvo que precisa estar visível no viewport para acionar o callback.Se o threshold fosse definido como 0.5, por exemplo, isso significaria que pelo menos 50% do elemento alvo precisaria ser visível para acionar o callback.portanto, ao definir threshold: 0, o código está configurando o Intersection Observer para chamar o callback imediatamente quando qualquer parte do elemento aparecer no viewport, na tela.
  rootMargin: `-${navHeight}px`, //it means, the sticky will appear when the distance  is -navHeightpx from the target, that means, the same height of our navigation, that what navHeight is, but it could be 90px, 200px, doesn't work only rem or percentage, but, we want that the sticky shows up when the distance of section 1 from the header, from the target is the height of the
  // navigation 
}
const headerObserver = new IntersectionObserver(stickyNav, options); //create a intersection between stickNav and options

headerObserver.observe(header);// this method .observer observe something 
///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;//if the entry is diferrent of the intersect doesn't do the code bellow

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //This means that will stop onserving each class that was observed already, cuzy if we don't do this, when we scroll down or up will keep up observing 
};

const sectionObserver = new IntersectionObserver(revealSection, { //passin the paremeter options here without creating the const
  root: null,
  threshold: 0.15, //only appear with 0.15 percent of the viewport cross the section 
});

allSections.forEach(function (section) {
  sectionObserver.observe(section); //observing the class section
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); //taking all images that has the attibute data-src
// Função de callback que será chamada quando a imagem entrar no viewport
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src, changing the atribute src for data-src that contains a better resolution, the special properties, atributes are stored at dataset, in html is data-src here dataset.src, ifthere is data-src-bo would be here dataset.srcBo
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
    // Deixa de observar a imagem após carregar para evitar carregamentos desnecessários
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, 
{
  root: null, //Usa o viewport como root (null significa o viewport)
  threshold: 0, //the intersection will happen when 0% da imagem estiver visível, assim que o viewport da imagem começar, assim que carregar 1 px da imagem 
  rootMargin: '-300px' //start loading, the intersection  300px after intersect the thrshold on the horizontal, is where we scroll down , if it was 300 instead of -300, would start all efects 300px with the function LoadImg  before intersect the img, 300px before our viewport intersect the img that is what we are observing 
});

imgTargets.forEach(img => imgObserver.observe(img))

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length; //taking the amount of sliders that there're in our slide

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) { //we're skiping the slide and only taking the index with _ in the first parameter of the function  
      dotContainer.insertAdjacentHTML(//creating a html element with insertAdjacentHTML and inserting the button bellow with the special attribute data-Something in our case, data-slide, taking the index of each slide, with this attributr, we will make the buttons work and go to sliders by the buttons
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active')); // removing any active dot

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active'); //activing dot according with the special atribute data, measuring each of them according with the index of slide
  };

  const goToSlide = function (slide) {
    //A very important function, take and run over the each slide with the forEach, taking the slide and the index, we use the property transform and for each slide, if the index is 0, 0-1 is -1 * 100 - -100% the translateX, it means the first slide will pass and the slide one will be with translate 0% and will be shown, cuzy the index of the next is 1 and 1-1 = 0 *100 = 0. this function will be called in nextSlide or PreviousSlide according to the current slide or next slide. And nextSlide will be added a eventHandeler after pressing the right button of the slide and the previousSlide a Event to the left button, when click , all these functions be called 
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) { //maxSlide - 1 cuzy pass in one the index of maxSlide, start counting in 0 and we have to end -1 here the maxSlide
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide); //calling the curSlide that is the actual slide. if the current slide is 0 after pressing btnRight, the function will compare, curSlide === maxSlide -1? or else add the curSlide, go to 1 and we call goToSlide with the number 1, and the slide will be changed to the next one, with the function goToSlide.
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    //the same logic as above here
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () { //initialization function 
    goToSlide(0); //in order to start on slide 0 
    createDots(); //creating dots

    activateDot(0);//in order to start with the first dot activated
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    // with this event keydown  we create a event that works with some word of our keyboard
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      // { slide } = e.target.dataset === slide = e.target.dataset.slide;
      // slide will be the parameter of goToSlide and activateDot, taking with the special atribute data-something the index of each slide, and passing to the function goTpSlide and activateDot
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
// DOM is the link between JS and the browser
// smooth scroll
// sticky navigation
// menu fade navigation
// slide, change content of the button as soon as click the button
// fazer as coisas aparecerem ao mover a página para baixo ou para cima. First we have to add a class of css that hidden the opacity of the section and translate a bit down the section this code    opacity: 0;    transform: translateY(8rem);, add this class to all sections that we want to receive this effect
// Lazy image: use this in a borrada img with css: filter: blur(20px); and the image can have low resolution when get closer to image remove this class and with the attribute  data-src put a img with a better resolution, always do like that, use a better img with the data-src in html and here in Js use the observer to change this
// Slide: See the html. Create a div slider that contais all sliders inside it, in our example, there're 3 sliders with all content of each slider.We use the overflow hidden in the component parent of all 3 sliders and show only one and the other we put translate, the one that start showing is 0% of translate, the second slide is  -100vw and -200vw to get out of the viewport.