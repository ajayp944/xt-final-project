import { elements } from './base';

export const renderResults = (category) => {
    // category.forEach(renderCategory);
    let i = 0;
    category.reverse().forEach((value) => {
        if (value.enabled) {
            renderCategory(i++, value);
        }
    });
};

// Render Category in view port
const renderCategory = (key, category) => {
    let markup;

    if ((key + 2) % 2) {
        markup = `<div class="category">
            <div class="category__box">
                <div class="category__box--title">
                    ${category.name}
                </div>
                <p class="category__box--description">
                    ${category.description}
                </p>
                <div>
                    <a class="btn btn--pink category__box--button" href="product.html#${category.id}">Explore fruit-and-veg</a>
                </div>
            </div>
            <div class="category__box">
                <img class="category__img" src="${category.imageUrl}" alt="${category.name}">
            </div>
        </div>
        <div class="divider" aria-hidden="true">&nbsp;</div>`;
    } else {
        markup = `<div class="category">
            <div class="category__box">
                <img class="category__img" src="${category.imageUrl}" alt="${category.name}">
            </div>
            <div class="category__box">
                <div class="category__box--title">
                    ${category.name}
                </div>
                <p class="category__box--description">
                    ${category.description}
                </p>
                <div>
                    <a class="btn btn--pink category__box--button" href="product.html#${category.id}">Explore ${category.name}</a>
                </div>
            </div>
        </div>
        <div class="divider" aria-hidden="true">&nbsp;</div>`;
    }
    elements.categoryContainer.insertAdjacentHTML('beforeend', markup);
};


export const renderResultProductCategory = (category) => {

    category.forEach((value) => {
        if (value.enabled) {
            renderResultProductCategoryView(value);

        }
    });
};


export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.m-menu__item'));
    resultsArr.forEach(el => {
        el.classList.remove('m-menu__item--active');
    });
    if (id) {
        document.querySelector(`.m-menu__link[href*="#${id}"]`).parentElement.classList.add('m-menu__item--active');
    }
};


// Render Category in view port
const renderResultProductCategoryView = (category) => {

    let markup, markup1;

    markup = `<option value="${category.id}"  data-phash="${category.id}">${category.name}</option>`;
    markup1 = `<li class="m-menu__item  ">
            <a href="#${category.id}" data-phash="${category.id}" class="m-menu__link">${category.name}</a>
        </li>`;

    elements.sMenuNav.insertAdjacentHTML('beforeend', markup);
    elements.mMenuNav.insertAdjacentHTML('beforeend', markup1);
};