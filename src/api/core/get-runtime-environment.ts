import { RuntimeEnvironment } from "./enums";

/**
 * Returns the current runtime environment.
 *
 * @param m `module` from the application entry point file.
 * @see RuntimeEnvironment
 */
export function getRuntimeEnvironment(m: NodeModule) {
	return require.main === m
		? RuntimeEnvironment.Standalone
		: RuntimeEnvironment.Firebase;
}
