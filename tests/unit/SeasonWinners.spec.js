import { shallowMount, createLocalVue  } from '@vue/test-utils'

import { MdApp, MdToolbar, MdContent, MdList, MdDialog, MdButton, MdProgress } from 'vue-material/dist/components'
import SeasonWinners from '@/components/SeasonWinners.vue'

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
  season: '2005',
  winner: {"driverId":"alonso","permanentNumber":"14","code":"ALO","url":"http:\/\/en.wikipedia.org\/wiki\/Fernando_Alonso","givenName":"Fernando","familyName":"Alonso","dateOfBirth":"1981-07-29","nationality":"Spanish"}
}

describe('SeasonWinners.vue', () => {

  it('highlights races won by champion', (done) => {

    const wrapper = shallowMount(SeasonWinners, {
      localVue,
      propsData: inputProps
    })

    wrapper.vm.$nextTick(() => {
      const racesList = wrapper.findAll('mdlistitem-stub')
      const wonByChampion = racesList.filter(x => x.text().includes(wrapper.vm.winner.familyName))
      const highlighted = racesList.filter(x => x.is('.highlight') )

      expect(wonByChampion).toEqual(highlighted)
      done()
    })

  })

  it('renders correctrly', (done) => {

    const wrapper = shallowMount(SeasonWinners, {
      localVue,
      propsData: inputProps
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })

  })

})
