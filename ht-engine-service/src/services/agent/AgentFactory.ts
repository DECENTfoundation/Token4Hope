import * as Hapi from "hapi";
import { Spec } from "swagger-schema-official";

import { Agent } from "./Agent";

export type AgentFactory = (source: Spec | Hapi.Request) => Agent;
