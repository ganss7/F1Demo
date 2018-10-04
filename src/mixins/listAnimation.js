import { TweenLite } from 'gsap'

export default {
  data () {
    return {
      animating: false
    }
  },
 /*  beforeRouteLeave (to, from, next) {
    this.people = []
    
    setTimeout(() => {
      next()
    }, 1000)
  }, */
  methods: {
    beforeEnter(el) {
      // Set opacity to none and move the initial position of the item by 50%
      el.style.opacity = 0
      el.style.left = '50%'
      // Switch on the animating flag
      if (!this.animating) {
        this.animating = true
      }
    },
    enter(el, done) {
      const delay = (el.dataset.index >= 10 ? 10 : el.dataset.index) * 100
      setTimeout(() => {
        // For half a second animate opacity and left property and call done on complete
        TweenLite.to(el, 0.5, {
          opacity: 1,
          left: 0,
          onComplete: done
        })
      }, delay)
    },
    afterEnter(el) {
      // We only want to execute this part of code after last item entered
      if (+el.dataset.index === this.$options.listLength - 1) {
        this.animating = false
      }
    },
    beforeLeave() {
      // Switch on animating flag
      if (!this.animating) {
        this.animating = true
      }
    },
    leave(el, done) {
      // Get a delay num
      const delay = el.dataset.index * 50
      setTimeout(() => {
        // For half a second animate opacity and left property and call done on complete
        TweenLite.to(el, 0.5, {
          opacity: 0,
          left: '50%',
          onComplete: done
        })
      }, delay)
    },
    afterLeave(el) {
      if (+el.dataset.index === this.$options.listLength - 1) {
        this.animating = false
      }
    }
  }
}