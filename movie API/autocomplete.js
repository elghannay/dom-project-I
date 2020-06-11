autocomplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    
root.innerHTML = `
    <label for="input"><b>search for a title</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `;
// instead of selecting any input or any dropdown we 
// will select the element that are specific to the root.
const input = root.querySelector('.input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

    
const onInput = async event => {
    const items = await fetchData(event.target.value);
    if (!items.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    dropdown.classList.add('is-active');
    resultsWrapper.innerHTML = '';

    for (const item of items) {

        const option = document.createElement('a');
        option.classList.add('dropdown-item');

        option.innerHTML = renderOption(item);
        resultsWrapper.appendChild(option);

        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = inputValue(item);
            onOptionSelect(item);
        })
    }
    }
    input.addEventListener('input', debounce(onInput, 500));
    document.addEventListener('click', event => {
    if (!root.contains(event.target))
        dropdown.classList.remove('is-active');
    })
}