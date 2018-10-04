import { shallowMount, createLocalVue  } from '@vue/test-utils'

import { MdApp, MdToolbar, MdContent, MdList, MdDialog, MdButton, MdProgress } from 'vue-material/dist/components'
import F1Champions from '@/components/F1Champions.vue'

const localVue = createLocalVue()

localVue.use(MdApp)
localVue.use(MdToolbar)
localVue.use(MdContent)
localVue.use(MdList)
localVue.use(MdDialog)
localVue.use(MdButton)
localVue.use(MdProgress)

jest.mock('@/api/f1history')

const inputProps = {
  yearFrom: '2005',
  yearTo: '2015'
}

describe('F1Champions.vue', () => {

  it('renders correctrly', (done) => {

    const wrapper = shallowMount(F1Champions, {
      localVue,
      propsData: inputProps
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })

  })

})
