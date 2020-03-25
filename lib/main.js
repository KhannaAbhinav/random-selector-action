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
const util_1 = require("util");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = core.getInput('data');
            const returnCount = core.getInput('returnCount');
            console.debug(`data :  ${data}`);
            console.debug(`returnCount :  ${returnCount}`);
            const regEx = /^(\d+)\.\.(\d+)$/;
            try {
                const dataObject = JSON.parse(data);
                if (util_1.isArray(dataObject)) {
                    console.debug(`${data} is an array`);
                }
                else if (util_1.isObject(dataObject)) {
                    console.debug(`${data} is a Dictionary`);
                }
            }
            catch (error) {
                if (regEx.test(data)) {
                    console.debug(`${data} is a numeric range`);
                    const match = regEx.exec(data);
                    if (null != match) {
                        console.debug(`${match[0]}`);
                        console.debug(`${match[1]}`);
                    }
                }
                else {
                    console.error('Invalid Input');
                }
            }
            core.setOutput('selectedValuesList', `${data}`);
            core.setOutput('selectedValuesRank', `${data}`);
        }
        catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    });
}
main();
