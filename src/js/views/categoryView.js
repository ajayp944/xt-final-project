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
    console.log((key + 2) % 2);
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
                    <a class="category__box--button" href="#${category.key}">Explore fruit-and-veg</a>
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
                    <a class="category__box--button" href="#${category.key}">Explore fruit-and-veg</a>
                </div>
            </div>
        </div>
        <div class="divider" aria-hidden="true">&nbsp;</div>`;
    }
    elements.categoryContainer.insertAdjacentHTML('beforeend', markup);
};
