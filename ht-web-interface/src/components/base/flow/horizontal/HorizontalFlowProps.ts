/*
 * @CreateTime: Apr 3, 2018 2:55 PM
 * @Author: Matus Balascak
 * @Contact: balascakmatus@gmail.com
 * @Last Modified By: Matus Balascak
 * @Last Modified Time: May 28, 2018 5:26 PM
 */

import * as React from "react";

export interface HorizontalFlowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => any;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  spacing?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  verticalAlign?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}
