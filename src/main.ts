import * as core from '@actions/core'
import {isArray, isObject} from 'util'

async function main(): Promise<void> {
  try {
    const data = core.getInput('data')
    const returnCount = core.getInput('returnCount')

    console.debug(`data :  ${data}`)
    console.debug(`returnCount :  ${returnCount}`)

    const regEx = /^(\d+)\.\.(\d+)$/
    try {
      const dataObject = JSON.parse(data)
      if (isArray(dataObject)) {
        console.debug(`${data} is an array`)
      } else if (isObject(dataObject)) {
        console.debug(`${data} is a Dictionary`)
      }
    } catch (error) {
      if (regEx.test(data)) {
        console.debug(`${data} is a numeric range`)
        const match = regEx.exec(data)
        if (null != match) {
          console.debug(`${match[0]}`)
          console.debug(`${match[1]}`)
        }
      } else {
        core.setFailed('Invalid Input')
      }
    }

    core.setOutput('selectedValuesList', `${data}`)
    core.setOutput('selectedValuesRank', `${data}`)
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
  }
}

main()
