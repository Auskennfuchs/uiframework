const DisplayUtitilites = {
    maxZIndex: () => (
        Array.from(document.querySelectorAll('body *'))
            .map(a => parseFloat(window.getComputedStyle(a).zIndex))
            .filter(a => !isNaN(a))
            .sort()
            .pop() || 0
    )

}

export default DisplayUtitilites