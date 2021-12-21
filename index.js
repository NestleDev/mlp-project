class ScrollPager{
    constructor(settings = {}) {
        this.settings = {
            offsetTarget: parseInt(settings.offsetTarget) || 0,
            default: settings.default || '#intro'
        }
        this.pages = document.querySelectorAll('[data-to]')
        this.calcOffsets()

        document.addEventListener('click', this.handlerClick.bind(this))
        document.addEventListener('DOMContentLoaded', () => this.scrollTo(location.href))
    }

    calcOffsets() {
        this.offsets = Array.from(this.pages).reduce((prev, current) => {
            prev[current.dataset.to] = this.getOffsetTop(current) - this.settings.offsetTarget
 
            return prev
        }, {})
    }

    getOffsetTop(element) {
        const rect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        return rect.top + scrollTop
    }

    handlerClick(e) {
        const target = e.target.closest('[data-nav]')

        if (target) {
            e.preventDefault()

            this.scrollTo(target.href)
        }
    }

    scrollTo(to) {
        const hash = new URL(to).hash || this.settings.default
        location.hash = hash

        window.scroll({
            top: this.offsets[hash.slice(1)],
            behavior: "smooth"
        });

        this.calcOffsets()
    }
}

new ScrollPager({
    offsetTarget: 50
})