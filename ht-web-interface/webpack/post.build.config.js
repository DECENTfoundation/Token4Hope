/*
 * @CreateTime: May 9, 2018 2:06 PM
 * @Author: Matus Balascak
 * @Contact: balascakmatus@gmail.com
 * @Last Modified By: Matus Balascak
 * @Last Modified Time: May 9, 2018 2:06 PM
 */

const Cleanup = require("./scripts/datatest.cleanup");

console.log("STARTING POST BUILD");
Cleanup();
console.log("POST BUILD FINISHED");