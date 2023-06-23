const btns = document.createElement("template")
btns.innerHTML = /* html */ `
<style>
/* counter */
.counter{
    background: var(--color-dark-grey);
}

.counter__value{
    width: 100%;
    height: 15rem;
    text-align: center;
    font-size: 6rem;
    font-weight: 900;
    color: var(--color-white);
    background: none;
    border-width: 0;
    border-bottom: 1px solid var(--color-light-grey)
}

.counter__actions{
    display: flex;
}

.counter__button{
    background: none;
    width: 50%;
    border-width: 0;
    color: var(--color-light-grey);
    font-size: 3rem;
    height: 10rem;
    border-bottom: 1px solid var(--color-light-grey);
    transition: transform 0.3s;
    transform: translateY(0);
}
</style>
<button class="counter__button">
    <slot></slot>
</button>
`;


class UserActionButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "closed" }).appendChild(btns.content.cloneNode(true));
  }
}

customElements.define("user-action", UserActionButton);

export default UserActionButton;