import { elements } from './base';

export const renderResults = (products, filterKey) => {

    // products.forEach(renderCategory, filterKey);

    clearResults();

    products.forEach((curr) => {
        renderCategory(curr, filterKey);
    });
};


export const limitRProductDescription = (title, limit = 100) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')}`;
        // return `${newTitle.join(' ')} ...`;
    }
    return title;
}



// Render Category in view port
const renderCategory = (product, filterKey) => {
    let markup;

    if (filterKey && filterKey !==product.category) {
        return false;
    }

    markup = `<div class="p-box">
                <div class="p-box__title">
                    ${product.name}
                </div>
                <div class="p-box__middle">
                <div class="p-box__middle--box">
                    <img class="p-box__img" src="${product.imageURL}" alt="${product.name}">
                </div>
                <div class="p-box__middle--box">
                    <p class="p-box__description">
                        ${limitRProductDescription(product.description, 140)}
                    </p>
                    <div class="p-box__footer--mobile">
                    <button class="btn btn--pink">Buy Now &copy; MRP Rs. ${product.price}</button>
                    </div>
                </div>
                </div>
                <div class="p-box__footer">
                <div class="p-box__footer--desktop">
                    <span>MRP Rs.${product.price}</span>
                    <button class="btn btn--pink">Buy Now</button>
                </div>
                <div class="p-box__footer--tablet">
                    <button class="btn btn--pink">Buy Now &copy; MRP Rs.${product.price}</button>
                </div>
                </div>
            </div>`;

    elements.productsContainer.insertAdjacentHTML('beforeend', markup);




};


export const clearResults = () => {
    elements.productsContainer.innerHTML = '';
};
