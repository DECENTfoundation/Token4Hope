/*
 * @CreateTime: May 9, 2018 2:05 PM
 * @Author: Matus Balascak
 * @Contact: balascakmatus@gmail.com
 * @Last Modified By: Matus Balascak
 * @Last Modified Time: May 9, 2018 2:05 PM
 */

const fs = require("fs");

module.exports = () => {

    const bundleRegex = /main.\w+.js/gm;
    const dataAttrRegex = /"data-test"\:"\w+",?/gm;
    const bundle = fs.readdirSync('dist').filter((file) => bundleRegex.test(file))[0];
    const bundleContent = fs.readFileSync(`dist/${bundle}`, 'utf-8').replace(dataAttrRegex, "");

    fs.writeFileSync(`dist/${bundle}`, bundleContent);
    console.log("\t - removed data-test attributes");
}