/*
 * @CreateTime: Apr 3, 2018 2:57 PM
 * @Author: Matus Balascak
 * @Contact: balascakmatus@gmail.com
 * @Last Modified By: Matus Balascak
 * @Last Modified Time: Apr 3, 2018 2:57 PM
 */

import * as React from "react";

import { HideableProps } from "./HideableProps";

export class Hideable extends React.Component<HideableProps, {}> {
  public render() {
    return this.props.hidden ? null : this.props.children;
  }
}
