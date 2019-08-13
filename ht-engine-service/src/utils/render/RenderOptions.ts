import { ClassTransformOptions } from "class-transformer";
import { AgentOptions } from "../../services/agent";

export type RenderOptions = AgentOptions & ClassTransformOptions;
