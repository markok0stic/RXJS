export const createDiv = (parent: HTMLElement, className: string): HTMLDivElement => {
    const div = document.createElement('div');
    div.classList.add(className);
    parent.appendChild(div);

    return div;
};

export const createLabel = (parent: HTMLElement, className?: string): HTMLLabelElement => {
    const lbl = document.createElement('label');
    if (typeof className !== "undefined") lbl.classList.add(className);
    parent.appendChild(lbl);

    return lbl;
};

export const createButton = (parent: HTMLElement, className?: string): HTMLButtonElement => {
    const btn = document.createElement('button');
    if (typeof className !== "undefined") btn.classList.add(className);
    parent.appendChild(btn);

    return btn;
};

export const createInput = (parent: HTMLElement, className?: string): HTMLInputElement => {
    const inpt = document.createElement('input');
    if (typeof className !== "undefined") inpt.classList.add(className);
    parent.appendChild(inpt);

    return inpt;
};

export const createCustomElement = (tagName: string, parent: HTMLElement, className?: string): HTMLElement => {
    const el = document.createElement(tagName);
    if (typeof className !== "undefined") el.classList.add(className);
    parent.appendChild(el);

    return el;
}

export const removeAllChildNodes = (parent: HTMLElement): void => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}