const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;

  const filterName = name[0].toUpperCase() + name.slice(1);

  return (
    `<a href="#${name}" class="main-navigation__item">${filterName}
    <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export { createFilterTemplate };