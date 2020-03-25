"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const _ = __importStar(require("underscore"));
function pickRandomValues(dataList, returnCount) {
    if (dataList.length < returnCount)
        core.setFailed('Return count is more than available data');
    const randomDataList = _.sample(dataList, returnCount);
    let index = 1;
    const randomDataRank = new Map();
    for (const randomData of randomDataList) {
        randomDataRank.set(index, randomData);
        index += 1;
    }
    core.setOutput('selectedValuesList', JSON.stringify(randomDataList));
    core.setOutput('selectedValuesRank', JSON.stringify(randomDataRank));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = core.getInput('data');
            const returnCount = parseInt(core.getInput('returnCount'));
            console.debug(`data :  ${data}`);
            console.debug(`returnCount :  ${returnCount}`);
            const regEx = /^(\d+)\.\.(\d+)$/;
            if (regEx.test(data)) {
                console.debug(`${data} is a numeric range`);
                const match = regEx.exec(data);
                if (null != match) {
                    console.debug(`${match[1]}`);
                    console.debug(`${match[2]}`);
                    const start = parseInt(match[1]);
                    const end = parseInt(match[2]);
                    if (start < end)
                        pickRandomValues(_.range(start, end), returnCount);
                    else
                        pickRandomValues(_.range(end, start), returnCount);
                }
            }
            else {
                const dataObject = JSON.parse(data);
                if (Array.isArray(dataObject)) {
                    console.debug(`${data} is an array`);
                    pickRandomValues(dataObject, returnCount);
                }
                else if (dataObject !== null && typeof dataObject === 'object') {
                    console.debug(`${data} is a Dictionary`);
                    pickRandomValues(Object.keys(dataObject), returnCount);
                }
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
main();
