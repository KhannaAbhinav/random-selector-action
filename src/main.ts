import * as core from '@actions/core'
import * as _ from 'underscore'

function pickRandomValues(dataList: number[] | string[], returnCount: number): void {
  if (dataList.length < returnCount) core.setFailed('Return count is more than available data')
  const randomDataList = _.sample(dataList, returnCount)
  let index = 1
  const randomDataRank = new Map()
  for (const randomData of randomDataList) {
    randomDataRank.set(index.toString(), randomData)
    index += 1
  }
  console.debug(randomDataList)
  console.debug(randomDataRank)

  console.debug(JSON.stringify(randomDataList))
  console.debug(JSON.stringify([...randomDataRank]))

  core.setOutput('selectedValuesList', JSON.stringify(randomDataList))
  core.setOutput('selectedValuesRank', JSON.stringify([...randomDataRank]))
}

async function main(): Promise<void> {
  try {
    const data = core.getInput('data')
    const returnCount = parseInt(core.getInput('returnCount'))

    console.debug(`data :  ${data}`)
    console.debug(`returnCount :  ${returnCount}`)

    const regEx = /^(\d+)\.\.(\d+)$/

    if (regEx.test(data)) {
      console.debug(`${data} is a numeric range`)
      const match = regEx.exec(data)
      if (null != match) {
        console.debug(`${match[1]}`)
        console.debug(`${match[2]}`)
        const start = parseInt(match[1])
        const end = parseInt(match[2])
        if (start < end) pickRandomValues(_.range(start, end), returnCount)
        else pickRandomValues(_.range(end, start), returnCount)
      }
    } else {
      const dataObject = JSON.parse(data)
      if (Array.isArray(dataObject)) {
        console.debug(`${data} is an array`)
        pickRandomValues(dataObject, returnCount)
      } else if (dataObject !== null && typeof dataObject === 'object') {
        console.debug(`${data} is a Dictionary`)
        pickRandomValues(Object.keys(dataObject), returnCount)
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
