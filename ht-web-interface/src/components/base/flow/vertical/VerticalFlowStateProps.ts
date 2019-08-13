/*
 * @CreateTime: Apr 3, 2018 2:57 PM
 * @Author: Matus Balascak
 * @Contact: balascakmatus@gmail.com
 * @Last Modified By: Matus Balascak
 * @Last Modified Time: May 22, 2018 4:23 PM
 */

import * as React from "react";

export interface VerticalFlowStateProps {
  children: React.ReactNode | Element[] | Element | JSX.Element | JSX.Element[];
  verticalAlign?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  spacing?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch" | "space-between";
  className?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}
