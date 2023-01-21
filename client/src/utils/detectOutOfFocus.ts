export default function detectOutOfFocus(element: HTMLElement, title: HTMLElement): boolean{
    if(element === title) return true
    if(element.parentElement){
        return detectOutOfFocus(element.parentElement,title)
    }
    return false
}