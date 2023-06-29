const settingsButton = document.createElement('button');
settingsButton.innerText = 'Settings';
settingsButton.innerHTML = /*html*/`
<style>

</style>

<aside class="controls">
    <label>
        <span>Display</span>
        <select>
            <option>Single</option>
            <option>Multiple</option>
        </select>
    </label>

        
    <label>
        <span>Counter</span>
            <select>
                <option>Counter 1</option>
                <option>Counter 2</option>
                <option>Counter 3</option>
            </select>
    </label>
    <button class="counter__button">
        <slot></slot>
    </button>
</aside>
`;

class setting extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'closed'}).appendChild(settingsButton.content.cloneNode(true))
    
    };
    connectedCallback(){};
}
customElements.define("setting-button", setting);

export default setting;