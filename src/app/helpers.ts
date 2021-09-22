/**
 * hasScrollbar
 *
 * Check wether a given element has a visible scrollbar.
 * Tests for a vertical scrollbar by default.
 *
 * @export
 * @param {Element} elem The element we are testing
 * @param {boolean} horizontal Check for horizontal instead of vertical scrollbar
 * @returns {boolean}
 * @version 1.0.0
 */
export function hasScrollbar(elem: Element, horizontal?: boolean): boolean {
	// Get all CSS properties of the given element.
	const cssProps = window.getComputedStyle(elem);

	if (horizontal) {
		// Test for a horizontal scrollbar.
		return cssProps.getPropertyValue('overflow-x') === 'auto' && elem.scrollWidth > elem.clientWidth;
	} else {
		// Test for a vertical scrollbar.
		return cssProps.getPropertyValue('overflow-y') === 'auto' && elem.scrollHeight > elem.clientHeight;
	}
}

/**
 * getScrollbarParent
 *
 * Starting from the given element, find the closest parent element that has a scrollbar.
 *
 * @export
 * @param {HTMLElement} elem The element we start our search from
 * @param {string} ignoreElem Selector for element to ignore while traversing the DOM
 * @returns {HTMLElement}
 * @version 1.1.1
 */
export function getScrollbarParent(elem: HTMLElement, ignoreElem?: string): HTMLElement {
	// If recursion arrives at the document body, return the body element and stop the script.
	if (elem === document.body) {
		return elem;
	}

	// If specified, ignore the element with the given selector and run the function again.
	if (ignoreElem && elem.matches(ignoreElem)) {
		return getScrollbarParent(elem.parentElement!);
	}

	if (hasScrollbar(elem, true) || hasScrollbar(elem)) {
		// If the current elem has a visible horizontal or vertical scrollbar, return the element.
		return elem;
	} else {
		// Otherwise run the same test again on its parent.
		return getScrollbarParent(elem.parentElement!);
	}
}

/**
 * removeClassByPrefix
 *
 * Attempt to remove class from element with the given prefix.
 *
 * @export
 * @param {HTMLElement} elem Element we are manipulating
 * @param {string} prefix Class prefix to test for
 * @version 1.0.0
 */
export function removeClassByPrefix(elem: HTMLElement, prefix: string): void {
	const prefixCheck = new RegExp(`\\b${prefix}.*?\\b`, 'g');

	[...elem.classList].map((className) => {
		if (prefixCheck.test(className)) {
			elem.classList.remove(className);
		}
	});
}
