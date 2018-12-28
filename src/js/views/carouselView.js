import { elements } from './base';

export const renderResults = (carousels) => {
    // carousels.reverse().forEach(renderCarousel);
    carousels.reverse().forEach((value, key) => {
        if (value.isActive) {
            renderCarousel(key, value);
        }
    });
    showSlides();
};

// Render Carousel in view port
const renderCarousel = (key, carousel) => {

    const markup = `
        <div class="carousel__items carousel__items--fade">
            <img src="${carousel.bannerImageUrl}" class="carousel__items--img" alt="${carousel.bannerImageAlt}" />
        </div>
    `;
    elements.carousel.insertAdjacentHTML('afterbegin', markup);
    const carouselDotsMarkup = `<span class="carousel__dots--dot" onclick="currentSlide(${key + 1})"></span>`;
    elements.carouselDots.insertAdjacentHTML('afterbegin', carouselDotsMarkup);
};


// Carousel js lib
var slideIndex = 0;
const showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("carousel__items");
    let dots = document.getElementsByClassName("carousel__dots--dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    // setTimeout(showSlides, 10000); // Change image every 10 seconds
}